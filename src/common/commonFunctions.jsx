import axios from "axios";
import { BASE_URL } from "../constants/Api";
import Swal from "sweetalert2";

export const APICALL = async (url, data = {}) => {
  console.log("urlllll", url);
  console.log("urlllll", BASE_URL);
  try {
    const config = {
      method: "post",
      url: `${BASE_URL}/${url}`,

      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("Error:", error.message);
    if (error.response) {
      console.log("Server Response:", error.response.data);
    }
    throw error;
  }
};

export const CommonApiResponse = async (url, data, setState) => {
  try {
    const response = await APICALL(url, data);
    console.log("Api Response=>", response);

    if (response.status == true) {
      Swal.fire({
        title: response.message,
        // text: response.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      if (setState) setState((prev) => !prev);
    } else {
      Swal.fire({
        title: response.message,
        // text: response.message,
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
    return {response}
  } catch (error) {
    console.log("error=>", error.message);
    Swal.fire({
      title: error.message,
      // text: error.message,
      icon: "error",
      confirmButtonText: "Retry",
    });
  }
};
