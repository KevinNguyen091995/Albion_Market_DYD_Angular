import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css'],
})
export class PlayerSearchComponent {
  player_data: any[] = [];
  player_id: string = '';
  searchTerm: string = '';
  search_api: string = '/api/gameinfo/search?q=';
  player_data_api: string = 'api/gameinfo/players/';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.get(this.search_api + this.searchTerm).subscribe(
      (searchRes: any) => {
        // Check if there are any players in the search result
        if (searchRes.players && searchRes.players.length > 0) {
          // Extract the player ID
          const playerId = searchRes.players[0].Id;

          // Make another request using the player ID
          this.http.get(this.player_data_api + playerId).subscribe(
            (playerDataRes: any) => {
              this.player_data = [];
              this.player_data.push(playerDataRes)
            },
            (playerDataError) => {
              console.error('Error fetching player data:', playerDataError);
            }
          );
        } else {
          console.warn('No players found in the search result.');
        }
      },
      (searchError) => {
        console.error('Error performing player search:', searchError);
      }
    );
  }
}
