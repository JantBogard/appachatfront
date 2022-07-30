import { Adresse } from './Adresse';
import { HttpClient } from '@angular/common/http';
import { Article } from './../Model/article.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public articles: Article[] = [];
  public article: Article = new Article();

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAll() {
    return this.httpClient.get<Article[]>(Adresse.host + 'article/allarticle');
  }

  public getByDenomination(denomination: string) {
    return this.httpClient.get<Article>(Adresse.host + 'article/bydenomination/' + denomination);
  }

  public save(article: Article) {
    return this.httpClient.post<Article>(Adresse.host + 'article/save', article);
  }

  public update(article: Article) {
    return this.httpClient.put<Article>(Adresse.host + 'article/update/'+article.id, article);
  }
}
