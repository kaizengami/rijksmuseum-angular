import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError, Subject, from } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

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
  favorites: AngularFirestoreCollection;
  userId: string;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private firestore: AngularFirestore
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;

        this.getFavorites();
      }
    });

    // this.favorites = this.db.list(`favorite/${this.userId}`);
    // this.favorites.snapshotChanges().subscribe((favorite) => {
    //   console.log(favorite);
    // });
  }

  getFavorites() {
    console.log(this.userId);
    if (!this.userId) return;
    this.favorites = this.firestore.collection(`favorite`);
    return this.favorites;
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
  }

  addFavorite(id: Object) {
    // this.list = this.firebase.list('/lists');
    this.favorites.add(id);
  }
}
