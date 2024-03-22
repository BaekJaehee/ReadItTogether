import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleSentCard = async (comment) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/card`,
      {comment: comment}
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { handleSentCard }