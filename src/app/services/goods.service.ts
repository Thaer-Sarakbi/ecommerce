import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(private fs: AngularFirestore, private storage: AngularFireStorage) { }

  getAllGoods(){
    //return this.fs.collection('goods').valueChanges()
    return this.fs.collection('goods').snapshotChanges()
  }

  addNewGood(name: string, price: Number, image: File){
    let ref = this.storage.ref('goods/' + image.name)
    ref.put(image).then(() => {
      ref.getDownloadURL().subscribe(photoUrl => {
        this.fs.collection('goods').add({
          name,
          price,
          photoUrl
        })
      })
    })
  }
}
