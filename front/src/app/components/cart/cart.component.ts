import { Component, OnInit } from '@angular/core';
import { CartItemService } from 'src/services/cart-item.service';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService, private cartItemService: CartItemService) { }

  ngOnInit(): void {
    this.httpGetCartItems();
  }


  httpGetCartItems(){
  }
}
