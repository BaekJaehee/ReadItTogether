import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const GuestBookDelete = async (postId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/guestbook/${postId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default GuestBookDelete;
