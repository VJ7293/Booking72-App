import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Link, Navigate } from "react-router-dom";
import Bizluru from "../../images/Bizluru.jpg";
import validator from "validator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setUser } = useContext(UserContext);
  const errors = {};

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const formValidation = () => {
    if (password.trim().length === 0) {
      errors.password = "Password cannot be blank";
    }

    if (email.trim().length === 0) {
      errors.email = "Email cannot be blank";
    } else if (!validator.isEmail(email)) {
      errors.email = "Invalid email format";
    }
  };

  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    formValidation();

    try {
      const response = await axios.post("/login", { email, password });
      const data = response.data;
      console.log(response.data);
      if (data.errors) {
        toast.error(data.errors, { className: "custom-toast-error" });
      } else if (data.message === "Invalid email or password") {
        toast.error(data.message, { className: "custom-toast-error" });
      } else if (data.message === "User not found") {
        toast.error("User does not exist", { className: "custom-toast-error" });
      } else {
        setUser(data);
        setRedirect(true);
        toast.success(
          "Successfully logged in",
          { transition: Bounce },
          { className: "custom-toast-success" }
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(
        "Login failed",
        { transition: Bounce },
        { className: "custom-toast-error" }
      );
    }
  };

  // const handleLoginSubmit = async (ev) => {
  //   ev.preventDefault();
  //   formValidation();

  //   try {
  //     const response = await axios.post("/login", { email, password });
  //     const data = response.data;

  //     if (data.hasOwnProperty("errors")) {
  //       alert(data.errors);
  //     } else if (data.message === "Invalid email or password") {
  //       alert(data.message);
  //     } else {
  //       setUser(data);
  //       setRedirect(true);
  //       alert("Successfully logged in");

  //       // localStorage.setItem("token", token);
  //       // If you're using a function like handleAuth, you can call it here
  //       // handleAuth();
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //     alert("Login failed");
  //   }
  // };

  // const handleLoginSubmit = async (ev) => {
  //   ev.preventDefault();
  //   formValidation();

  //   const data = await axios
  //     .post("/login", { email, password })
  //     .then((response) => {
  //       if (data.hasOwnProperty("errors")) {
  //         //this can be used instead of above if statement(Object.keys(result).includes(erros))
  //         alert(result.errors);
  //       } else {
  //         setUser(data);
  //         setRedirect(true);
  //         alert("successfully logged in");

  //         localStorage.setItem("token", response.token);
  //         // const { location } = this.props.location.push("/");
  //         handleAuth();
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // if (!errors.email && !errors.password) {
  //   try {
  //     const { data } = await axios.post("/login", { email, password });
  //     localStorage.setItem.JSON.stringify("authtoken", data);
  //     // const authToken = localStorage.getItem.JSON.stringify(
  //     //   "authtoken",
  //     //   data.token
  //     // ); // Replace "authtoken" with the key you used to store the token

  //     setUser(data);
  //     setRedirect(true);
  //     alert("Login successfull");
  //   } catch (e) {
  //     alert("Login failed");
  //   }
  // }
  // };
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-16 grow flex items-center justify-center  ">
      <div className="shadow-2xl shadow-black rounded-md ">
        <h1 className="text-4xl text-center mb-4 font-semibold font-signature1 mt-6">
          Login
        </h1>

        <div className="flex items-center justify-center ">
          <img src={Bizluru} className="w-40 h-30 rounded-full" />
        </div>

        <form
          className="m-2 gap-9 p-4 max-w-md mx-auto relative "
          onSubmit={handleLoginSubmit}
        >
          <input
            className="text-center "
            value={email}
            type="email"
            name="email"
            placeholder="your @email.com"
            onChange={handleEmail}
          />
          {/* <input
            className="text-center "
            value={password}
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            onChange={handlePassword}
          /> */}

          <input
            className="border p-2 pl-10 text-center"
            value={password}
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute inset-y-0 right-0 flex mt-4 items-center px-2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="mr-10 text-bizluru2 "
              />
            ) : (
              <FontAwesomeIcon icon={faEye} className="mr-10 text-bizluru3  " />
            )}
          </div>

          <button className="mt-3  bizluru1">
            {/* onClick={togglePasswordVisibility} */}
            Login
          </button>
          <div className="text-center">
            Don't have an account yet?
            <Link className="underline font-bold ml-2" to="/register">
              Register now
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
