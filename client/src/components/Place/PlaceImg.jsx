import React from "react";

const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place || !place.photos?.length) {
    return "";
  }

  if (!className) {
    className = " rounded-md   ";
  }

  return (
    <div>
      <img
        className={className}
        src={"http://localhost:4000/uploads/" + place.photos[index]}
        alt=""
      />
    </div>
  );
};

export default PlaceImg;
