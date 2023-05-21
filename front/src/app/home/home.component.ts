import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { DefaultRoles } from 'src/api-authorization/role-defines';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  connectedUserId!: Observable<string | null>;
  loggedUserId!:string;
  loggedUser!: Observable<User>;
  getUserSubscription!: Subscription;
  role$: Observable<string | null>;

  constructor(private authService: AuthorizeService, private userService: UserService, private router: Router){
    this.role$ = this.authService.getRole();
  }


  ngOnInit(): void {
    this.connectedUserId = this.authService.getUserId().pipe(tap((userId) => {
      if(userId){
        this.loggedUser = this.userService.getUserById(userId);
        this.loggedUserId = userId;
      }
      console.log(userId);
    }))
  }

  redirectUser(user: User | null){
    if(user){
      switch(user.role){
        case DefaultRoles.Admin:
          this.router.navigate([`timeline`])
          break;
        case DefaultRoles.User:
          this.router.navigate([`timeline`])
          break;
        default:
          this.router.navigate([``]);
          break;
      }
    }
  }

  ngOnDestroy(): void {
    this.getUserSubscription?.unsubscribe();
  }

  
}
