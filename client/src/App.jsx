import { Route, Routes } from "react-router-dom";
import IndexPage from "./components/pages/IndexPage";
import LoginPage from "./components/pages/LoginPage";
import Layout from "./components/Layout/Layout";
import RegisterPage from "./components/pages/RegisterPage";
import ProfilePage from "./components/ProfilePage";
import PlacesPage from "./components/Place/PlacesPage";
import PlacesFormPage from "./components/Place/PlacesFormPage";
import axios from "axios";
import "./index.css";
import { UserContextProvider } from "./context/UserContext";
import About from "./components/pages/About";
import Events from "./components/pages/Events";
import Contacts from "./components/pages/Contacts";
import HomePage from "./components/pages/HomePage";
import PlacePage from "./components/Place/PlacePage";
import "./App.css";
import BookingsPage from "./components/Booking/BookingsPage";
import BookingPage from "./components/Booking/BookingPage";

axios.defaults.baseURL = "http://127.0.0.1:4000/";
axios.defaults.withCredentials = true;

// axios.defaults.baseURL =
//   process.env.NODE_ENV === "production"
//     ? "https://your-render-app.onrender.com/"
//     : "http://127.0.0.1:4000/";

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />

          <Route path="/account/bookings/:id" element={<BookingPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contacts" element={<Contacts />} />
        </Route>
        {/* 
        <Route path="/register" element={<RegisterPage />} /> */}
      </Routes>
    </UserContextProvider>
  );
}

export default App;
