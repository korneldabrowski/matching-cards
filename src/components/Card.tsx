import React, { useState, useEffect } from "react";
import { GeneratedCard } from "../../types/types";
import cn from "../../lib/cn";

interface Props {
  card: GeneratedCard;
  isFlipped: boolean;
  isChosen: boolean;
  onClick: (card: GeneratedCard) => void;
}

const Card = ({ card, onClick, isFlipped, isChosen }: Props) => {
  return (
    <div
      onClick={() => onClick(card)}
      className={cn(
        "card-compact card relative mx-auto h-full w-full  cursor-pointer items-center border-2  bg-base-100 shadow-xl hover:shadow-xl hover:shadow-white",
        isChosen && " bg-accent "
      )}
    >
      <img
        src="/questionMark.svg"
        className={cn(
          "absolute z-50 h-full w-full bg-base-300 ",
          isFlipped ? "hidden" : "block"
        )}
      />
      <figure>
        <img
          className="mask mask-hexagon-2 object-fill"
          src={card.cardImage}
          alt={`logo of ` + card.cardName}
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title mt-auto justify-center text-6xl text-accent-content ">
          {card.cardName}
        </h2>
      </div>
    </div>
  );
};

export default Card;
