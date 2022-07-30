import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Validators } from '@angular/forms';
import { LoginService } from './../../service/LoginService';
import { ArticleService } from './../../service/article.service';
import { FormBuilder } from '@angular/forms';
import { Article } from './../../Model/article.model';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {RandomGenerator} from "../../RandomGenerator";

@Component({
  selector: 'app-gestion-articles',
  templateUrl: './gestion-articles.component.html',
  styleUrls: ['./gestion-articles.component.scss']
})
export class GestionArticlesComponent implements OnInit {

  public formAddArticle!: FormGroup;
  public article!: Article;
  public isLoading: boolean = false;
  public modalRef!: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    public articleService: ArticleService,
    private loginService: LoginService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllArticle();
  }

  public initForm() {
    this.formAddArticle = this.formBuilder.group({
      denomination: ['', Validators.required],
      caracteristiques: ['', Validators.required],
      reference: [RandomGenerator.RandomString(10), Validators.required],
      fabriquant: ['', Validators.required],
    });
  }

  public getAllArticle() {
    this.articleService.getAll().subscribe(
      data => {
        this.articleService.articles = data;
      },
      error => {
        console.log(error);
        this.loginService.toastr.error('Erreur de chargement des articles');
      }
    );
  }

  public onSaveArticle() {
    this.isLoading = true;
    if (this.formAddArticle.invalid) {
      this.isLoading = false;
      this.loginService.toastr.error('Erreur de sauvegarde');
      return;
    }
    this.article = this.formAddArticle.value;
    this.article.date = new Date();
    this.articleService.save(this.article).subscribe(
      data => {
        this.isLoading = false;
        this.loginService.toastr.success('Sauvegarde effectuée avec succès');
        if (!data.date) {
          data.date = new Date();
        }
        this.articleService.articles.push(data);
        this.modalRef.hide();
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.loginService.toastr.error('Erreur de sauvegarde');
      }
    );
  }

  public onUpdate() {
    this.isLoading = true;
    this.articleService.update(this.article).subscribe(
      data => {
        this.isLoading = false;
        const index =this.articleService.articles.findIndex(i=>i.id==data.id);
        this.articleService.articles.splice(index,1);
        this.articleService.articles.push(data);
        this.loginService.toastr.success('Modification effectuée avec succès');
        this.modalRef.hide();
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.loginService.toastr.error('Erreur de modification');
      }
    );
  }

  public openModal(template: TemplateRef<any>, article?: Article) {
    if (article) {
      this.article = article;
    } else {
      this.initForm();
    }
    this.modalRef = this.modalService.show(template);
  }

}
