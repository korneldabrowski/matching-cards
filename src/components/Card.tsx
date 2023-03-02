import React, { useState, useEffect } from "react";
import { CardProps } from "../../types/types";
import cn from "../../lib/cn";

interface Props extends CardProps {
  onClick: () => void;
}

const Card = ({ id, name, image, onClick }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  function toggleFlip() {
    onClick();
    setIsFlipped(true);
  }

  return (
    <div
      onClick={toggleFlip}
      className={cn(
        "card-compact card relative mx-auto h-full w-96 cursor-pointer  items-center border-2 bg-base-100 shadow-xl"
        // isFlipped ? "bg-base-100" : " "
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
          src={image}
          alt={`logo of ` + name}
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title mt-auto justify-center ">{name}</h2>
      </div>
    </div>
  );
};

export default Card;
