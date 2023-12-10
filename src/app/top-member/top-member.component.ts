import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-top-member',
  templateUrl: './top-member.component.html',
  styleUrls: ['./top-member.component.css'],
})
export class TopMemberComponent implements OnInit {
  top_5: any[] = []
  api_url: string = '/api/gameinfo/guilds/QLY0eIvEQNa3WJZ_tndijg/data';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  this.http.get(this.api_url).subscribe((searchRes: any) => {
    this.top_5.push(searchRes);
    console.log(this.top_5[0].topPlayers);
    })
  }
}
