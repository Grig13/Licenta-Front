import { Component, OnInit } from '@angular/core';
import { News } from 'src/models/news.model';
import { NewsService } from 'src/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: News[] = [];

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.httpGetNews();
  }

  httpGetNews(){
    this.newsService.getNews().subscribe({
      next: (news) => {
        this.news = news;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

}
