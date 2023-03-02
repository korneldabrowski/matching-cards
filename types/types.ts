export interface CardProps {
  id: number;
  name: string;
  image: string;
}

export interface GeneratedCard extends CardProps {
  cardID: CardProps["id"];
  cardImage: CardProps["image"];
  cardName: CardProps["name"];
}
