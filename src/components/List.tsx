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
  const [selectedOption, setSelectedOption] =
    useState<string>("unansweredposts/");
  const [data, setData] = useState<IData[]>([]);

  const getData = (option: string) => {
    axios
      .get(`http://127.0.0.1:8000/${option}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData(selectedOption);
  }, [selectedOption]);

  // Use the retrieved data in your component
  return (
    <div>
      <select
        value={selectedOption}
        onChange={(event) => setSelectedOption(event.target.value)}
        style={{}}
      >
        <option value="mostviewedposts/">Most Viewed Posts</option>
        <option value="unansweredposts/">Unanswered Posts</option>
        <option value="mostlikedposts/">Most Liked Posts</option>
        <option value="mostansweredposts/">Most Answered Posts</option>
      </select>
      <div className="list-group">
        <h3 className="card-title" style={{ paddingBottom: "20px" }}>
          Top 10 Unanswered Posts
        </h3>
        {data.map((item) => (
          <div key={item.number}>
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
              <small>
                Views: {item.viewsCount} Unique Views: {item.uniqueViewsCount}
              </small>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

// Do we want to display more types of posts
/* return (
    <div>
      <select
        value={selectedOption}
        onChange={(event) => setSelectedOption(event.target.value)}
      >
        <option value="mostviewedposts/">Most Viewed Posts</option>
        <option value="unansweredposts/">Unanswered Posts</option>
        <option value="posts/">Posts</option>
      </select>
      <ul>
        <EnhancedTable key={selectedOption} rows={data} />
      </ul>
    </div>
  ); */
