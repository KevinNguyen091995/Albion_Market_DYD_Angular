import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  weaponData: any;
  url: string = 'http://127.0.0.1:8000/api/weapons/';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.url).subscribe((res: any) => {
      this.weaponData = res;
      console.log(this.weaponData);
    });
  }
}
