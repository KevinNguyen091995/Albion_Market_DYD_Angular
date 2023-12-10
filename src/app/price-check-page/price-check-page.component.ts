import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-price-check-page',
  templateUrl: './price-check-page.component.html',
  styleUrls: ['./price-check-page.component.css'],
})
export class PriceCheckPageComponent implements OnInit {
  showDropdown = false;
  weapon_data: any[] = [];
  item_class: Set<string> = new Set();
  item_category: Set<string> = new Set();
  api_url: string = 'http://127.0.0.1:8000/api/weapons/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.api_url).subscribe((searchRes: any) => {
      searchRes.forEach((item: any) => {
        this.item_class.add(item.item_class);
        this.item_category.add(item.item_category);
      });
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
