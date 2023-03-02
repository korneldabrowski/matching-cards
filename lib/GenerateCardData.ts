import Data from "./Data.json";
import { CardProps, GeneratedCard } from "../types/types";

export class Card {
  id: CardProps["id"];
  image: CardProps["image"];
  name: CardProps["name"];
  isFlipped: CardProps["isFlipped"] = false;

  constructor(
    id: CardProps["id"],
    image: CardProps["image"],
    name: CardProps["name"],
    isFlipped: CardProps["isFlipped"] = false
  ) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.isFlipped = isFlipped;
  }
}

class GenerateCardData {
  cards: Card[] = [];

  generateCards(numberOfCards: number) {
    const cardData = Data.map(
      ({ id, image, name }) => new Card(id, image, name)
    );

    while (this.cards.length < numberOfCards && cardData.length) {
      const randomIndex = Math.floor(Math.random() * cardData.length);
      const randomCard = cardData[randomIndex];

      if (!this.cards.some((card) => card.id === randomCard.id)) {
        this.cards.push(randomCard);
      }

      cardData.splice(randomIndex, 1);
    }

    return this.cards.map(({ id, image, name, ...rest }) => ({
      cardID: id,
      cardImage: image,
      cardName: name,
      ...rest,
    })) as GeneratedCard[];
  }
}

export default GenerateCardData;
