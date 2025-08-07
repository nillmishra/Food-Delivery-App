import React, { useState } from "react";

const CardList = ({ items }) => {
  // State to track which item is expanded (using item id or index)
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (key) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div>
      <div className="card-list">
        {items.map((item, index) => {
          const key = item.card.info.name || index; // unique key
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
                <h3>{item.card.info.name || "Unnamed Item"}</h3>
                <h4>{item.card.info.category || "No category"}</h4>
                <h4>
                  ₹
                  {item.card.info.price
                    ? item.card.info.price / 100
                    : item.card.info.defaultPrice / 100}
                </h4>
                <p className={`description-text ${isExpanded ? "expanded" : ""}`}>
                  {item.card.info.description || "No description available."}
                </p>
                {/* Show "More"/"Less" button only if text is long */}
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
                <button className="menu-button">Add</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardList;
