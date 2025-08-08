import { CDN_URL } from "../utils/constant";

const ResturantCard = (props) => {
  const { resData } = props;
  const {name, cuisines, avgRating, sla, cloudinaryImageId} = resData?.info;

  return (
    <div className="card-container">
      <div>
        <img
          src={CDN_URL + cloudinaryImageId}
          alt={name}
        />
      </div>
      <div className="description">
        <h3>{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating} Stars</h4>
        <h4>{sla.slaString} minutes</h4>
      </div>
    </div>
  );
};

export const withPromotedLabel = (ResturantCard)=>{
  return(props)=>{
    return(
      <div><label className="promoted">
        Promoted
        </label>
        <ResturantCard {...props}/>
        </div>
    )
  }
}

export default ResturantCard;