// src/component/CardList.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItems } from "../utils/cartSlice";

const CardList = ({ items }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const dispatch = useDispatch();

  const toggleExpand = (key) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAddItem = (item) => {
    dispatch(addItems(item));
  };

  return (
    <div className="card-list">
      {items.map((item, index) => {
        const key = item.card.info.id || `${item.card.info.name}-${index}`;
        const isExpanded = expandedItems[key];

        return (
          <div
            className={`item-card ${isExpanded ? "expanded" : ""}`}
            key={key}
          >
            <div className="image-box">
              <img
                src={
                  item.card.info.imageId
                    ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/${item.card.info.imageId}`
                    : "https://via.placeholder.com/300x180"
                }
                alt={item.card.info.name || "No Name"}
              />
            </div>

            <div className="description">
              <h3>
                {item.card.info.name}{" "}
                {item.quantity > 1 ? `x ${item.quantity}` : ""}
              </h3>
              <h4>{item.card.info.category || "No category"}</h4>
              <h4>
                ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </h4>
              <p
                className={`description-text ${isExpanded ? "expanded" : ""}`}
              >
                {item.card.info.description ||
                  "No description available."}
              </p>

              {item.card.info.description &&
              item.card.info.description.length > 100 ? (
                <button
                  className="more-button"
                  onClick={() => toggleExpand(key)}
                >
                  {isExpanded ? "Less" : "More"}
                </button>
              ) : null}
            </div>

            <div>
              <button
                className="menu-button"
                onClick={() => handleAddItem(item)}
              >
                Add
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardList;
