import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-price-check-page',
  templateUrl: './price-check-page.component.html',
  styleUrls: ['./price-check-page.component.css'],
})

export class PriceCheckPageComponent implements OnInit {
  api_url: string = 'http://159.89.34.98:8000//api/weapons/';
  weapon_detail_url: string = 'http://159.89.34.98:8000//api/weapons/';
  market_api_url: string ='http://159.89.34.98:8000/api/prices/';

  weapon_details: any[] = [];
  weapon_data: any[] = [];
  available_weapons: any[] = [];
  market_data: any[] = [];

  selectedClass: string = '';
  selectedCategory: string = '';
  selectedWeapon: string = '';
  selectedTier: number = -1;
  selectedEnchantment: number = -1;

  item_class: { [key: string]: string } = {};
  item_unique_class: Set<any> = new Set<any>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.api_url).subscribe((searchRes: any) => {
      // All Weapon Data
      this.weapon_data = searchRes;

      // Check all Unique Classes
      searchRes.forEach((item: any) => {
        this.item_class[item.item_category] = item.item_class;
      });

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
    this.available_weapons = [];
    this.weapon_data.forEach((weapon) => {
      if (
        this.selectedCategory === weapon.item_category &&
        this.selectedClass === weapon.item_class &&
        this.selectedTier == weapon.tier
      ) {
        this.available_weapons.push(weapon);
      }
    });
  }

  getWeaponDetails(): void {
    this.weapon_details = [];

    this.available_weapons.forEach((weapon) => {
      if (this.selectedWeapon === weapon.unique_name) {
        this.weapon_details.push(weapon);
      }
    });
  }

  getMarketValue() {
    this.market_data = [];
    const api_url: string = this.market_api_url + this.selectedWeapon + '@' + this.selectedEnchantment

    if(this.selectedWeapon == ""){
      null
    }

    this.http.get(api_url).subscribe((searchRes: any) => {
      console.log(searchRes)
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

  onWeaponSelected(event: any): void {
    this.selectedWeapon = event.target.value;
    this.getWeaponDetails();
  }

  onEnchantmentSelected(event: any): void {
    this.selectedEnchantment = event.target.value;
  }

  checkSelected(): boolean {
    if (
      (this.selectedCategory.length > 0,
      this.selectedClass.length > 0,
      this.selectedTier >= 0,
      this.selectedWeapon.length > 0,
      this.selectedEnchantment >= 0))
      {
      return true;
    }

    return false;
  }
}
