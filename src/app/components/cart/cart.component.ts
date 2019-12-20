import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Shopping } from '../models/shopping.interface'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Shopping[] = []

  constructor(private cs: CartService) { }

  ngOnInit() {
    this.cs.getCart().subscribe(cart => {
      this.cart = cart.map(shopping => {
        return{
          id: shopping.payload.doc.id,
          ...shopping.payload.doc.data()
        }
      })
      console.log(this.cart)
    })
  }

  delete(index){
    this.cs.delete(this.cart[index].id)
  }
}
