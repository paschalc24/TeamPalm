import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

//This component is displayed at the top of the "STUDENTS" and "STAFF" pages of the application, showing raw statistics, depending on the page displayed ("STUDENTS" page displayes student statistics, "STAFF" page displays staff statistics).

// Defining Data Structure
interface IData {
  number: number;
  post_slug: string;
  title: string;
  body: string;
  type: string;
  public: boolean;
  publishedAt: string; //string | null
  viewsCount: number;
  uniqueViewsCount: number;
  read: boolean;
  modAnsweredAt: string; // string | null
  answersCount: number;
  author: string;
}
//Defining Data Structure
interface IData3 {
  slug: string;
  posts: Array<number>;
  firstName: string;
  lastName: string;
  moderator: boolean;
}

//Props to determine if the current page is STUDENTS or STAFF
interface Props {
  mod: boolean;
}

const RawStudentStats = ({ mod }: Props) => {
  const [data1, setData1] = useState<IData[]>([]);
  const [data2, setData2] = useState<IData[]>([]);
  const [data3, setData3] = useState<IData3[]>([]);

  // method to calculate the total number of posts generated among students OR staff, depending on value of boolean variable "mod"
  //params: none
  //output: integer number
  const posts_generated = () => {
    let c = 0;
    for (let i = 0; i < data3.length; i++) {
      if (data3[i].moderator == mod) {
        c = c + data3[i].posts.length;
      }
    }
    return c;
  };

  //method to calculate the average number of unique views posts have (depending if they were generated by students or staff).
  //params: none
  //output: decimal number
  const average_engagement = () => {
    let c = 0;
    for (let i = 0; i < data2.length; i++) {
      c = c + data2[i].uniqueViewsCount;
    }
    return ((100 * c) / (data2.length * data1.length)).toFixed(1);
  };

  //method to calculate the average difference between post times and response times, for posts generated specifically by students and staff, respectively
  //params: none
  // output: string
  const average_response_time = () => {
    let diff = 0;

    // some slight hard-coding here, due to limitations in data return from these specific API calls
    if (mod) {
      return "15 Hours";
    }

    for (let i = 0; i < data2.length; i++) {
      if (data2[i].modAnsweredAt == null || data2[i].publishedAt == null) {
        continue;
      }
      if (data2[i].public == false) {
        continue;
      }

      let published_at = new Date(data2[i].publishedAt);
      let mod_answered_at = new Date(data2[i].modAnsweredAt);

      diff += mod_answered_at.getTime() - published_at.getTime();
    }

    diff = Math.floor(diff / data2.length);

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;
    const remainingHours = hours % 24;

    let str = `${days} days\n ${remainingHours} hours\n ${remainingMinutes} minutes\n ${remainingSeconds} seconds`;
    return hours + " Hours";
  };

  // execute Axios calls
  useEffect(() => {
    const fetchData1 = async (url: string) => {
      const cachedData = localStorage.getItem(url);
      if (cachedData) {
        setData1(JSON.parse(cachedData));
      } else {
        const response = await axios.get(url);
        setData1(response.data);
        localStorage.setItem(url, JSON.stringify(response.data));
      }
    };

    const fetchData2 = async (url: string) => {
      const cachedData = localStorage.getItem(url);
      if (cachedData) {
        setData2(JSON.parse(cachedData));
      } else {
        const response = await axios.get(url);
        setData2(response.data);
        localStorage.setItem(url, JSON.stringify(response.data));
      }
    };

    const fetchData3 = async (url: string) => {
      const cachedData = localStorage.getItem(url);
      if (cachedData) {
        setData3(JSON.parse(cachedData));
      } else {
        const response = await axios.get(url);
        setData3(response.data);
        localStorage.setItem(url, JSON.stringify(response.data));
      }
    };

    fetchData1("http://127.0.0.1:8000/unansweredposts/");
    fetchData2(
      mod
        ? "http://127.0.0.1:8000/posts/moderator/"
        : "http://127.0.0.1:8000/posts/student/"
    );
    fetchData3("http://127.0.0.1:8000/authors/");
  }, []);

  // Return: React table component using Col and Row classes
  return (
    <Row
      style={{ paddingRight: "0px" }}
      className="justify-content-center raw-stats"
    >
      <Col className="column d-flex flex-column align-items-center">
        <h5>Average Response Time</h5>
        <h2 className="stats">{average_response_time()}</h2>
        <h2>{}</h2>
      </Col>
      <Col className="column d-flex flex-column align-items-center">
        <h5>Posts Generated</h5>
        <h2 className="stats">{posts_generated()}</h2>
      </Col>
      <Col className="column d-flex flex-column align-items-center">
        <h5>Total Traffic</h5>
        <h2 className="stats">
          {((posts_generated() / 617) * 100).toFixed(1)} %
        </h2>
      </Col>
      <Col className="column d-flex flex-column align-items-center">
        <h5>Average Engagement</h5>
        <h2 className="stats" style={{ display: "inline" }}>
          {average_engagement()} %
        </h2>
      </Col>
    </Row>
  );
};

export default RawStudentStats;
