import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CartItem } from 'src/models/cart-item.model';
import { Cart } from 'src/models/cart.model';
import { ProductComments } from 'src/models/product-comments.model';
import { Product } from 'src/models/product.model';
import { CartItemService } from 'src/services/cart-item.service';
import { CartService } from 'src/services/cart.service';
import { ProductCommentsService } from 'src/services/product-comments.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-game-store',
  templateUrl: './game-store.component.html',
  styleUrls: ['./game-store.component.css']
})
export class GameStoreComponent implements OnInit {

  products: Product[] = [];
  productList!: Observable<Product[]>;
  selectedProduct: Product | null = null;

  productComments: ProductComments[] = [];
  productCommentsList!: Observable<ProductComments[]>;

  displayAddModal: boolean = false;
  displayEditModal: boolean = false;
  displayAddCommentModal: boolean = false;
  displayConfirmationModal: boolean = false;

  visible?: boolean;
  productId: any;
  productIdToDelete: any;
  commentToRemoveId: any;
  layout: string = 'list';

  addProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });

  editProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });

  addCommentsForm = new FormGroup({
    content: new FormControl('', Validators.required),
    grade: new FormControl('', Validators.required),
  });

  constructor(private productService: ProductService,
      private productCommentService: ProductCommentsService,
      private cartItemService: CartItemService,
      private cartService: CartService
    ) { }

  ngOnInit(): void {
    this.httpGetProducts();
    this.refreshStorePage();
  }

  showDialog() {
    this.visible = true;
  }

  httpGetProducts(): void{
    this.productService.getAllProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  selectProduct(product: Product){
    this.selectedProduct = product;
  }

  getProductComments(productId: string): void {
    this.productCommentService.getCommentsByProductId(productId).subscribe(
      (comments: ProductComments[]) => {
        this.productComments = comments;
      },
      (error: any) => {
        console.error('Failed to fetch product comments:', error);
      }
    );
  }

  showAddDialog(){
    this.displayAddModal = true;
  }

  hideAddDialog(){
    this.displayAddModal = false;
  }

  showAddCommentDialog(){
    this.displayAddCommentModal = true;
  }

  hideAddCommentDialog(){
    this.displayAddCommentModal = false;
  }

  showEditDialog(product: Product){
    this.displayEditModal = true;
    if(product.id){
      this.productId = product.id;
    }
    this.editProductForm.controls.name.setValue(product.name);
    this.editProductForm.controls.description.setValue(product.description);
    this.editProductForm.controls.price.setValue(product.price.toString());
    this.editProductForm.controls.category.setValue(product.category);
    this.editProductForm.controls.imageUrl.setValue(product.imageUrl);
  }

  hideEditDialog(){
    this.displayEditModal = false;
  }

  showDeleteDialog(product: Product){
    this.displayConfirmationModal = true;
    if(product.id){
      this.productIdToDelete = product.id;
    }
  }

  hideDeleteDialog(){
    this.displayConfirmationModal = false;
  }

  refreshStorePage(){
    this.productService.getAllProducts();
  }

  addProduct(): void{
    if(this.addProductForm.valid){
      var newProduct = {
        name: this.addProductForm.controls.name.value!,
        price: +this.addProductForm.controls.price.value!,
        description: this.addProductForm.controls.description.value!,
        category: this.addProductForm.controls.category.value!,
        imageUrl: this.addProductForm.controls.category.value!
      };

      this.productService.addProduct(newProduct).subscribe(
        () => {
          console.log('Product added successfully');
          this.refreshStorePage();
          this.addProductForm.reset();
          this.hideAddDialog();
        },
        (error: any) => {
          console.error('Failed to add product:', error);
        }
      );
    }
  }


  editProduct(){
    if(this.editProductForm.valid){
      var product = {
        name: this.editProductForm.controls.name.value!,
        description: this.editProductForm.controls.description.value!,
        price: +this.editProductForm.controls.price.value!,
        category: this.editProductForm.controls.category.value!,
        imageUrl: this.editProductForm.controls.category.value!
      }
      this.productService.updateProduct(this.productId, product).subscribe(() => {
        this.refreshStorePage();
      });
      this.hideEditDialog();
    }
  }

  deleteProduct(id: string){
    if(id !== undefined){
      this.productService.deleteProduct(id).subscribe(() => {
        this.refreshStorePage();
      });
      this.hideDeleteDialog();
    }
  }

  addToCart(product: Product){
    console.log(`Product added successfully ${product.name}`)
  }
}
