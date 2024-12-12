import React, { useEffect, useState } from "react";
import axios from "axios";

const Mypage = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem("token"); // 로그인 시 저장된 토큰
        const response = await axios.get("/me", {
          headers: {
            Authorization: token,
          },
        });
        setUserId(response.data.id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <div>
      <h1>My Page</h1>
      {userId ? <p>User ID: {userId}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Mypage;
