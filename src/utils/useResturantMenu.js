import { useState, useEffect } from "react";
import { MENU_URL } from "../utils/constant";

const useResturantMenu= (resId)=>{
    const [resInfo, setResInfo] = useState(null);
useEffect(() => {
    if (resId) fetchData();
  }, [resId]);

  const fetchData = async () => {
    const data = await fetch(MENU_URL + resId);
    const json = await data.json();
    setResInfo(json.data);
  };
  return resInfo;

}
export default useResturantMenu;


