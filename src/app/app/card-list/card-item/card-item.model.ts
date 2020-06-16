export interface GetCardListResponse {
  artObjects: Array<CardModel>;
}

export interface CardModel {
  objectNumber: string;
  headerImage: {
    url: string;
  };
  longTitle: string;
  imageUrl: string;
}

export class Card {
  id: string;
  headerImage: string;
  longTitle: string;
  constructor(card: CardModel) {
    this.id = card.objectNumber;
    this.headerImage = card.headerImage.url;
    this.longTitle = card.longTitle;
  }
}
