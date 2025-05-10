import { AuthContext } from "@/context";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";

const AuthProvider = ({ children }) => {
  //only for date start
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  //only for date end

  const [search, setSearch] = useState("");
  const [date, setDate] = useState(formattedDate);
  const [category, setCategory] = useState();

  const axiosSecure = useAxiosSecure();
  const [user, setUserState] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to update both state and localStorage
  const setUser = (newUser) => {
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
    setUserState(newUser);
  };

  // const { data, isLoading, isError, isFetching } = useQuery({
  //   queryKey: ["update-profile"],
  //   queryFn: async () => {
  //     if (!user?.token) return null; // Prevent fetching if no token

  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_API_URL}/profile/show`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user?.token}`,
  //           },
  //         }
  //       );
  //       setUser({
  //         ...user,
  //         ...response?.data?.data,
  //       });
  //       console.log(user);
  //       return response.data;
  //     } catch (error) {
  //       console.log(error);
  //       console.error("Failed to fetch user data:", error);
  //       return null;
  //     }
  //   },
  //   enabled: !!user?.token, // Prevents execution if there's no token
  // });

  // useEffect(() => {
  //   const syncUserWithLocalStorage = () => {
  //     const storedUser = localStorage.getItem("user");
  //     setUserState(storedUser ? JSON.parse(storedUser) : null);
  //   };
  //   window.addEventListener("storage", syncUserWithLocalStorage);
  //   return () => {
  //     window.removeEventListener("storage", syncUserWithLocalStorage);
  //   };
  // }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, search, setSearch, date, setDate, category, setCategory}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;