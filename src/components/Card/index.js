import React, { useState, useEffect } from "react";
import "./card.css";
import colorData from "../../data/colors.json";

export default function Card({ title, body }) {
  const max_msg = 120;
  const [bgColor, setBGColor] = useState(0);
  const [show, setShow] = useState(true);
  const [btnActivated, setBtnActivated] = useState(false);

  function handleShowMore() {
    setShow(!show);
  }

  async function getColor() {
    let randNum = Math.floor(Math.random() * colorData.length);
    setBGColor(randNum);
  }

  useEffect(() => {
    if (body.length > max_msg) {
      setBtnActivated(true);
    }
    getColor();
  }, []);

  return (
    <div
      className="card-container"
      style={{ background: `${colorData[bgColor].hex}` }}>
      {/* <div className="image-container">
        <img src={imageURL} alt="image" />
      </div> */}
      <div className="card-content">
        <div className="card-title">
          <h3>{title}</h3>
        </div>
        <div className="line">
          <hr />
        </div>
        <div className="card-body">
          {body.length > max_msg ? (
            <div className="card-body">
              {show ? (
                <p>{`${body.substring(0, max_msg)}...`}</p>
              ) : (
                <p>{body}</p>
              )}
            </div>
          ) : (
            <div className="card-body">
              <p>{body}</p>
            </div>
          )}
        </div>
      </div>
      {btnActivated && (
        <div className="btn">
          <button onClick={handleShowMore}>
            {show ? "Show more" : "Show less"}
          </button>
        </div>
      )}
    </div>
  );
}
