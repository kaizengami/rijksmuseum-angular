import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CardListService } from './card-list.service';
import { Card } from './card-item/card-item.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  cardList: Array<Card> = [];
  searchValue: string = '';
  page: number = 0;
  cardsOnPage: number = 10;
  error = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private cardListService: CardListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: Params) => {
      console.log(queryParams);
      this.searchValue = queryParams.search ? queryParams.search : '';
      this.page = queryParams.page ? queryParams.page : 0;
      this.cardsOnPage = queryParams.ps ? queryParams.ps : 10;
      this.getCardList();
    });
  }

  getCardList() {
    this.cardListService
      .getCardList({
        page: this.page,
        search: this.searchValue,
        cardsOnPage: this.cardsOnPage,
      })
      .subscribe(
        (cards) => {
          this.cardList = cards;
          console.log(this.cardList);
        },
        (error) => {
          this.error = error.message;
          console.log(this.error);
        }
      );
  }

  upDatePagination(e: PageEvent) {
    console.log(e);
    this.cardsOnPage = e.pageSize;
    this.page = e.pageIndex;
    this.router.navigate([], {
      queryParams: {
        ps: this.cardsOnPage == 10 ? null : this.cardsOnPage,
        page: this.page == 0 ? null : this.page + 1,
      },
      queryParamsHandling: 'merge',
    });
  }
}
