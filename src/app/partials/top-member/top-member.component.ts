import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-top-member',
  templateUrl: './top-member.component.html',
  styleUrls: ['./top-member.component.css'],
})
export class TopMemberComponent implements OnInit {
  top_5: any[] = []
  api_url: string = 'http://159.89.34.98:8000/api/guildinfo/top5';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  this.http.get(this.api_url).subscribe((searchRes: any) => {
    this.top_5.push(searchRes);
    })
  }
}
