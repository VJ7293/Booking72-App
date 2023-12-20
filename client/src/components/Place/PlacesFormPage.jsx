import React, { useState, useEffect } from "react";
import Perks from "../subComponents/Perks";
import PhotosUploader from "../subComponents/PhotosUploader";
import axios from "axios";
import AccountNav from "../subComponents/AccountNav";
import { Navigate, useParams } from "react-router-dom";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return (
      <h2 className="flex justify-center text-2xl mt-4 font-semibold font-signature1 underline underline-offset-3">
        {text}
      </h2>
    );
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm flex justify-center">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  function savePlace(e) {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // Update
      axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // New place
      axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <div>
        <div className="flex justify-center">
          <AccountNav />
        </div>
        <form className="mt-4 font-medium " onSubmit={savePlace}>
          {preInput("Title", "Title for your place")}
          <input
            className="w-full"
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="Title for my apartment"
          />
          {preInput("Address", "Address to your place")}
          <input
            className="w-full"
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            placeholder="Address"
          />
          {preInput("Photos", "More = Better")}
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          {preInput("Description", "Description of the place")}
          <textarea
            className="w-full"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            cols="30"
            row="10"
          ></textarea>
          {preInput("Perks", "Select all the perks of the place")}
          <Perks selected={perks} onChange={setPerks} />
          {preInput("Extra info", "House rules, etc")}
          <textarea
            className="w-full"
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
          {preInput(
            "Check in & out times, max guests",
            "Add check-in and time window for cleaning the room between guests"
          )}
          <div className="font-semibold grid mt-2 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <div className="">
              <h3 className="mt-2 mb-4 text-center">Check-in time</h3>
              <input
                className="w-full"
                type="text"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                placeholder="14"
              />
            </div>
            <div>
              <h3 className="mt-2 mb-4 text-center">Check-out time</h3>
              <input
                className="w-full"
                type="text"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                placeholder="11"
              />
            </div>
            <div>
              <h3 className="mt-2 mb-4 text-center">Max no of guests</h3>
              <input
                className="w-full"
                type="number"
                value={maxGuests}
                onChange={(ev) => {
                  setMaxGuests(ev.target.value);
                }}
              />
            </div>
            <div>
              <h3 className="mt-2 mb-4 text-center">Price per night</h3>
              <input
                className="w-full"
                type="number"
                value={price}
                onChange={(ev) => {
                  setPrice(ev.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="shadow-md shadow-black bg-bizluru2 text-white rounded-full px-8 py-2 my-4">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlacesFormPage;
