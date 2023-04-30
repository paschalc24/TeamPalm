import React, { useEffect, useState } from "react";
import axios from "axios";

const Placeholder = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/authors/")
      .then(function (response) {
        // handle success
        console.log(response);
        setData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  // Assuming data stores the array of authors
  // each entry has form {"slug": ..., "posts": [...], "firstName": ..., "lastName": ...}
  let totalUsers = data.length;

  return <div>{totalUsers}</div>;
};

export default Placeholder;
