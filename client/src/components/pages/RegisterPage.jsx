import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom"; // Remove `useHistory` from the import
import Bizluru from "../../images/Bizluru.jpg";
import validator from "validator";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [redirect, setRedirect] = useState(false);
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const formValidation = () => {
    const errors = {};

    if (name.trim().length === 0) {
      errors.name = "Name cannot be blank";
    }
    if (password.trim().length === 0) {
      errors.password = "Password cannot be blank";
    } else if (!validator.isStrongPassword(password)) {
      errors.password = "Password is not strong";
    }
    if (email.trim().length === 0) {
      errors.email = "Email cannot be blank";
    } else if (!validator.isEmail(email)) {
      errors.email = "Invalid email format";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValidation()) {
      try {
        const response = await axios.post("/register", {
          name,
          email,
          password,
        });

        if (response.status === 200) {
          alert("Successfully created user. You can log in.");
          setRedirect(true); // Redirect to the login page
        }
      } catch (error) {
        console.error(error);
        alert("Registration failed. Please try again later.");
      }
    }
  };
  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    // <div className="mt-4 grow flex items-center justify-around"> this was as per airbnb app
    <div className="mt-24 grow flex items-center justify-around">
      <div className=" rounded-t-xl rounded-b-xl shadow-black shadow-xl">
        <h1 className="text-4xl text-center mb-4 font-semibold font-signature1">
          Register
        </h1>
        <div className="flex  items-center justify-center">
          <img
            src={Bizluru}
            className="w-40 h-30 rounded-full"
            alt="Bizluru Logo"
          />
        </div>
        <form className="gap-9 p-4 max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            className="text-center"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleName}
          />
          {formErrors.name && (
            <span className="pl-28 font-signature1">{formErrors.name}</span>
          )}
          <input
            className="text-center"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmail}
          />
          <div className="text-center font-signature1">
            {formErrors.email && <span>{formErrors.email}</span>}
          </div>
          <input
            className="text-center"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handlePassword}
          />
          <div className="font-signature1 text-center">
            {formErrors.password && <span>{formErrors.password}</span>}
          </div>
          <button className="bizluru1" type="submit">
            Register
          </button>
          <div className="text-center">
            Already a member?{" "}
            <Link className="ml-1 underline font-bold" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
