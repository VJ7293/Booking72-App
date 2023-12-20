import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrollArrows from "../ScrollAwrows/ScrollArrows";
import Eventparty from "../../images/Eventparty.jpg";
import IndexPageSlider from "../IndexPageSlider/IndexPageSlider";
import partyCart from "../../images/partyCart1.jpg";
const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("./places").then((response) => {
      setPlaces([...response.data]);
    });
  }, []);

  const links = [
    { name: "Open roles", href: "#" },
    { name: "Internship program", href: "#" },
    { name: "Our values", href: "#" },
    { name: "Meet our leadership", href: "#" },
  ];
  const stats = [
    { name: "Offices worldwide", value: "12" },
    { name: "Full-time colleagues", value: "300+" },
    { name: "Hours per week", value: "40" },
    { name: "Paid time off", value: "Unlimited" },
  ];
  return (
    //

    //
    // indexpage

    <div className=" text-black">
      <div className="shadow-md mt-5  shadow-black rounded-2xl relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src={partyCart}
          alt=""
          className="opacity-90 absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8  text-black">
          <div className="flex justify-center">
            <div className="m-10 white-glassmorphism mx-auto max-w-2xl lg:mx-0">
              <div className="m-10">
                <h2 className="m-10 text-4xl font-bold tracking-tight  sm:text-6xl flex justify-center">
                  Contact Us
                </h2>
                <p className="mt-6 text-lg leading-8">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="white-glassmorphism p-6 text-white rounded-lg shadow-md lg:mx-20 mx-4 mb-4"
              >
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Card {index + 1}
                </h2>
                <p>This is the content of Card {index + 1}.</p>
              </div>
            ))}
          </div>
          <div className="white-glassmorphism mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="m-3 grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7  sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <a key={link.name} href={link.href}>
                  {link.name} <span aria-hidden="true">&rarr;</span>
                </a>
              ))}
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col-reverse">
                  <dt className="text-base leading-7 ">{stat.name}</dt>
                  <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      {/* <div className="  relative ">
        {" "}
        <img
          src={Eventparty}
          className=" absolute  rounded-xl shadow-black shadow-2xl    "
        />{" "}
        <div className="flex justify-center w-1/2">
          <IndexPageSlider places={places} className=" w-1/2 " />
        </div>
      </div> */}
      <div className="my-5 ">
        <div className="relative ">
          <img
            src={Eventparty}
            className="w-full opacity-90 rounded-xl shadow-black shadow-2xl  h-full object-cover absolute inset-0"
          />

          <div className="p-4 grid grid-cols-1 gap-x-8  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 mt-4  ">
            {/* 
          {places.length > 0 &&
            places.map((place, id) => (
              <Link className="" to={"/place/" + place._id} key={id}>
                <div className="rounded-md bg-white  shadow-xs shadow-black p-5 lg:mb-11 overflow-hidden hover:shadow-2xl hover:shadow-black relative">
                  {place.photos?.[0] && (
                    <img
                      className="bg-slate-500 mb-2 rounded-xl object-cover aspect-square shadow-md shadow-black"
                      src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                      alt=""
                    />
                  )}
                  <div className="">
                    <h2 className="text-sm truncate uppercase leading-4 font-extrabold font-signature1">
                      {place.title}
                    </h2>
                    <h3 className="font-bold font-signature1 text-slate-700">
                      place: {place.address}
                    </h3>
                    <span className="font-bold font-signature1">
                      Price: ${place.price} per event
                    </span>
                  </div>
                </div>
              </Link>
            ))} */}
            <div className="flex justify-center">
              <IndexPageSlider places={places} className="  " />
            </div>
            <ScrollArrows className="absolute" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
