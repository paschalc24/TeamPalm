import React, { useState, useEffect } from "react";
import axios from "axios";
import EnhancedTable from "./EnhancedTable";
import RawStudentStats from "./RawStudentStats";
import Card from "./Card";

// NOTE: Posts by timeframe functionality has been SCRAPPED
// Leaving the functions here incase we decide to reimplement

// define interface for choosing which table to display
interface TableType {
  isMod: boolean;
}

// define interface for raw author data
interface Prop {
  slug: string;
  posts: number[];
  comments: string[];
  firstName: string;
  lastName: string;
  moderator: boolean;
  endorsed_comments: number[];
  answered_posts: number[];
}

// define interface for data used by EnhancedTable
interface Author {
  slug: string;
  postsNum: number;
  commentsNum: number;
  endorsedCommentsNum: number;
  answeredPostsNum: number;
  name: string;
  title: string;
}

// define interface for raw posts data
interface Post {
  number: number;
}

const AuthorTable = ({ isMod }: TableType) => {
  // initializing variables
  const [authorData, setData] = useState<Author[]>([]);
  const [timeFrame, setTimeFrame] = useState<string>("month");

  // Axios request for authors endpoint
  const getData = () => {
    axios
      .get(`http://127.0.0.1:8000/authors/`)
      .then((response) => {
        // convert data into our Author prop, simplifies implementation
        const authorData = response.data
          .filter((prop: Prop) => (isMod ? prop.moderator : !prop.moderator))
          .map((prop: Prop) => convertPropToAuthor(prop));
        setData(authorData);
      })
      .catch((error) => console.log(error));
  };

  // Convert raw data pulled into new datatype
  const convertPropToAuthor = (prop: Prop): Author => {
    return {
      slug: prop.slug,
      postsNum: prop.posts.length,
      commentsNum: prop.comments.length,
      endorsedCommentsNum: prop.endorsed_comments.length,
      answeredPostsNum: prop.answered_posts.length,
      name: `${prop.firstName} ${prop.lastName}`,
      title: isMod ? "Student Name" : "Staff Name",
    };
  };

  // Pull posts information from a specific time frame
  const getPostsByTimeFrame = (option: string) => {
    let startTime = "";
    let endTime = "2022-12-29";
    switch (option) {
      case "month":
        startTime = "2022-11-29";
        break;
      case "week":
        startTime = "2022-12-22";
        break;
      case "day":
        startTime = "2022-12-28";
      case "total":
        startTime = "2022-09-08";
        break;
      default:
        break;
    }
    axios
      .get(`http://127.0.0.1:8000/postsbytimeframe/${startTime}/${endTime}/`)
      .then((response) => {
        // strip data down, only care about the post number
        const posts = response.data.map((post: Post) => post.number);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
    getPostsByTimeFrame(timeFrame);
  }, [setTimeFrame]);

  return (
    <div className="row g-4 mt-4">
      <Card width="100%">
        <RawStudentStats mod={isMod} />
      </Card>
      <Card width="100%">
        <EnhancedTable
          key={authorData.map((row) => row.slug).join(",")}
          rows={authorData}
        />
      </Card>
    </div>
  );
};

export default AuthorTable;
