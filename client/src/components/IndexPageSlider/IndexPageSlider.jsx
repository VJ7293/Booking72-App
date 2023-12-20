import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import IndexPageBg2 from "../../images/indexPageBg.jpg";
const YourComponent = ({ places }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust the number of slides per view as needed
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="text-white  w-4/5">
      <div className="relative ">
        <div
        // className=" m-6 overflow-hidden "
        // style={{ backgroundImage: `url(${IndexPageBg2})` }}
        />
        <Slider {...settings}>
          {places.length > 0 &&
            places.map((place, id) => (
              <Link key={id} to={`/place/${place._id}`} className=" ">
                <div className="white-glassmorphism  m-1 shadow-md bg-white shadow-black p-5  overflow-hidden hover:shadow-2xl hover:shadow-black relative">
                  {place.photos?.[0] && (
                    <img
                      className="  mb-2  object-cover aspect-square shadow-md shadow-black"
                      src={`http://localhost:4000/uploads/${place.photos?.[0]}`}
                      alt=""
                    />
                  )}
                  <div>
                    <h2 className="text-sm truncate uppercase leading-4 font-extrabold font-signature1">
                      {place.title}
                    </h2>
                    <h3 className="font-bold font-signature1 text-slate-100">
                      place: {place.address}
                    </h3>
                    <span className="font-bold font-signature1">
                      Price: ${place.price} per event
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default YourComponent;
