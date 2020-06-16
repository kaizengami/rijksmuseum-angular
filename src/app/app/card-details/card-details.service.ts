import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GetCardDetailsResponse, CardDetails } from './card-details.model';

@Injectable({ providedIn: 'root' })
export class CardDetailsService {
  apiUrl = 'https://www.rijksmuseum.nl/api/en/collection';
  apiKey = '0zZyVckt';
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  getCardDetails(id: string) {
    let cardDetails = null;

    return this.http
      .get<GetCardDetailsResponse>(
        `${this.apiUrl}/${id}?key=${this.apiKey}&format=json`
      )
      .pipe(
        map((responseData) => {
          if (responseData.hasOwnProperty('artObject')) {
            cardDetails = new CardDetails(responseData.artObject);
          }
          return cardDetails;
        }),
        catchError((errorRes) => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }
}
