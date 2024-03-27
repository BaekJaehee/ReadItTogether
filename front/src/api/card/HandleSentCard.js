import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleSentCard = async (comment) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.post(
      `${API_BASE_URL}/card`,
      {comment: comment},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default handleSentCard;