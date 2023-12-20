import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../Booking/BookingWidget";
import PlaceGallery from "./PlaceGallery";
import AddressLink from "../AddressLink/AddressLink";
import ScrollArrows from "../ScrollAwrows/ScrollArrows";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className=" mt-4  px-8 py-8 ">
      <h1 className="lg:mx-48 shadow-text capitalize underline underline-offset-4  font-signature1 font-extrabold text-3xl">
        {place.title}
      </h1>
      <div className="lg:mx-48">
        <AddressLink className="my-6 px-2 hover:shadow-black shadow-2xl w-36 bg-gradient-to-r from-bizluru1 to-bizluru2 items-center rounded-full  border-4 border-bizluru4">
          {place.address}
        </AddressLink>
      </div>

      <div className=" ">
        <div className="  grid grid-cols-1 gap-4 md:grid-cols-2  lg:grid-cols-2     xl:grid-cols-2 2xl:grid-cols-2 ">
          {" "}
          <PlaceGallery place={place} />
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="my-8 lg:mx-48 ">
        <div className="my-4 rounded-2xl shadow-2xl shadow-black p-5  ">
          <h2 className="font-semibold underline underline-offset-4 text-2xl">
            Description
          </h2>
          {place.description}
          check-in:{place.checkIn} <br />
          check-out:{place.checkOut}
          <br />
          Max number of guests:{place.maxGuests}
        </div>
      </div>
      <div className="lg:mx-48 bg-white shadow-2xl shadow-black  px-8 py-8 rounded-2xl rs p-5">
        <div>
          <h2 className=" font-semibold underline underline-offset-4 text-2xl ">
            Extra Info
          </h2>
        </div>
        <div className=" font-md  mb-4 mt-1 text-sm text-gray-700 leading-4">
          {place.extraInfo}
        </div>
      </div>
      <ScrollArrows />
    </div>
  );
};

export default PlacePage;
