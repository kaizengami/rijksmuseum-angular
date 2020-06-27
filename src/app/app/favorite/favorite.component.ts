import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoriteService } from './favorite.service';
import { Card } from '../card-list/card-item/card-item.model';
import { AuthService } from '../auth/auth.service';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit, OnDestroy {
  cardList: Array<Card> = [];
  favorites: string[];
  error: string = null;
  userId: string = null;
  favoritesSub: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private favoriteService: FavoriteService
  ) {}
  ngOnInit(): void {
    this.initFavorites();

    // this.favorites = this.favoriteService.favorites.get().subscribe((data) => {
    //   console.log(data.docs.map((doc) => doc.data()));
    // });
    // this.favorites.docs.map((doc) => doc.data());
  }

  initFavorites(): void {
    this.favoritesSub = this.favoriteService.favorites.subscribe(
      (favorites) => {
        this.favorites = favorites;
        console.log(this.favorites);
      }
    );
  }

  ngOnDestroy() {
    this.favoritesSub.unsubscribe();
  }
}
