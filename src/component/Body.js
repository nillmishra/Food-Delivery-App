import ResturantCard, { withPromotedLabel } from "./ResturantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
const Body = () => {
  const [searchText, setsearchText] = useState("");
  const [filterRes, setfilterRes] = useState([]);
  const [listOfResturant, setlistOfResturant] = useState([]);

  const ResturantCardPromoted = withPromotedLabel(ResturantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.7304683&lng=86.95489889999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setlistOfResturant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfilterRes(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  if (listOfResturant.length === 0) {
    return <Shimmer />;
  }

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search restaurants, cuisines..."
          aria-label="Search"
          value={searchText}
          onChange={(e) => setsearchText(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            const filteredRes = listOfResturant.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setfilterRes(filteredRes);
          }}
        >
          Search
        </button>
      </div>

      <div className="filter-card">
        <div
          onClick={() => {
            setfilterRes(listOfResturant);
          }}
        >
          All
        </div>
        <div
          onClick={() => {
            const filteredRes = listOfResturant.filter(
              (res) => res.info.avgRating > 4
            );
            setfilterRes(filteredRes);
          }}
        >
          Top Rated
        </div>
      </div>
      <div className="res-container">
        {filterRes.map((restaurant) => (
          // Change: Use restaurant.info.id for key (assuming structure)
          <Link
            key={restaurant.info.id}
            to={"/resturants/" + restaurant.info.id}
          >
            {restaurant.info.promoted ? (
              <ResturantCardPromoted resData={restaurant} />
            ) : (
              <ResturantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
