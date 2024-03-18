import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HttpHeaders } from '@angular/common/http';
import { Product } from '../../interfaces/products';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  listProduct: Product[] = []
  constructor(private _productService: ProductsService){}

  ngOnInit(): void{
    this.getProducts();
  }
  getProducts(){
      this._productService.getProducts().subscribe( data => {
      this.listProduct = data
      
    })
  }
}
