import React from "react";
import { Link, useLocation } from "react-router-dom";

const AccountNav = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkClasses(type = null) {
    let classes = "inline-flex gap-1 py-2 px-6 shadow-md shadow-black";
    if (type === subpage) {
      classes +=
        " text-white bg-gradient-to-tr from-bizluru1  to-bizluru2 border-3 border-slate-300 rounded-full  ";
    } else {
      classes += " text-black bg-gray-300 rounded-full   ";
    }
    return classes;
  }

  return (
    <div>
      {" "}
      <nav className="flex  p-6 text-white   lg:mx-20 mx-4 mb-4 gap-3">
        <Link className={linkClasses("profile")} to={"/account"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          My bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>{" "}
          My places
        </Link>
      </nav>
    </div>
  );
};

export default AccountNav;
