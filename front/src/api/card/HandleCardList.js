import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleCardList = () => {

  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = axios.get(
      `${API_BASE_URL}/card/list`,
      {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      }
    )
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default handleCardList;