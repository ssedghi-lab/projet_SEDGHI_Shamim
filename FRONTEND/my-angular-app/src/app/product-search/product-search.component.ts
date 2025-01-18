import { Component } from '@angular/core';
import { SearchServiceService } from '../services/search-service.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent {
  constructor(private monserviceService: SearchServiceService) { }

  updateProduits(input: string) {
    this.monserviceService.filterProduits(input);
  }
}