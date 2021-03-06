import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardListComponent } from './app/card-list/card-list.component';
import { CardDetailsComponent } from './app/card-details/card-details.component';
import { FavoriteComponent } from './app/favorite/favorite.component';

const routes: Routes = [
  { path: '', component: CardListComponent, pathMatch: 'full' },
  { path: 'favorite', component: FavoriteComponent, pathMatch: 'full' },
  { path: ':id', component: CardDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
