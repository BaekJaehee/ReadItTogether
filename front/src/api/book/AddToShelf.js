import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AddToShelf = async (bookId, isRead) => {
  const requestBody = {
    bookId: bookId,
    isRead: isRead
  }
  
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.post(
      `${API_BASE_URL}/bookshelf/upload`,
      requestBody,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
      }
    )
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default AddToShelf;