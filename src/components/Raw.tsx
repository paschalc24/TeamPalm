import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

//This component is displayed at the top of the "HOME" page on the application,
//showing raw statistics

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
// Defining Data Structure
interface IData3 {
  slug: string;
  posts: Array<number>;
  firstName: string;
  lastName: string;
  moderator: boolean;
}

const Raw = () => {
  const w = 2;

  const [data1, setData1] = useState<IData[]>([]);
  const [data2, setData2] = useState<IData[]>([]);
  const [data3, setData3] = useState<IData3[]>([]);

  // method to calculate the total number of posts generated
  //params: none
  //output: integer number
  const posts_generated = () => {
    let c = 0;
    for (let i = 0; i < data3.length; i++) {
      c = c + data3[i].posts.length;
    }
    return c;
  };

  //method to calculuate the number of students that have ever posted or commented
  //params: none
  //output: integer number
  const active_students = () => {
    let s = new Set<string>();
    for (let i = 0; i < data3.length; i++) {
      s.add(data2[i].author);
    }
    return s.size;
  };

  //method to calculate the number of staff that have ever posted or commented
  //params: none
  //output: integer number
  const active_staff = () => {
    let c = 0;
    for (let i = 0; i < data3.length; i++) {
      if (data3[i].moderator) {
        c++;
      }
    }
    return c;
  };

  //method to calculate the average difference between post times and response times among all posts
  //params: non
  //output: string
  const average_response_time = () => {
    let diff = 0;
    for (let i = 0; i < data2.length; i++) {
      if (data2[i].modAnsweredAt == null || data2[i].publishedAt == null) {
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

    let str = `${days} Days\n ${remainingHours} Hours\n ${remainingMinutes} Mins \n ${remainingSeconds} Secs`;
    return days + " Days";
  };

  useEffect(() => {
    //Axios calls
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
    fetchData2("http://127.0.0.1:8000/posts/");
    fetchData3("http://127.0.0.1:8000/authors/");
  }, []);

  // Return: React table component using Col and Row classes
  return (
    <Row className="justify-content-center raw-stats">
      <Col className="column d-flex flex-column align-items-center">
        <h5>Posts Generated</h5>
        <h2 className="stats">{posts_generated()}</h2>
      </Col>
      <Col className="column d-flex flex-column align-items-center">
        <h5>Unanswered Posts</h5>
        <h2 className="stats">{data1.length}</h2>
      </Col>
      <Col className="column d-flex flex-column align-items-center">
        <h5>Avg Response Time</h5>
        <h2 className="stats">{average_response_time()}</h2>
      </Col>
      <Col className="column d-flex flex-column align-items-center">
        <h5>Active Students</h5>
        <h2 className="stats">{active_students()}</h2>
      </Col>
      <Col className="column d-flex flex-column align-items-center">
        <h5>Active Staff</h5>
        <h2 className="stats">{active_staff()}</h2>
      </Col>
    </Row>
  );
};

export default Raw;
