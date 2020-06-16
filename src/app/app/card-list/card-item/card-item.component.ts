import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css'],
})
export class CardItemComponent implements OnInit {
  @Input() title: string;
  @Input() backgroundUrl: string;
  @Input() id: string;

  constructor() {}

  ngOnInit(): void {
    console.log(this.title);
    console.log(this.backgroundUrl);
    console.log(this.id);
  }
}
