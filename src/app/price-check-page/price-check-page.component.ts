import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-price-check-page',
  templateUrl: './price-check-page.component.html',
  styleUrls: ['./price-check-page.component.css'],
})
export class PriceCheckPageComponent implements OnInit {
  api_url: string = 'http://127.0.0.1:8000/api/weapons/';
  weapon_data: any[] = [];
  selectedClass: string = '';
  selectedCategory: string = '';
  selectedTier: string = '';

  item_class: { [key: string]: string } = {};
  item_unique_class: Set<any> = new Set<any>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.api_url).subscribe((searchRes: any) => {
      searchRes.forEach((item: any) => {
        this.item_class[item.item_category] = item.item_class;
      });

      this.updateUniqueValues();
    });
  }

  private updateUniqueValues(): void {
    this.item_unique_class = new Set(Object.values(this.item_class));
  }

  getItemClassValues(): any[] {
    let selected_weapons: string[] = [];
    const data = Object.keys(this.item_class);

    data.forEach((key) => {
      if (this.item_class[key] == this.selectedClass) {
        selected_weapons.push(key);
      }
    });

    return selected_weapons;
  }

  onItemSelected(event: any): void {
    this.selectedClass = event.target.value;
    this.getItemClassValues();
  }

  onWeaponSelected(event: any): void {
    this.selectedCategory = event.target.value;
  }

  onTierSelected(event: any): void {
    this.selectedTier = event.target.value;
  }
}
