import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../../images/room-1.jpeg";

export default function Room({room}) {
  const { name, images, price } = room;

  return (
    <article className="room">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt="single room" />
        <div className="price-top">
          <h6>${price}</h6>
          <p>per night</p>
        </div>
      </div>
      <p className="room-info">{name}</p>
    </article>
  );
};