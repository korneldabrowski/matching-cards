export interface CardProps {
  id: number;
  name: string;
  image: string;
  isFlipped?: boolean;
}

export interface GeneratedCard extends CardProps {
  cardID: CardProps["id"];
  cardImage: CardProps["image"];
  cardName: CardProps["name"];
  cardFlipped: CardProps["isFlipped"];
}
