import { Component, Input, OnInit } from '@angular/core';
import { ITopHeadlinesArticles } from '../../types/news';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() articleProps!: ITopHeadlinesArticles;

  constructor() { }

  ngOnInit(): void {
  }

}
