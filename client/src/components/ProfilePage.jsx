import React, { useContext, useState, useEffect } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./Place/PlacesPage";
import { UserContext } from "../context/UserContext";
import AccountNav from "./subComponents/AccountNav";

import ProfilePageBg from "../images/ProfileBg.jpg";
const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);

  const [profilePageBg, setProfilePageBg] = useState(null);

  useEffect(() => {
    const loadProfilePageBg = async () => {
      try {
        const module = await import("../images/ProfileBg.jpg");
        const image = module.default;
        setProfilePageBg(image);
      } catch (error) {
        console.error("Error loading ProfileBg.jpg:", error);
      }
    };

    loadProfilePageBg();
  }, []); // Empty
  //
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
  // const [userLoggedIn, setUserLoggedIn] = useState(false);

  // const handleAuth = () => {
  //   setUserLoggedIn(!userLoggedIn);
  // };
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     handleAuth();
  //   }
  // }, []);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  // Function to clear the token from local storage when the user logs out
  // function clearLocalStorageToken() {
  //   localStorage.removeItem("authtoken"); // Replace "authToken" with the key you used to store the token
  // }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
    // clearLocalStorageToken();
  }

  if (!ready) {
    return "Loading...";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className=" rounded-2xl mb-4 ">
      <div className="m-2    h-min-screen ">
        {/* // */}

        <div className="rounded-2xl relative isolate overflow-hidden bg-gray-900  sm:py-32">
          <div className="flex justify-center">
            <AccountNav />
          </div>
          <img
            src={profilePageBg}
            alt=""
            className="rounded-2xl absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
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
          <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
            <div className="flex justify-center">
              <div className="m-10 blue-glassmorphism mx-auto max-w-2xl lg:mx-0">
                <div className="m-10">
                  <h2 className="m-10 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl flex justify-center">
                    Contact Us
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-00">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                    qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                    occaecat fugiat aliqua.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-10"></div>
            <div className="blue-glassmorphism mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="  m-3 grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                {links.map((link) => (
                  <a key={link.name} href={link.href}>
                    {link.name} <span aria-hidden="true">&rarr;</span>
                  </a>
                ))}
              </div>
              <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.name} className="flex flex-col-reverse">
                    <dt className="text-base leading-7 text-gray-300">
                      {stat.name}
                    </dt>
                    <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {subpage === "profile" && (
                // <div className="text-center mt-10">
                <div className="flex justify-center p-6 text-white">
                  {user && (
                    <div className="text-center items-center  font-signature1 font-extrabold">
                      {user.name} {user.email} <br />
                      <button
                        onClick={logout}
                        className="mt-5 px-8 py-2 font-signature1 font-semibold text-white rounded-full bg-gradient-to-r from-bizluru2 to-bizluru1  shadow-black shadow-md"
                      >
                        logout
                      </button>
                    </div>
                  )}
                </div>
              )}
              {subpage === "places" && (
                <div className="">
                  <PlacesPage />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* // */}
      </div>
    </div>
  );
};

export default ProfilePage;
