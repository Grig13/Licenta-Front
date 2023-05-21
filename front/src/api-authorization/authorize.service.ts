
import { Injectable } from "@angular/core";
import { UserManager, User, Profile } from "oidc-client";
import { BehaviorSubject, Observable, concat, filter, from, map, mergeMap, take, tap } from "rxjs";
import { DefaultRoles } from "./role-defines";
import { ApplicationName, ApplicationPaths } from "./api-authorization.constant";


export type IAuthenticationResult = SuccessAuthenticationResult | 
                                    FailureAuthenticationResult |
                                    RedirectAuthenticationResult;


export interface SuccessAuthenticationResult {
    status: AuthenticationResultStatus.Success;
    state: any;
}

export interface FailureAuthenticationResult{
    status: AuthenticationResultStatus.Fail;
    message: string;
}

export interface RedirectAuthenticationResult {
    status: AuthenticationResultStatus.Redirect;
}

export enum AuthenticationResultStatus{
    Success,
    Redirect,
    Fail    
}

export interface IUser {
    name?: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthorizeService{
    private popUpDisabled = true;
    private userManager?: UserManager;
    private userSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);

    public isAuthenticated(): Observable<boolean>{
        return this.getUser().pipe(map(u => !!u));
    }

    public getUser(): Observable<IUser | null>{
        return concat(
            this.userSubject.pipe(take(1), filter(u => !!u)),
            this.getUserFromStorage().pipe(filter(u => !!u), tap(u => this.userSubject.next(u))),
            this.userSubject.asObservable()
        );
    }

    public getAccessToken(): Observable<string | null>{
        return from(this.ensureUserManagerInitialized())
            .pipe(mergeMap(() => from(this.userManager!.getUser())),
                map(user => user && user.access_token));
    }

    public getRole(): Observable<string | null> {
        return this.getUser().pipe(map(user => {
            let newUser = user as Profile;
            return (newUser && newUser["role"]);
        }));
    }

    public getUserId(): Observable<string | null> {
        return this.getUser().pipe(map(user => {
            let newUser = user as Profile;
            return (newUser && newUser["sub"]);
        }));
    }

    private userHasRole(roleToCheck: string): Observable<boolean>{
        return this.getRole().pipe(map(role => role === roleToCheck));
    }

    public isUserAdmin(): Observable<boolean>{
        return this.userHasRole(DefaultRoles.Admin);
    }

    public isUserNormal(): Observable<boolean>{
        return this.userHasRole(DefaultRoles.User);
    }

    // We try to authenticate the user in three different ways:
    // 1) We try to see if we can authenticate the user silently. This happens when the user is already logged in on the IdP
    // and is done using a hidden iframe on the client.
    // 2) We try to authenticate the user using a PopUp window. This might fail if there is a Popup blocker or the user has
    // disabled popups.
    // 3) If the 2 methods above fail, we redirect the browser to the IdP to perform a traditional redirect flow.

    public async signIn(state: any): Promise<IAuthenticationResult> {
        await this.ensureUserManagerInitialized();
        let user: User | null = null;
        try {
            user = await this.userManager!.signinSilent(this.createArguments());
            this.userSubject.next(user.profile);
            return this.success(state);
        } catch (silentError) {
            // User might not be authenticated => fallback to popup authentication
            console.log('Silent authentication error: ', silentError);

            try {
                if(this.popUpDisabled) {
                    throw new Error('Popup disabled. Change \'authorize.service.ts:AuthorizeService.popupDisabled\' to false to enable it.');
                }
                user = await this.userManager!.signinPopup(this.createArguments());
                this.userSubject.next(user.profile);
                return this.success(state);
            } catch (popupError: any) {
                if (popupError.message === 'Popup window closed') {
                    // The user explicitly canceled the login action by closing an opened popup.
                    return this.error('The user closed the window.');
                } else if (!this.popUpDisabled) {
                    console.log('Popup authentication error: ', popupError);
                }

                // Popups might be blocked by the user, fallback to redirect
                try {
                    await this.userManager!.signinRedirect(this.createArguments(state));
                    return this.redirect();
                } catch (redirectError: any){
                    console.log('Redirect authentication error: ', redirectError);
                    return this.error(redirectError);
                }
            }
        }
    }

    public async completeSignIn(url: string): Promise<IAuthenticationResult> {
        try {
            await this.ensureUserManagerInitialized();
            const user = await this.userManager!.signinCallback(url);
            this.userSubject.next(user && user.profile);
            return this.success(user && user.state);
        } catch (error) {
            console.log('There was an error signin in: ', error);
            return this.error('There was an error signin in.');
        }
    }

    public async signOut(state: any): Promise<IAuthenticationResult> {
        try {
          if (this.popUpDisabled) {
            throw new Error('Popup disabled. Change \'authorize.service.ts:AuthorizeService.popupDisabled\' to false to enable it.');
          }
    
          await this.ensureUserManagerInitialized();
          await this.userManager!.signoutPopup(this.createArguments());
          this.userSubject.next(null);
          return this.success(state);
        } catch (popupSignOutError: any) {
          console.log('Popup signout error: ', popupSignOutError);
          try {
            await this.userManager!.signoutRedirect(this.createArguments(state));
            return this.redirect();
          } catch (redirectSignOutError: any) {
            console.log('Redirect signout error: ', redirectSignOutError);
            return this.error(redirectSignOutError);
          }
        }
      }
    
    public async completeSignOut(url: string): Promise<IAuthenticationResult> {
        await this.ensureUserManagerInitialized();
        try {
            const response = await this.userManager!.signoutCallback(url);
            this.userSubject.next(null);
            return this.success(response && response.state);
        } catch (error: any) {
            console.log(`There was an error trying to log out '${error}'.`);
            return this.error(error);
        }
    }

    

    private async ensureUserManagerInitialized(): Promise<void>{
        if(this.userManager !== undefined){
            return;
        }

        // @TODO : Create ApplicationPaths inside api-authorization.constants.ts
        const response = await fetch(ApplicationPaths.ApiAuthorizationClientConfigurationUrl);
        
        if(!response.ok) {
            // @TODO: Create ApplicationName inside api-authorization.constants.ts
            throw new Error(`Could not load settings for '${ApplicationName}'`);
        }

        const settings: any = await response.json();
        settings.automaticSilentRenew = true;
        settings.includeIdTokenInSilentRenew = true;
        this.userManager = new UserManager(settings);

        this.userManager.events.addUserSignedOut(async () => {
            await this.userManager!.removeUser();
            this.userSubject.next(null);
        });
        await this.userManager?.getUser();
    }

    private getUserFromStorage(): Observable<IUser | null> {
        return from(this.ensureUserManagerInitialized())
            .pipe(mergeMap(() => this.userManager!.getUser()),
            map(u => u && u.profile))
    }

    private createArguments(state?: any): any {
        return { useReplaceToNavigate: true, data: state };
    }

    private error(message: string): IAuthenticationResult {
        return { status: AuthenticationResultStatus.Fail, message };
    }

    private success(state: any): IAuthenticationResult {
        return { status: AuthenticationResultStatus.Success, state };
    }

    private redirect(): IAuthenticationResult {
        return { status: AuthenticationResultStatus.Redirect };
    }


}