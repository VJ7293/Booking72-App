import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import AccountNav from "../subComponents/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import format from "date-fns/format/index";
import PlaceImg from "../Place/PlaceImg";
import { Link } from "react-router-dom";
// import BookingBg from "../../assets/BokkingBg.jpg";
import { differenceInCalendarDays } from "date-fns/esm";
import BookingDates from "./BookingDates";
import DarkBlueBg from "../../images/DarkBlueBg.jpg";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div className=" relative bg-gray-900 overflow-hidden m-1 rounded-xl">
      <img
        src={DarkBlueBg}
        className="w-full h-full object-cover absolute inset-0"
      />

      <div className="flex justify-center relative z-10">
        <AccountNav />
      </div>

      <div className="mt-8 rounded-sm relative ">
        <div className="gap-4  grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 m-9">
          {bookings?.length > 0 &&
            bookings.map((booking, id) => (
              <Link
                to={`/account/bookings/${booking._id}`}
                key={id}
                className="p-3 mb-4 rounded-2xl overflow-hidden border shadow-lg shadow-black bg-white"
              >
                <div className="border border-slate-400 shadow-sm shadow-slate-400 rounded-2xl">
                  <PlaceImg place={booking.place} />
                </div>
                <div className="py-3 pr-3 text-center grow">
                  <h2 className="text-lg px-4 font-signature1 font-extrabold">
                    {booking.place.title}
                  </h2>

                  <div className="font-signature1 font-semibold items-center">
                    <BookingDates
                      booking={booking}
                      className="flex gap-1 text-sm text-slate-600 items-center text-center justify-center"
                    />

                    <div className="gap-2 text-slate-700 m-2">
                      <span className="text-2xl mr-2">
                        &#8377; Total price:{booking.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
