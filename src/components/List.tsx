import React, { useState, useEffect } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../fonts.css";
import { FaEye, FaThumbsUp, FaComment } from "react-icons/fa"; // Assuming you are using React Icons library

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto Flex", "sans-serif"].join(","),
    fontWeightBold: 700,
  },
});

interface IData {
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
  likesCount: number;
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

  // Helper function to format the selected option
  const formatOption = (option: string) => {
    switch (option) {
      case "mostviewedposts/":
        return "Most Viewed Posts";
      case "unansweredposts/":
        return "Unanswered Posts";
      case "mostlikedposts/":
        return "Most Liked Posts";
      case "mostansweredposts/":
        return "Most Answered Posts";
      default:
        break;
    }
  };

  // Use the retrieved data
  return (
    <div style={{ overflow: "auto" }}>
      <div style={{ overflow: "auto" }}>
        <div
          style={{
            overflow: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3
            className="card-title"
            style={{
              margin: "0",
              flex: "1",
              alignItems: "center",
              verticalAlign: "middle",
            }}
          >
            {formatOption(selectedOption)}
          </h3>
          <select
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
            style={{
              backgroundColor: "lightgray",
              color: "blue",
              fontSize: "16px",
              padding: "8px",
              border: "none",
              borderRadius: "4px",
              verticalAlign: "middle",
            }}
          >
            <option value="mostviewedposts/">Most Viewed Posts</option>
            <option value="unansweredposts/">Unanswered Posts</option>
            <option value="mostlikedposts/">Most Liked Posts</option>
            <option value="mostansweredposts/">Most Answered Posts</option>
          </select>
        </div>
      </div>
      <div style={{ overflow: "auto", maxHeight: "400px" }}>
        <div className="list-group">
          {data.map((item, index) => (
            <div
              key={item.number}
              className={`list-group-item${
                index !== data.length - 1 ? " mb-3" : ""
              }`}
              style={{ border: "none" }}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{item.title}</h5>
                <small>{item.publishedAt?.slice(0, 10)}</small>
              </div>
              <p>Author: {item.author}</p>
              <p
                className="mb-1"
                style={{
                  height: "100px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.body}
              </p>
              <small style={{ alignItems: "right", color: "gray" }}>
                <FaEye
                  style={{
                    verticalAlign: "middle",
                    marginRight: "10px",
                    marginLeft: "10px",
                  }}
                />
                {item.viewsCount}
                <FaThumbsUp
                  style={{
                    verticalAlign: "middle",
                    marginRight: "10px",
                    marginLeft: "10px",
                  }}
                />
                {item.likesCount}
                <FaComment
                  style={{
                    verticalAlign: "middle",
                    marginRight: "10px",
                    marginLeft: "10px",
                  }}
                />
                {item.answersCount}
              </small>
              {index !== data.length - 1 && (
                <hr style={{ borderStyle: "dotted" }} />
              )}
            </div>
          ))}
        </div>
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
