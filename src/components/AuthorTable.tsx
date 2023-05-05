import React, { useState, useEffect } from "react";
import axios from "axios";
import EnhancedTable from "./EnhancedTable";

interface TableType {
  isMod: boolean;
}

interface Prop {
  slug: string;
  posts: number[];
  firstName: string;
  lastName: string;
  moderator: boolean;
}

interface Author {
  slug: string;
  postsNum: number;
  name: string;
  title: string;
}

const AuthorTable = ({ isMod }: TableType) => {
  const [selectedOption, setSelectedOption] = useState<string>("authors/");
  const [authorData, setData] = useState<Author[]>([]);
  const getData = (option: string) => {
    axios
      .get(`http://127.0.0.1:8000/${option}`)
      .then((response) => {
        const authorData = response.data
          .filter((prop: Prop) => (isMod ? prop.moderator : !prop.moderator))
          .map((prop: Prop) => convertPropToAuthor(prop));
        setData(authorData);
      })
      .catch((error) => console.log(error));
  };

  const convertPropToAuthor = (prop: Prop): Author => {
    return {
      slug: prop.slug,
      postsNum: prop.posts.length,
      name: `${prop.firstName} ${prop.lastName}`,
      title: isMod ? "Student Name" : "Staff Name",
    };
  };

  useEffect(() => {
    getData(selectedOption);
  }, [selectedOption]);

  return (
    <div>
      <EnhancedTable
        key={authorData.map((row) => row.slug).join(",")}
        rows={authorData}
      />
    </div>
  );
};

export default AuthorTable;

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
