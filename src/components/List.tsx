import React, { useState, useEffect } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FaEye, FaThumbsUp, FaComment } from "react-icons/fa";

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
    <ThemeProvider theme={theme}>
      <div style={{ overflow: "auto", width: "400px" }}>
        <div
          style={{ overflow: "auto", display: "flex", paddingBottom: "20px" }}
        >
          <div
            style={{
              overflow: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flex: "1",
            }}
          >
            <h3
              className="card-title"
              style={{
                margin: "0",
                flex: "1",
                alignItems: "center",
                textAlign: "center",
                fontFamily: theme.typography.fontFamily,
                fontSize: "22px",
              }}
            >
              {formatOption(selectedOption)}
            </h3>
            <select
              value={selectedOption}
              onChange={(event) => setSelectedOption(event.target.value)}
              style={{
                backgroundColor: "#F6F6F6",
                color: "#4174F7",
                fontSize: "12px",
                padding: "8px",
                border: "none",
                borderRadius: "8px",
                verticalAlign: "middle",
                fontWeight: "normal",
                fontFamily: theme.typography.fontFamily,
              }}
            >
              <option value="mostviewedposts/">Most Viewed Posts</option>
              <option value="unansweredposts/">Unanswered Posts</option>
              <option value="mostlikedposts/">Most Liked Posts</option>
              <option value="mostansweredposts/">Most Answered Posts</option>
            </select>
          </div>
        </div>
        <div style={{ overflow: "auto", maxHeight: "425px" }}>
          <div className="list-group">
            {data
              .filter((item) => item.title !== "")
              .map((item, index) => (
                <div key={item.number}>
                  <div
                    className={`list-group-item${
                      index !== data.length - 1 ? " mb-3" : ""
                    }`}
                    style={{ border: "none" }}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5
                        className="mb-1"
                        style={{
                          fontFamily: theme.typography.fontFamily,
                          fontSize: "18px",
                        }}
                      >
                        {item.title}
                      </h5>
                      <small
                        style={{
                          fontFamily: "sans-serif",
                          fontWeight: "normal",
                          fontSize: "12px",
                          color: "gray",
                        }}
                      >
                        {item.publishedAt?.slice(0, 10)}
                      </small>
                    </div>
                    <p
                      className="mb-1"
                      style={{
                        height: "75px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontFamily: "sans-serif",
                        fontSize: "13px",
                      }}
                    >
                      {item.body}
                    </p>
                    <small
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "gray",
                        fontFamily: "sans-serif",
                        paddingTop: "15px",
                      }}
                    >
                      <FaEye style={{ marginRight: "10px" }} />
                      {item.viewsCount}
                      <FaThumbsUp
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                      />
                      {item.likesCount}
                      <FaComment
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                      />
                      {item.answersCount}
                    </small>
                  </div>
                  {index !== data.length - 1 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingBottom: "10px",
                      }}
                    >
                      <hr
                        style={{
                          width: "90%",
                          borderStyle: "dotted",
                          borderWidth: "1px",
                          margin: "0",
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
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
