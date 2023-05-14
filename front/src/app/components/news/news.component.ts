import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { News } from 'src/models/news.model';
import { NewsService } from 'src/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: News[] = [];
  newsList!: Observable<News[]>;
  visible?: boolean;
  displayAddModal: boolean = false;
  displayEditModal: boolean = false;
  displayConfirmationDialog: boolean = false;

  newsId: any;
  newsIdToDelete: any;

  addNewsForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    attachment: new FormControl(''),
  });

  editNewsForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    attachment: new FormControl(''),
  });

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.httpGetNews();
    this.refreshNewsList();

  }

  ngOnDestroy(): void{

  }

  showDialog() {
      this.visible = true;
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

  showAddDialog(){
    this.displayAddModal = true;
  }

  hideAddDialog(){
    this.displayAddModal = false;
  }

  showEditDialog(news: News){
    this.displayEditModal = true;
    if(news.id)
    {
      this.newsId = news.id;
    }
    this.editNewsForm.controls.title.setValue(news.title);
    this.editNewsForm.controls.content.setValue(news.content);
    this.editNewsForm.controls.image.setValue(news.image);
    this.editNewsForm.controls.attachment.setValue(news.attachment);
  }

  hideEditDialog(){
    this.displayEditModal = false;
  }

  showDeleteDialog(news: News){
    this.displayConfirmationDialog = true;
    if(news.id){
      this.newsIdToDelete = news.id;
    }
  }

  hideDeleteDialog(){
    this.displayConfirmationDialog = false;
  }

  addNews(){
    var newNews = new News();
    newNews.title = this.addNewsForm.controls.title.value!;
    newNews.content = this.addNewsForm.controls.content.value!;
    newNews.image = this.addNewsForm.controls.image.value!;
    newNews.attachment = this.addNewsForm.controls.attachment.value!;
    this.newsService.addNews(newNews).subscribe(() => {
      this.refreshNewsList();
    });
    this.hideAddDialog();
  }

  refreshNewsList(){
    this.newsList = this.newsService.getNews();
  }

  deleteNews(id: string){
    if(id !== undefined){
      this.newsService.deleteNews(id).subscribe(() => {
        this.refreshNewsList();
      });
      this.hideDeleteDialog();
    }
  }

  editNews(){
    var news = {
      title: this.editNewsForm.controls.title.value!,
      content: this.editNewsForm.controls.content.value!,
      image: this.editNewsForm.controls.image.value!,
      attachment: this.editNewsForm.controls.attachment.value!
    }
    this.newsService.editNews(this.newsId, news).subscribe(() => {
      this.refreshNewsList();
    })
    this.hideEditDialog();
  }

}
