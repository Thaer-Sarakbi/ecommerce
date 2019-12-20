import { GoodsService } from './../../services/goods.service';
import { Goods } from './../models/goods.interface';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {

  @ViewChild('image', {static: false}) image: ElementRef

  constructor(private gs: GoodsService) { }

  ngOnInit() {
  }

  addNewGood(form: NgForm){
    //let name = form.value.name,
    let name = (<Goods>form.value).name,
        //price = form.value.price
        price = (<Goods>form.value).price,
        image = (<HTMLInputElement>this.image.nativeElement).files[0];
        this.gs.addNewGood(name, price, image)
    /*
    console.log(form.value)
    //console.log((this.image.nativeElement as HTMLInputElement).files)
    console.log((<HTMLInputElement>this.image.nativeElement).files[0])
    */
  }

}
