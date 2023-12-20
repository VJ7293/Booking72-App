import React, { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import Bizluru from "../../images/Bizluru.jpg";
import { UserContext } from "../../context/UserContext";
const Header = () => {
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [nav, setNav] = useState(false);

  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";
  const isEventsPage = location.pathname === "/events";
  const isContactsPage = location.pathname === "/contacts";

  return (
    // <div className="sticky top-0 z-10 w-full grow  rounded-xl    font-signature1  border-4 border-x-bizluru3 border-y-bizluru3  bg-gradient-to-r from-bizluru2 to-bizluru1">
    <div className="top-0 z-10 w-full grow  rounded-xl    font-signature1  border-4 border-x-bizluru3 border-y-bizluru3  bg-gradient-to-r from-bizluru2 to-bizluru1">
      {" "}
      {/* bg-gradient-to-tr from-bizluru3 to-bizluru4 */}
      <header className="p-4  flex justify-between  ">
        <Link to={"/"} className="flex gap-4 items-center rounded-3xl  ">
          <img
            strokeWidth={0.5}
            stroke="currentColor"
            className="w-20 h-22 font-extrabold  shadow-black shadow-md hover:shadow-2xl hover:shadow-black    rounded-full"
            src={Bizluru}
            alt="vijay"
          />
        </Link>
        <div className=" items-center flex  gap-4 font-semibold shadow-text ">
          {!isHomePage && (
            <Link to="/home" className="text-gray-100 hover:text-slate-800">
              Home
            </Link>
          )}
          {!isAboutPage && (
            <Link
              to="/about"
              className="shadow-text text-slate-100  hover:text-slate-800 "
            >
              About
            </Link>
          )}

          {/* {!isEventsPage && (
            <Link
              to="/events"
              className="shadow-text text-slate-100   hover:text-slate-800"
            >
              Events
            </Link>
          )} */}

          {!isContactsPage && (
            <Link
              to="/contacts"
              className="shadow-text text-slate-100  hover:text-slate-800"
            >
              Contacts
            </Link>
          )}

          <button className="shadow-text border-4 border-slate-400 p-2 bg-slate-100 rounded-full">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 font-extrabold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        {/* {nav ? <FaTimes size={30} /> : <FaBars size={30} />}{" "} */}
        <Link
          to={user ? "/account" : "/login"}
          className="flex font-bold gap-2   px-3 py- rounded-full    bg-gradient-to-tr from-bizluru3 to-bizluru4  hover: border-4 border-white items-center  shadow-black shadow-md hover:shadow-2xl hover:shadow-black   "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 font-extrabold text-slate-900"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="bg-slate-300 rounded-full  items-center text-text overflow-hidden border border-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 relative top-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </div>
          {!!user && <div>{user.name}</div>}
        </Link>
      </header>
    </div>
  );
};

export default Header;
