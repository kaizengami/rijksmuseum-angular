import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { catchError, tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import {
//   AngularFirestore,
//   AngularFirestoreCollection,
// } from '@angular/fire/firestore';
// import { async } from '@angular/core/testing';
import * as firebase from 'firebase/app';
import { filter, last, take } from 'rxjs/operators';

enum Error {
  PermissionDenied = 'Permission denied',
}

export class Favorite {
  body: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  favorites = new BehaviorSubject<Array<string>>([]);
  userId: string;
  favoritesArray$: Observable<any> = this.favorites.asObservable();

  constructor(
    private afAuth: AngularFireAuth // private db: AngularFireDatabase, // private firestore: AngularFirestore
  ) {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.userId = user.uid;

        let favoritesData = await this.getFavorites();
        if (!favoritesData) favoritesData = [];

        this.favorites.next(favoritesData);
      }
    });

    // this.favorites = this.db.list(`favorite/${this.userId}`);
    // this.favorites.snapshotChanges().subscribe((favorite) => {
    //   console.log(favorite);
    // });
  }

  async getFavorites() {
    if (this.userId) {
      const response = await firebase
        .firestore()
        .collection('favorite')
        .doc(this.userId)
        .get();
      const favoritesData = response.data();

      if (favoritesData) return favoritesData.id;
      return [];
    }
  }

  async updateFavorites(favoriteId: string) {
    if (this.isInFavorites(favoriteId)) {
      this.removeFavoriteFromArray(favoriteId);
    } else {
      this.addFavoriteToArray(favoriteId);
    }

    const response = await firebase
      .firestore()
      .collection('favorite')
      .doc(this.userId)
      .set({ id: this.favorites.getValue() });
  }

  isInFavorites(id: string): boolean {
    return this.favorites.getValue().includes(id);
  }

  // private removeFavoriteFromArray(id: string): Array<string> {
  //   return this.getLastFavoritesValue().filter((favorite) => favorite !== id);
  // }

  private addFavoriteToArray(id: string) {
    this.favoritesArray$.pipe(take(1)).subscribe((val) => {
      const newArr = [...val, id];
      this.favorites.next(newArr);
    });
  }

  private removeFavoriteFromArray(id: string) {
    this.favoritesArray$.pipe(take(1)).subscribe((val) => {
      const filtered = val.filter((favorite: string) => favorite !== id);

      const newArr = [...filtered];

      this.favorites.next(newArr);
    });
  }

  // console.log(this.userId);
  // if (!this.userId) return;
  // // this.favorites = this.firestore.collection(`favorite`);
  // this.favorites = this.firestore.collection(`favorite`).get();
  // return this.favorites;
  // return this.firestore
  //   .collection<any>(`favorite`)
  //   .doc('M4euTWABDgJJyBQ5Qzhc')
  //   .snapshotChanges()
  //   .pipe(
  //     map((doc: any) => {
  //       return { id: doc.payload.id, ...doc.payload.data() };
  //     })
  //   );
  // this.favorites = this.db.list(`favorite/${this.userId}`);
  // console.log(this.favorites);
  // return this.favorites.snapshotChanges().pipe(
  //   map((action) =>
  //     action.map((a) => {
  //       console.log(a);

  //       const key = a.payload.key;
  //       const data = a.payload.val();
  //       return data;
  //     })
  //   )
  // );
  // return this.http
  //   .get<any>(
  //     `https://flash-chat-eea54.firebaseio.com/favorite.json?auth=${this.token}`
  //   )
  //   .pipe(
  //     catchError(this.handleError)
  //     // tap((resData) => {
  //     //   this.handleAuthentication(
  //     //     resData.email,
  //     //     resData.localId,
  //     //     resData.idToken,
  //     //     +resData.expiresIn
  //     //   );
  //     // })
  //   );
  // }

  // addFavorite(id: Object) {
  //   // this.list = this.firebase.list('/lists');
  //   this.favorites.add(id);
  // }
}
