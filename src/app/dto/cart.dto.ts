import { Product } from './product.dto';

export class Cart{
    product: Product;
    quantity: number;
    subTotal: number;
    constructor(){
        this.product = new Product();
        this.quantity = 1;
    }
}