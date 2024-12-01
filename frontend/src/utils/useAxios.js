// import axios from "axios";
// import { getRefreshedToken, isAccessTokenExpired, setAuthUser } from "./auth";
// import { URL } from "./constants";
// import Cookies from "js-cookie";

// const useAxios = () => {
//   const accessToken = Cookies.get("access_token");
//   const refreshToken = Cookies.get("refresh_token");

//   const axiosInstance = axios.create({
//     baseURL: URL,
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });

//   axiosInstance.interceptors.request.use(async (req) => {
//     if (!isAccessTokenExpired) {
//       return req;
//     }
//     console.log(req.headers.Authorization);

//     const response = await getRefreshedToken(refreshToken);
//     setAuthUser(response.access, response.refresh);
//     req.headers.Authorization = `Bearer ${response.data?.access}`;
//     return req;
//   });

//   return axiosInstance;
// };

// export default useAxios;

// import axios from "axios";
// import { getRefreshedToken, isAccessTokenExpired, setAuthUser } from "./auth";
// import Cookies from "js-cookie";
// import { URL } from "./constants";

// const useAxios = () => {
//   const axiosInstance = axios.create({
//     baseURL: URL,
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });

//   axiosInstance.interceptors.request.use(
//     async (req) => {
//       const accessToken = Cookies.get("access_token");
//       const refreshToken = Cookies.get("refresh_token");

//       if (accessToken && isAccessTokenExpired(accessToken)) {
//         try {
//           const response = await getRefreshedToken(refreshToken);
//           setAuthUser(response.access, response.refresh);
//           req.headers.Authorization = `Bearer ${response.access}`;
//         } catch (error) {
//           console.error("Token refresh failed:", error);
//         }
//       } else {
//         req.headers.Authorization = `Bearer ${accessToken}`;
//       }
//       return req;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   return axiosInstance;
// };

// export default useAxios;


import { useMemo } from "react";
import axios from "axios";
import { getRefreshedToken, isAccessTokenExpired, setAuthUser } from "./auth";
import Cookies from "js-cookie";
import { URL } from "./constants";

const useAxios = () => {
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Axios request interceptor
    instance.interceptors.request.use(
      async (req) => {
        const accessToken = Cookies.get("access_token");
        const refreshToken = Cookies.get("refresh_token");

        if (accessToken && isAccessTokenExpired(accessToken)) {
          try {
            const response = await getRefreshedToken(refreshToken);
            setAuthUser(response.access, response.refresh);
            req.headers.Authorization = `Bearer ${response.access}`;
          } catch (error) {
            console.error("Token refresh failed:", error);
            // Handle token refresh failure (logout or redirect)
          }
        } else {
          req.headers.Authorization = `Bearer ${accessToken}`;
        }
        return req;
      },
      (error) => Promise.reject(error)
    );

    return instance;
  }, []);

  return axiosInstance;
};

export default useAxios;
