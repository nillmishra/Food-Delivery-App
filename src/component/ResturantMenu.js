import useResturantMenu from "../utils/useResturantMenu";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import ResCategory from "./ResCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useResturantMenu(resId);

  const [showIndex, setShowIndex] = useState(0)

  if (!resInfo) {
    return <Shimmer />;
  }

  // Safe access with optional chaining & fallback to empty objects/arrays
  const infoCard = resInfo?.cards?.[2]?.card?.card?.info || {};
  const groupedCard = resInfo?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR;

  const {
    name = "Unknown Restaurant",
    cuisines = [],
    costForTwoMessage = "Cost info not available",
  } = infoCard;

  const categories = (groupedCard?.cards || []).filter(
    (c) =>
      c.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  console.log("Restaurant Info:", resInfo);
  console.log("Categories:", categories);

  return (
    <div>
      <div className="menu-container">
        <div className="info-container">
          <h1 className="reName">{name}</h1>
          <p className="reinfo">
            {cuisines.join(", ")} - {costForTwoMessage}
          </p>
        </div>
        <h2 className="resMenu">Menu</h2>
        <hr />
        <div>
          {categories.map((cat, index) => (
  <ResCategory
    key={cat.card.card.title || index}
    category={cat.card.card}
    showItems={index === showIndex}
    setShowIndex={() =>
      setShowIndex(prevIndex => prevIndex === index ? null : index)
    }
  />
))}

        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
