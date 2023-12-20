import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-price-check-page',
  templateUrl: './price-check-page.component.html',
  styleUrls: ['./price-check-page.component.css'],
})

export class PriceCheckPageComponent implements OnInit {
  api_url: string = 'http://159.89.34.98:8000/api/all/';
  market_api_url: string ='http://127.0.0.1:8000/api/prices/';

  item_detail: any[] = [];
  item_data: any[] = [];
  available_items: any[] = [];
  market_data: any[] = [];
  market_item: any[] = [];

  selectedClass: string = '';
  selectedCategory: string = '';
  selectedItem: string = '';
  selectedTier: number = -1;
  selectedEnchantment: number = -1;

  item_class: { [key: string]: string } = {};
  item_unique_class: Set<any> = new Set<any>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.api_url).subscribe((searchRes: any) => {
      // All Item API Data
      this.item_data = searchRes;

      // Read All Unique Categories
      searchRes.forEach((item: any) => {
        this.item_class[item.item_sub_category] = item.item_class;
      });

      // Pushes All Unique Classes INTO a Object
      this.item_unique_class = new Set(Object.values(this.item_class));
    });
  }

  getCategoryValues(): any[] {
    let categories: string[] = [];
    const data = Object.keys(this.item_class);

    data.forEach((key) => {
      if (this.item_class[key] == this.selectedClass) {
        categories.push(key);
      }
    });

    return categories;
  }

  getItemList(): void {
    this.available_items = [];
    this.item_data.forEach((item) => {
      if (
        this.selectedCategory === item.item_sub_category &&
        this.selectedClass === item.item_class &&
        this.selectedTier == item.tier
      ) {
        this.available_items.push(item);
      }
    });
  }

  getItemDetails(): void {
    this.item_detail = [];

    this.available_items.forEach((item) => {
      if (this.selectedItem === item.unique_name) {
        this.item_detail.push(item);
      }
    });

    console.log(this.item_detail)
  }

  getMarketValue() {
    this.market_item = [];
    const api_url: string = this.market_api_url + this.selectedItem + '@' + this.selectedEnchantment;
  
    if (this.selectedItem === "") {
      return; // early return or handle the case where selectedItem is empty
    }
  
    this.http.get(api_url).subscribe((searchRes: any) => {
      this.market_item = searchRes; // assuming searchRes is an array of items
  
      // Sort the market_item array by QualityLevel
      this.market_item.sort((a, b) => a.QualityLevel - b.QualityLevel);
    });
  }

  onItemSelected(event: any): void {
    this.selectedClass = event.target.value;
    this.getCategoryValues();
  }

  onCategorySelected(event: any): void {
    this.selectedCategory = event.target.value;
    this.getItemList();
  }

  onTierSelected(event: any): void {
    this.selectedTier = event.target.value;
    this.getItemList(); 
  }

  onSpecificItemSelected(event: any): void {
    this.selectedItem = event.target.value;
    this.getItemDetails();
  }

  onEnchantmentSelected(event: any): void {
    this.selectedEnchantment = event.target.value;
  }

  checkSelected(): boolean {
    if (
      (this.selectedCategory.length > 0,
      this.selectedClass.length > 0,
      this.selectedTier >= 0,
      this.selectedItem.length > 0,
      this.selectedEnchantment >= 0))
      {
      return true;
    }

    return false;
  }
  
}
