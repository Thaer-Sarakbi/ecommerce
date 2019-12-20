import { Goods } from './../components/models/goods.interface';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private fs: AngularFirestore, private as: AuthService) { }

  addtoCart(data: Goods){
    return this.fs.collection('users/ $(this.as.userId) /cart').add(data)
  }

  getCart(){
    return this.fs.collection('users/ $(this.as.userId) /cart').snapshotChanges()
  }

  delete(id){
    return this.fs.doc('users/ $(Sthis.as.userId) /cart/$(id)').delete()
  }
}
