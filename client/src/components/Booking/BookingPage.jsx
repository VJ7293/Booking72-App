import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../AddressLink/AddressLink";
import PlaceGallery from "../Place/PlaceGallery";
import BookingDates from "./BookingDates";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);
  if (!booking) {
    return "";
  }
  return (
    <div className="">
      <h1 className=" mt-6 shadow-text lg:mx-48 capitalize font-extrabold text-3xl">
        {booking.place.title}
      </h1>
      <div className="  ">
        <AddressLink className=" my-6 px-2 hover:shadow-black shadow-2xl w-36 bg-gradient-to-r from-bizluru1 to-bizluru2 items-center rounded-full  border-4 ">
          {booking.place.address}
        </AddressLink>
      </div>

      <div className="bg-gray-300  lg:mx-48 p-4 mb-6 rounded-2xl flex justify-between">
        <div>
          <h2 className="text-xl mb-2">Your booking information</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="blue-glassmorphism  border-2 border-slate-600 bg-gradient-to-tr from-bizluru3 to-bizluru4 px-6 text-2xl rounded-2xl items center">
          <div className=" font-medium mt-3"> Total price</div>
          <div className="ml-6 font-signature1  font-semibold">
            {" "}
            {booking.price}
          </div>
        </div>
      </div>
      <div className="flex justify-center w-4/5 ml-10 lg:ml-32 ">
        <PlaceGallery place={booking.place} className="" />
      </div>
    </div>
  );
};

export default BookingPage;
