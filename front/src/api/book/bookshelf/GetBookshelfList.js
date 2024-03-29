import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const GetBookShelfList = async (toMemberId, page = 0, size = 10, sort = 0, searchKeyword = null) => {
  // searchKeyword 기본값이 없으면 null(O) ''(X)
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.get(
      `${API_BASE_URL}/bookshelf/${toMemberId}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        params: {
          page: page,
          size: size,
          sort: sort,
          searchKeyword: searchKeyword
        }
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default GetBookShelfList;