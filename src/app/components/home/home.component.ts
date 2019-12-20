import { CartService } from './../../services/cart.service';
import { GoodsService } from './../../services/goods.service';
import { Goods } from './../models/goods.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { database } from 'firebase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  /*
  goods: Goods[] = [
    { name: 'apple', price: 5, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3AXlzGXOlkZyxj3IBdhLt3P5fS2zmlfUhIHeHD4SD4M-JoMnC&s'},
    { name: 'banana', price: 7, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg'},
    { name: 'orange', price: 4, photoUrl: 'https://www.goodfreephotos.com/albums/plants/orange-fruit-picture.jpg'},
    { name: 'strawberry', price: 5, photoUrl: 'https://www.publicdomainpictures.net/pictures/10000/nahled/strawberry-331280433961ZpzL.jpg'}
  ]
  */

 goods: Goods[] = [];
 goodsObservable: Subscription
 add: number = -1

  constructor(private gs: GoodsService, private cs: CartService) { }

  ngOnInit() {
    //this.gs.getAllGoods().subscribe(data => this.goods = data)
    this.goodsObservable = this.gs.getAllGoods().subscribe(data => {
      this.goods = data.map(element => {
        return{
          id: element.payload.doc.id,
          name: element.payload.doc.data()['name'],
          price: element.payload.doc.data()['price'],
          photoUrl: element.payload.doc.data()['photoUrl']
        }
      })
    })
  }

  ngOnDestroy(){
    this.goodsObservable.unsubscribe()
  }

  /*
  addToCart(index){
    console.log("added" ,this.goods[index])
  }
  */
 /*
 addToCart(id){
  console.log("added" , id)
}
*/
addToCart(index: number){
 this.add = index
}

buy(amount: number){
  let selectedGood = this.goods[this.add]
  let data = {
    name: selectedGood.name,
    amount: +amount,
    price: selectedGood.price
  }
  this.cs.addtoCart(data).then(() => this.add = -1)
}
}
