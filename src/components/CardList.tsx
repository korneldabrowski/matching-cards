import { useState, useEffect } from "react";
import GenerateCardData from "../../lib/GenerateCardData";
import Card from "./Card";
import cn from "../../lib/cn";
import { CardProps, GeneratedCard } from "../../types/types";
import ArrayShuffle from "../../lib/ArrayShuffle";

export default function CardList() {
  const [cardDataArray, setCardDataArray] = useState<GeneratedCard[]>([]);
  const numCards = 5;

  useEffect(() => {
    const cardDataArray = new GenerateCardData().generateCards(numCards);
    const doubledCardDataArray = [...cardDataArray, ...cardDataArray]; // double the card data array
    setCardDataArray(doubledCardDataArray);
  }, [numCards]);

  const shuffleArray = () => {
    const shuffled = ArrayShuffle(cardDataArray);
    setCardDataArray(shuffled);
  };

  return (
    <>
      <div className="mx-auto my-4 flex">
        <button
          onClick={shuffleArray}
          className="btn-secondary btn-wide btn  mx-auto justify-center text-center text-lg"
        >
          Shuffle me
        </button>
      </div>
      <div
        className={cn(
          " min-h-16  mx-auto grid grid-cols-3 grid-rows-1 items-center justify-center  gap-y-4 border-2 align-middle "
        )}
      >
        {cardDataArray.map((cardData, index) => (
          <Card
            onClick={() => console.log("clicked " + cardData.cardName)}
            key={`${cardData.cardID}-${index}`} // include index in key to prevent warnings
            id={cardData.cardID}
            name={cardData.cardName}
            image={cardData.cardImage}
          />
        ))}
      </div>
    </>
  );
}
