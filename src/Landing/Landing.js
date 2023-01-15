import React, { useEffect, useState } from "react";
import "./Landing.css";
export default function Landing({ data }) {
  const [isHolding, setIsHolding] = useState(false);

  const handleMouseDown = (i) => {
    setIsHolding(true);
    const card = document.querySelectorAll(".card");
    card[i].classList.add("cardHover");
  };

  const handleMouseUp = (i) => {
    setIsHolding(false);
    const card = document.querySelectorAll(".card");
    card[i].classList.remove("cardHover");
  };
  const getDate = (dateee) => {
    const dateString = dateee;
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    let dateFormated = date.toLocaleDateString("en-US", options);
    dateFormated = dateFormated.replaceAll(",", "");

    return dateFormated;
  };



  return (
    <div className="landing">
      {data.map((m, i) => (
        <div className="card-container">
          <div
            className="card"
            onMouseDown={() => handleMouseDown(i)}
            onMouseUp={() => handleMouseUp(i)}
            onMouseLeave={() => handleMouseUp(i)}
          >
            <div>
              <h2>{m.rank}</h2>
              <img src={m.images.jpg.large_image_url} alt="AnimeImage" />
            </div>
            <h1>{m.title}</h1>
            <div className="Extra-info">
              <h1>
                <span> Release : </span>
                {getDate(m.aired.from)}
              </h1>
              <h2>
                <span> Latest : </span>{" "}
                {m.aired.to == null ? "Now" : getDate(m.aired.to)}
              </h2>
              <h3>
                <span> Rating : </span> {m.rating}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
