import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './app/header/header.component';
import { CardListComponent } from './app/card-list/card-list.component';
import { CardItemComponent } from './app/card-list/card-item/card-item.component';
import { PaginationComponent } from './app/pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { CardDetailsComponent } from './app/card-details/card-details.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthComponent } from './app/auth/auth.component';
import { FavoriteComponent } from './app/favorite/favorite.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBwJRRCMGacjkGTf1JnR0CwOg0sV4iQWS0',
  authDomain: 'flash-chat-eea54.firebaseapp.com',
  databaseURL: 'https://flash-chat-eea54.firebaseio.com',
  projectId: 'flash-chat-eea54',
  storageBucket: 'flash-chat-eea54.appspot.com',
  messagingSenderId: '982887398849',
  appId: '1:982887398849:web:037df7e6fb978344328340',
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardListComponent,
    CardItemComponent,
    PaginationComponent,
    CardDetailsComponent,
    AuthComponent,
    FavoriteComponent,
  ],
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
