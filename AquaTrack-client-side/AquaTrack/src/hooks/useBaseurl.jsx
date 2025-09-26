import axios from "axios";
import React from "react";

const useBaseurl = () => {
 const axiosSecret = axios.create({
  baseURL: "http://192.168.1.105:4000", // your PC LAN IP
  withCredentials: true,
});


  return { axiosSecret };
};

export default useBaseurl;
