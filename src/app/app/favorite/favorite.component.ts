import { Component, OnInit } from '@angular/core';
import { FavoriteService } from './favorite.service';
import { Card } from '../card-list/card-item/card-item.model';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  cardList: Array<Card> = [];
  favorites: any;
  error: string = null;
  private userSub: Subscription;

  constructor(
    private authService: AuthService,
    private favoriteService: FavoriteService
  ) {}
  ngOnInit(): void {
    this.favorites = this.favoriteService.favorites.get().subscribe((data) => {
      console.log(data.docs.map((doc) => doc.data()));
    });
    this.favorites.docs.map((doc) => doc.data());
    console.log(this.favorites);

    // this.favoriteService.addFavorite({ body: '2323', userId: 'userId-test' });
    // setTimeout(() => {
    //   this.favorites.forEach((element) => {
    //     console.log(element);
    //   });
    // }, 2000);

    // this.favoriteService.favorites.snapshotChanges().subscribe((items) => {
    //   items.forEach((a) => {
    //     a.payload;
    //     console.log(a.payload);
    //   });
    // });
    //   this.userSub = this.authService.user.subscribe((user) => {
    //     console.log('test');
    //     this.favoriteService.getFavorites();
    //   });
    //   setTimeout(() => {
    //     // console.log(this.favoriteService.array);
    //     console.log(this.favorites$);
    //   }, 3000);
    // setTimeout(() => {
    //   this.favoriteService.addFavorite({
    //     userId: 'test',
    //     body: '11',
    //   });
    // }, 2000);
    // }
  }
  async getMarker() {
    const snapshot = await firebase.firestore().collection('favorite').get();
    console.log(snapshot.docs.map((doc) => doc.data()));

    return snapshot.docs.map((doc) => doc.data());
  }
}
