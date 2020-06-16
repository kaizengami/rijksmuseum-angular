import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CardDetails } from './card-details.model';
import { CardDetailsService } from './card-details.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'],
})
export class CardDetailsComponent implements OnInit {
  id: string = null;
  cardDetails: CardDetails;
  constructor(
    private route: ActivatedRoute,
    private cardDetailsService: CardDetailsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log(this.id);
      this.cardDetailsService
        .getCardDetails(this.id)
        .subscribe((cardDetails: CardDetails) => {
          this.cardDetails = cardDetails;
          console.log(this.cardDetails);
        });
    });
  }
}
