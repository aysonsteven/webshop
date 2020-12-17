import { Component, OnChanges, SimpleChanges, IterableDiffers, DoCheck } from '@angular/core';
import { Product } from './dto/product.dto';
import { Cart } from './dto/cart.dto';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  val: any;
  currPage = 1;
  cartList: Cart[] = [];
  cartTotalQuantity = 0;
  cartTotalPrice = 0;
  products: Product[];

  cartInfoShow = false;

  constructor(private differ: IterableDiffers){
    this.products = [
      {
        id: 1,
        price: 1000,
        title: 'product1',
        subtitle: 'subforprod1'
      },
      {
        id: 2,
        price: 4000,
        title: 'product2',
        subtitle: 'subforprod2'
      },
      {
        id: 3,
        price: 3000,
        title: 'product3',
        subtitle: 'subforprod3'
      },
      {
        id: 4,
        price: 600,
        title: 'product4',
        subtitle: 'subforprod4'
      }
    ];
  }
  ngDoCheck(): void {
    if(this.differ.find(this.cartList)){
      this.cartTotalPrice = 0;
      this.cartTotalQuantity = 0;
      this.cartList.forEach(x=>{
        x.subTotal = x.product.price * x.quantity;
        this.cartTotalPrice = this.cartTotalPrice  + x.subTotal;
        this.cartTotalQuantity = this.cartTotalQuantity + x.quantity;
      })
      if(!this.cartList.length){
        this.cartInfoShow = false;
      }
    }
  }


  addItem(item: Product){
    console.log('test', item);
    let cart = new Cart();
    console.log('testfind', this.cartList.find(x => x.product == item));
    if( !this.cartList.find(x => x.product == item) ){
      console.log('HERE');
      cart.product = item;
      this.cartList.push(cart);
    } else{
      cart = this.cartList.find(x => x.product == item);
      cart.quantity ++;
    }
  }

  deleteItem(cart){
    console.log('cart', cart);
    this.cartList.splice(this.cartList.indexOf(cart), 1);
  }

  showCart(){
    if(this.cartList.length){
      this.cartInfoShow = !this.cartInfoShow;
    }
  }
}
