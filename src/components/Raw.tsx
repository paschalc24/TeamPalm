import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

interface IData {
  // Define the structure of your data
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
interface IData3 {
  // Define the structure of your data
  slug: string;
  posts: Array<number>;
  firstName: string;
  lastName: string;
  moderator: boolean;
}

const Raw = () => {
  const [data1, setData1] = useState<IData[]>([]);
  const [data2, setData2] = useState<IData[]>([]);
  const [data3, setData3] = useState<IData3[]>([]);

  const active_students = () => {
    let c = 0;
    for (let i = 0; i < data3.length; i++) {
      if (!data3[i].moderator) {
        c++;
      }
    }
    return c;
  };

  const active_staff = () => {
    let c = 0;
    for (let i = 0; i < data3.length; i++) {
      if (data3[i].moderator) {
        c++;
      }
    }
    return c;
  };

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

    let str = `${days} days\n ${remainingHours} hours\n ${remainingMinutes} minutes\n ${remainingSeconds} seconds`;
    return days + " days";
  };

  useEffect(() => {
    const fetchData1 = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/unansweredposts/"
      );
      setData1(response.data);
    };

    const fetchData2 = async () => {
      const response = await axios.get("http://127.0.0.1:8000/posts/");
      setData2(response.data);
    };

    const fetchData3 = async () => {
      const response = await axios.get("http://127.0.0.1:8000/authors/");
      setData3(response.data);
    };

    fetchData1();
    fetchData2();
    fetchData3();
  }, []);

  return (
    <Row>
      <Col xs={3}>
        <h5>Unanswered Posts</h5>
        <h2>{data1.length}</h2>
      </Col>
      <Col xs={3}>
        <h5>Average Response Time</h5>
        <h2>{average_response_time()}</h2>
      </Col>
      <Col xs={3}>
        <h5>Active Students</h5>
        <h2>{active_students()}</h2>
      </Col>
      <Col xs={3}>
        <h5>Active Staff</h5>
        <h2>{active_staff()}</h2>
      </Col>
    </Row>
  );
};

export default Raw;
