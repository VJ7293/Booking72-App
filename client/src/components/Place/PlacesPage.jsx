import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AccountNav from "../subComponents/AccountNav";
import axios from "axios";
import PlaceImg from "./PlaceImg";
import ScrollArrows from "../ScrollAwrows/ScrollArrows";
// ... (other imports)

// ... (other imports)

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [truncateDescriptions, setTruncateDescriptions] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
      setTruncateDescriptions(Array(data.length).fill(true));
    });
  }, []);

  const toggleTruncate = (index) => {
    setTruncateDescriptions((prev) => {
      const newTruncateDescriptions = [...prev];
      newTruncateDescriptions[index] = !newTruncateDescriptions[index];
      return newTruncateDescriptions;
    });
  };

  return (
    <div className="m-5 sm:m-10 md:m-10 lg:m-5 ">
      <div className="flex justify-center">
        <AccountNav />
      </div>

      <div className="flex justify-center">
        {" "}
        <div className="text-center inline-flex   py-2 px-6 rounded-full shadow-md shadow-black text-white bg-gradient-to-tr from-bizluru1  to-bizluru2 border-3 border-slate-300  ">
          <Link className="inline-flex gap-1  " to={"/account/places/new"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Add new place
          </Link>
        </div>
      </div>

      <div className="font-signature1 font-bold text-center mt-4 gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols- 2xl:grid-cols-6">
        {places.length > 0 &&
          places.map((place, index) => (
            <div
              className="gap-4 shadow-md shadow-slate-400 cursor-pointer bg-slate-100 mb-3 p-4 rounded-2xl border border-slate-200"
              key={index}
            >
              <a href={"/account/places/" + place._id} key={index}>
                <div className="bg-slate-400 shadow-sm shadow-black rounded-md shrink-0">
                  <PlaceImg key={place.id} place={place} />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl bold text-center">{place.title}</h2>
                  <br />
                  <p className="text-sm mt-2 text-center">
                    {truncateDescriptions[index]
                      ? `${place.description.slice(0, 100)}...`
                      : place.description}
                  </p>
                </div>
              </a>

              {place.description.length > 100 && (
                <button
                  className="text-blue-500 underline cursor-pointer"
                  onClick={() => toggleTruncate(index)}
                >
                  {truncateDescriptions[index] ? "Read more" : "Read less"}
                </button>
              )}
            </div>
          ))}
      </div>
      <ScrollArrows />
    </div>
  );
};

export default PlacesPage;
