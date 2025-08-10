import CardList from "./CardList";
import { useState } from "react";

const ResCategory = ({ category , showItems, setShowIndex}) => {

  // Toggle the visibility of the items list when category header is clicked
  const clickHandler = () => {
    setShowIndex();
  };

  // Safely access category title or default to "Category"
  const title = category?.title || "Category";
  // Get number of items, default to 0 if none exist
  const itemCount = category?.itemCards?.length || 0;

  return (
    <div>
      {/* Clickable header to toggle item list visibility */}
      <div className="res-category" onClick={clickHandler} style={{ cursor: "pointer" }}>
        <span>
          {title} ({itemCount})
        </span>
        {/* Arrow icon changes based on whether items are shown */}
        <span>{"⬇"}</span>
      </div>

      {/* Conditionally render CardList only when showItems is true */}
      <div>
        {showItems && <CardList items={category?.itemCards || []} />}
      </div>
    </div>
  );
};

export default ResCategory;
