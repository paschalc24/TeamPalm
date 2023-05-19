import React, { useState, useEffect } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FaEye, FaThumbsUp, FaComment } from "react-icons/fa";
import { Spinner } from 'react-bootstrap';


const theme = createTheme({
  typography: {
    fontFamily: ["Roboto Flex", "sans-serif"].join(","),
    fontWeightBold: 700,
  },
});

interface IData {
    number: number;
    post_slug: string;
    post: string;
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

interface PersonListProps {
    authorSlug: string;
    firstName: string;
}

const PersonList: React.FC<PersonListProps> = ({ authorSlug, firstName }) => {
    const [selectedOption, setSelectedOption] = useState<string>("posts/");
    const [data, setData] = useState<IData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getData = (option: string) => {
        setLoading(true);
        axios
        .get(`http://127.0.0.1:8000/${option}`)
        .then((response) => {
            console.log(response);
            setData(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    };

    useEffect(() => {
        getData(selectedOption);
    }, [selectedOption]);

    // Helper function to format the selected option
    const formatOption = (option: string) => {
        switch (option) {
            case "posts/":
            return firstName + "'s Posts";
            case "comments/":
            return firstName + "'s Comments";
            default:
            break;
        }
    };

    const entryTitleOption = (option: string, item: IData) => {
        switch (option) {
            case "posts/":
            return item.title;
            case "comments/":
            return "Under post: " + "#" + item.post;
            default:
            break;
        }
    }

  // Use the retrieved data
  
  const filteredData = data.filter(item => item.title !== "" && item.author == authorSlug);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ overflow: "auto", width: "100%" }}>
      <div
                style={{ overflow: "auto", display: "flex", paddingBottom: "20px", paddingRight: "20px" }}
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
                        paddingLeft: "30px",
                        flex: "1",
                        alignItems: "center",
                        textAlign: "left",
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
                        color: "#9925BE",
                        fontSize: "12px",
                        padding: "8px",
                        border: "none",
                        borderRadius: "8px",
                        verticalAlign: "middle",
                        fontWeight: "normal",
                        fontFamily: theme.typography.fontFamily,
                    }}
                    >
                    <option value="posts/">Posts</option>
                    <option value="comments/">Comments</option>
                    </select>
                </div>
            </div>
        {loading ? (
          <div style={{display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                       height: "300px", 
                       width: "488px"
                     }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
            <div style={{ overflow: "auto", width: "100%" }}>
                
                <div style={{ overflow: "auto", height: "300px", paddingRight: "10px" }}>
                <div className="list-group">
                    {filteredData.length === 0 ? (
                    // No data left after filter
                    <div style={{ padding: '20px', textAlign: 'center', width: "488px" }}>No items to display.</div>
                    ) : (

                    filteredData.map((item, index) => (
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
                                {entryTitleOption(selectedOption, item)}
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
                                fontSize: "12px",
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
                    ))
                    )
                }
                </div>
                </div>
            </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default PersonList;
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
