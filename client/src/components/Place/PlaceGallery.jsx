import React, { useState } from "react";
import ScrollArrows from "../ScrollAwrows/ScrollArrows";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PlaceGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const settings = {
    infinite: true,
    dots: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0",
    variableWidth: false,
    dotsClass: "slick-dots slick-thumb",
  };

  if (showAllPhotos) {
    return (
      <div className="w-4/5 lg:ml-20 xs:ml-10">
        {/* <h2 className="text-center text-3xl font-signature1 capitalize font-extrabold  text-black">
          {place.title}
        </h2> */}
        <div className=" mt-2  ">
          <div
            className="
              rounded-2xl px-4 py-6 text-black shadow-2xl shadow-black "
          >
            <button
              onClick={() => setShowAllPhotos(false)}
              className="flex gap-1 mb-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="">
              <div className="  ">
                {place?.photos?.length > 0 && (
                  <Slider {...settings}>
                    {place.photos.map((photo) => (
                      <div key={photo} className="">
                        <img
                          src={"http://localhost:4000/uploads/" + photo}
                          alt=""
                          className=" rounded-2xl cursor-pointer  aspect-square object-cover relative"
                        />
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="  lg:w-4/5 grid gap-2 grid-cols-[2fr_1fr] rounded-2xl shadow-2xl shadow-black p-5 overflow-hidden ">
        {/* changed large screen position css */}
        <div className="">
          {place.photos?.[0] && (
            <div className="">
              <img
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer aspect-square object-cover"
                src={"http://localhost:4000/uploads/" + place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>

        <div className="grid ">
          {place.photos?.[1] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="cursor-pointer aspect-square object-cover relative "
              src={"http://localhost:4000/uploads/" + place.photos[1]}
              alt=""
            />
          )}
          <div className=" overflow-hidden">
            {place.photos?.[2] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer aspect-square object-cover "
                src={"http://localhost:4000/uploads/" + place.photos[2]}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="lg:mx-48 flex  gap-1 absolute bottom-0 right-5 py-2 px-4 mb-6 opacity-70 hover:opacity-100  rounded-2xl shadow-md shadow-slate-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        More Photos
      </button>

      <ScrollArrows />
    </div>
  );
};

export default PlaceGallery;
