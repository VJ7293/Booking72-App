import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import axios from "axios";
import { Swiper, useSwiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const slider = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("./places").then((response) => {
      setPlaces([...response.data]);
    });
  }, []);
  return (
    <section className="blue-glassmorphism ">
      <div className=" mt-8">
        <Swiper>
          {places.length > 0 &&
            places.map((place, id) => (
              <Link className="" key={id}>
                <div className="lg:flex justify-center">
                  {place.photos?.[0] && (
                    <img
                      className="    "
                      src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                      alt=""
                    />
                  )}
                  <h2 className="text-sm turncate uppercase leading-4 font-extrabold  font-signature1">
                    {place.title}
                  </h2>
                  <h3 className="font-bold font-signature1 text-slate-400">
                    {place.address}
                  </h3>
                  <div className="font-semibold mt-1"></div>
                  <span className="font-bold font-signature1">
                    ${place.price} per event
                  </span>
                </div>
              </Link>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default slider;
