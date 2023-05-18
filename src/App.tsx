import { useState, useEffect } from "react";
import logo from "./assets/Filigree_Logo.png";
import title from "./assets/Filigree_Text.png";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Grid from "./components/Grid";
import OverlayHub from "./components/OverlayHub";
import CourseButton from "./components/CourseButton";
import { ThemeProvider } from "styled-components";
import Card from "./components/Card";
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css'

const theme = {
  colors: {
    blue: "#0070f3",
    white: "#ffffff",
    light_grey: "#F8FAFB",
    purple: "#9925BE"
  },
};

const FullScreenDiv = styled.div`
  margin: 0;
  height: 120vh;
  background-color: ${({ theme }) => theme.colors.light_grey};
`;

var courseObjects = [
  {
    imageSrc: "src/assets/course_img.png",
    tooltipText: "CS-320",
    onClick: () => {
      console.log("320!");
    },
  },
  {
    imageSrc: "src/assets/course_img2.png",
    tooltipText: "CS-383",
    onClick: () => {
      console.log("383!");
    },
  },
  {
    imageSrc: "src/assets/course_img3.png",
    tooltipText: "CS-240",
    onClick: () => {
      console.log("240!");
    },
  },
];

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function App() {
  const [currentUser, setCurrentUser] = useState<boolean | undefined>();
  const [registrationToggle, setRegistrationToggle] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    client.get("/user")
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn")!.innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn")!.innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    client.post(
      "/register",
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function (res) {
      client.post(
        "/login",
        {
          email: email,
          password: password
        }
      ).then(function (res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    client.post(
      "/login",
      {
        email: email,
        password: password
      }
    ).then(function (res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    client.post(
      "/logout",
      { withCredentials: true }
    ).then(function (res) {
      setCurrentUser(false);
    });
  }
  
  if (currentUser) {
    return (
      <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<FullScreenDiv><OverlayHub submitLogout={submitLogout} courses={courseObjects} /></FullScreenDiv>} />
        </Routes>
      </Router>
    </ThemeProvider>
    );
  }

  return (
    <div>
      {registrationToggle ? (
        <div className="center">
          <Form onSubmit={submitRegistration}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
      ) : (
        <div className="center">
          <div className="login-container">
            <div className="logo-container">
              <img alt="" src={logo} width="auto" height="80" className="logo"/>
            </div>
            <div className="logo-container">
              <img alt="" src={title} width="auto" height="30" className="title"/>
            </div>
            <div className="card">
            <div className="card-body">
            <h2 className="login-title">Login</h2>
            <Form onSubmit={submitLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Log in
              </Button>
            </Form>
          </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default App;