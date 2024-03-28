import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleCardList = (page = 0, size = 4) => {

  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = axios.get(
      `${API_BASE_URL}/card/list`,
      {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
        params: {
          page: page,
          size: size
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