import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-top-member',
  templateUrl: './top-member.component.html',
  styleUrls: ['./top-member.component.css'],
})
export class TopMemberComponent implements OnInit {
  top_5: any[] = []
  api_url: string = 'https://gameinfo.albiononline.com/api/gameinfo/guilds/QLY0eIvEQNa3WJZ_tndijg/data';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  const httpOptions = {
    headers: new HttpHeaders({
      'Accept-Encoding': 'identity',
      // Add other headers as needed
    }),
  };

  this.http.get(this.api_url, httpOptions).subscribe((searchRes: any) => {
    this.top_5.push(searchRes);
    })
  }
}
