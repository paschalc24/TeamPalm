import React, { useEffect, useState } from "react";
import axios from "axios";

const Placeholder = () => {
  const [data, setData] = useState([]);

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
    })
    .finally(function () {
      // always executed
    });

  if (!data) {
    return <div>Loading...</div>;
  }

  // Assuming data stores the array of authors
  // each entry has form {"slug": ..., "posts": [...], "firstName": ..., "lastName": ...}
  let totalUsers = data.length;

  return <div>Placeholder</div>;
};

export default Placeholder;
