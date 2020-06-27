import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CardDetails } from './card-details.model';
import { CardDetailsService } from './card-details.service';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { FavoriteService } from '../favorite/favorite.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'],
})
export class CardDetailsComponent implements OnInit, OnDestroy {
  @Input() inputId: string;
  private userSub: Subscription;
  private favoritesSub: Subscription;
  id: string = null;
  cardDetails: CardDetails;
  isAuthenticated = false;
  isInFavorite: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private favoriteService: FavoriteService,
    private cardDetailsService: CardDetailsService
  ) {}

  ngOnInit(): void {
    if (this.inputId) {
      this.id = this.inputId;
      this.getCardDetails(this.id);
    } else {
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];

        this.getCardDetails(this.id);
      });
    }

    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });

    this.subscribeIsInFavorite();
  }

  getCardDetails(id: string): void {
    this.cardDetailsService
      .getCardDetails(id)
      .subscribe((cardDetails: CardDetails) => {
        this.cardDetails = cardDetails;
        console.log(this.cardDetails);
      });
  }

  subscribeIsInFavorite(): void {
    this.favoritesSub = this.favoriteService.favorites.subscribe(
      (favorites) => {
        this.isInFavorite = this.favoriteService.isInFavorites(this.id);
      }
    );
  }

  toggleFavorite(): void {
    this.favoriteService.updateFavorites(this.id);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.favoritesSub.unsubscribe();
  }
}
