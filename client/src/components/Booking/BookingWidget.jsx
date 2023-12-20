import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";
import { useContext } from "react";
const BookingWidget = ({ place }) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [checkIn, setCheckIn] = useState(currentDate);
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");

  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);
  const handlePhoneChange = (event) => {
    // Remove non-numeric characters
    const numericValue = event.target.value.replace(/\D/g, "");
    setPhone(numericValue);
  };
  //

  const handleCheckInChange = (e) => {
    const selectedCheckIn = e.target.value;
    setCheckIn(selectedCheckIn);

    // If there is a selected "Check Out" date and it is before the new "Check In" date, clear it
    if (checkOut && new Date(checkOut) < new Date(selectedCheckIn)) {
      setCheckOut("");
    }
  };

  const handleCheckOutChange = (e) => {
    const selectedCheckOut = e.target.value;
    setCheckOut(selectedCheckOut);

    // If the selected "Check Out" date is before the "Check In" date, reset "Check In" date
    if (checkIn && new Date(selectedCheckOut) < new Date(checkIn)) {
      setCheckIn("");
    }
  };
  //

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="">
      <div className="mt-4 bg-white rounded-2xl shadow-2xl shadow-black p-5">
        <div className="text-2xl text-center">
          Price:₹{place.price}/ per Event{" "}
        </div>
        <div className=" rounded-2xl mt-4">
          <div className="flex border rounded-2xl">
            <div className="  py-3 px-4   ">
              <label>Check in: </label>
              <input
                type="date"
                value={checkIn}
                onChange={handleCheckInChange}
                min={currentDate}
              />
            </div>
            <div className=" py-3 px-4 border-l ">
              <label>Check Out:</label>
              <input
                type="date"
                value={checkOut}
                onChange={handleCheckOutChange}
                min={checkIn}
              />
            </div>
          </div>
          <div>
            <div className=" py-3 px-4 border-t mb-2 rounded-2xl border ">
              <label>Number Guests:</label>
              <input
                type="number"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
              />
            </div>
            {numberOfNights > 0 && (
              <div className="py-3 px-4 border-t mb-2 rounded-2xl border ">
                <label>Your full name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="phoneNumber">Phone number:</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="123-456-7890"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>
            )}
            {/* {numberOfNights > 0 && (
              <div className=" py-3 px-4 border-t mb-2 rounded-2xl border ">
                <label>Your full name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Phone number:</label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            )} */}
          </div>
          <button onClick={bookThisPlace} className="bizluru1">
            Book this Place
            {numberOfNights > 0 && (
              <span> ${numberOfNights * place.price}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
