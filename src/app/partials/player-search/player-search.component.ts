import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css'],
})
export class PlayerSearchComponent {
  player_data: any[] = [];
  player_name: string = '';
  api_url: string = 'http://159.89.34.98:8000/api/guildinfo/playersearch/';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.get(this.api_url + this.player_name).subscribe(
      (searchRes: any) => {
        this.player_data.push(searchRes)
      });
  }
}
