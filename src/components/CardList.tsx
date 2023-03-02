import { useState, useEffect } from "react";
import GenerateCardData from "../../lib/GenerateCardData";
import Card from "./Card";
import cn from "../../lib/cn";
import { CardProps, GeneratedCard } from "../../types/types";
import ArrayShuffle from "../../lib/ArrayShuffle";

export default function CardList() {
  let numCards = 4;
  const [newGame, setNewGame] = useState<boolean>(false); // [A]
  const [cardDataArray, setCardDataArray] = useState<GeneratedCard[]>([]);
  const [chosenCards, setChosenCards] = useState<GeneratedCard[]>([]); // array of chosen cards
  const [matchedCards, setMatchedCards] = useState<GeneratedCard[]>([]); // array of matched cards

  useEffect(() => {
    if (matchedCards.length === numCards) {
      alert("You won!");
    }
  }, [matchedCards]);

  useEffect(() => {
    setCardDataArray([]);
    setChosenCards([]);
    setMatchedCards([]);
    const cardDataArray = new GenerateCardData().generateCards(numCards);
    const cardDataWithUniqueIDsArray = cardDataArray.flatMap(
      (cardData, index) => {
        const newCardData = { ...cardData };
        newCardData.cardID = Math.random(); // set unique ID for each card
        return [newCardData];
      }
    );
    const doubledCardDataArray = [
      ...cardDataArray,
      ...cardDataWithUniqueIDsArray,
    ];
    setCardDataArray(doubledCardDataArray);
  }, [numCards, newGame]);

  const shuffleArray = () => {
    const shuffled = ArrayShuffle(cardDataArray);
    setCardDataArray(shuffled);
  };

  function handleCardClick(card: GeneratedCard) {
    // If card is already chosen, return
    for (let i = 0; i < matchedCards.length; i++) {
      if (matchedCards[i].cardImage === card.cardImage) {
        return;
      }
    }

    if (
      (chosenCards.length === 1 && chosenCards[0] === card) ||
      chosenCards.length === 2
    ) {
      return;
    }

    // Add newly clicked card to chosenCards array
    const newChosenCards = [...chosenCards, card];
    setChosenCards(newChosenCards);

    // If two cards are chosen, check for a match
    if (newChosenCards.length === 2) {
      if (newChosenCards[0].cardImage === newChosenCards[1].cardImage) {
        setTimeout(() => {
          // If cards match, add them to matchedCards array
          setMatchedCards([...matchedCards, newChosenCards[0]]);
          setChosenCards([]);
          console.log("match");
        }, 200);
      } else {
        setTimeout(() => {
          setChosenCards([]);
          console.log("no match");
        }, 500);
      }
    }
  }

  useEffect(() => {
    console.log("chosenCards", chosenCards);
    console.log("matchedCards", matchedCards);
  }, [chosenCards, matchedCards]);

  return (
    <>
      <div className="mx-auto my-4 flex">
        <button
          onClick={() => setNewGame(!newGame)}
          className="btn-primary btn-wide btn  mx-auto justify-center text-center text-lg"
        >
          New Game
        </button>
        <button
          onClick={shuffleArray}
          className="btn-primary btn-wide btn  mx-auto justify-center text-center text-lg"
        >
          Shuffle me
        </button>
      </div>
      <div
        className={cn(
          " min-h-16  mx-auto grid grid-cols-4 grid-rows-1 items-center justify-center  gap-y-4 border-2 align-middle "
        )}
      >
        {cardDataArray.map((cardData, index) => (
          <Card
            key={cardData.cardID} // include index in key to prevent warnings
            isFlipped={
              chosenCards.includes(cardData) ||
              matchedCards.some(
                (matchedCard) => matchedCard.cardImage === cardData.cardImage
              )
            }
            isChosen={chosenCards.includes(cardData)}
            onClick={(card) => handleCardClick(card)}
            card={cardData}
          />
        ))}
      </div>
    </>
  );
}
