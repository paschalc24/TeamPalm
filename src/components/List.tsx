import React, { useState, useEffect } from "react";
import axios from "axios";

interface IData {
  // Define the structure of your data
  number: number;
  post_slug: string;
  title: string;
  body: string;
  type: string;
  public: boolean;
  publishedAt: string | null;
  viewsCount: number;
  uniqueViewsCount: number;
  read: boolean;
  modAnsweredAt: string | null;
  answersCount: number;
  author: string;
}

const List = () => {
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/unansweredposts/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const topTenData = data.sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 10);

  // Use the retrieved data in your component
  return (
    <div className="list-group" >
      <h3 className="card-title">Top 10 Unanswered Posts</h3>
      {topTenData.map((item) => (
        <div
          key={item.number}
        >
          <a
            href="#"
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{item.title}</h5>
              <small>{item.publishedAt}</small>
            </div>
            <p>Author: {item.author}</p>
            <p className="mb-1">{item.body}</p>
            <small>Views: {item.viewsCount} Unique Views: {item.uniqueViewsCount}</small>
          </a>
        </div>
      ))}
    </div>
  );
};

export default List;
