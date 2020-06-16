import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
} from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { GetCardListResponse, Card } from './card-item/card-item.model';

@Injectable({ providedIn: 'root' })
export class CardListService {
  apiUrl = 'https://www.rijksmuseum.nl/api/en/collection?key=0zZyVckt';

  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  getCardList({
    page,
    search,
    cardsOnPage,
  }: {
    page: number;
    search: string;
    cardsOnPage: number;
  }) {
    let cardsArray: Array<Card> = [];

    return this.http
      .get<GetCardListResponse>(
        `${this.apiUrl}&p=${page}&q=${search}&ps=${cardsOnPage}`
      )
      .pipe(
        map((responseData) => {
          if (responseData.hasOwnProperty('artObjects')) {
            cardsArray = responseData.artObjects.map((card) => new Card(card));
          }
          return cardsArray;
        }),
        catchError((errorRes) => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }
}
