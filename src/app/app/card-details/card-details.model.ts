export interface GetCardDetailsResponse {
  artObject: CardDetailsModel;
}

export interface CardDetailsModel {
  objectNumber: string;
  webImage: {
    url: string;
  };
  titles: Array<string>;
  description: string;
  imageUrl: string;
}

export class CardDetails {
  id: string;
  image: string;
  title: string;
  description: string;
  constructor(card: CardDetailsModel) {
    this.id = card.objectNumber;
    this.image = card.webImage.url;
    this.title = card.titles[0];
    this.description = card.description;
  }
}
