import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const UserContext = createContext(); // Provide the correct export

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/profile");

        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        // Handle the error or leave user as null
      } finally {
        setReady(true);
      }
    };

    checkAuthStatus();
  }, []); // Empty dependency array means this effect runs once when component mounts

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// export const UserContext = createContext({});

// // Custom hook to fetch and store the user data
// function useUser() {
//   const [user, setUser] = useState(null);
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         // Check if user is not already set and token is available in localStorage
//         if (!user && localStorage.getItem("token")) {
//           // Fetch user data using the profile endpoint
//           const { data } = await axios.get("/profile");
//           setUser(data);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setReady(true);
//       }
//     };

//     fetchUser();
//   }, [user]); // Include user in the dependency array

//   return { user, setUser, ready };
// }

// export function UserContextProvider({ children }) {
//   // Use the custom hook to get the user data and state
//   const { user, setUser, ready } = useUser();

//   return (
//     <UserContext.Provider value={{ user, setUser, ready }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUserContext() {
//   return useContext(UserContext);
// }
//
// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [ready, setReady] = useState(false);
//   const [userLoggedIn, setUserLoggedIn] = useState(false);
//   useEffect(() => {
//     if (!user) {
//       axios.get("/profile").then(({ data }) => {
//         setUser(data);
//         setReady(true);
//       });
//     }
//   });

//   //added by me to check auth

//   return (
//     <UserContext.Provider value={{ user, setUser, ready }}>
//       {children}
//     </UserContext.Provider>
//   );
// }
