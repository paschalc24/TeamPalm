// Importing necessary React and Material UI components
import React, { FC, useEffect } from "react";
import logo from "../assets/Filigree_Logo_With_Name.png";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "../fonts.css";

// Importing Bootstrap components for the navigation bar
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Importing styled-components to style our components
import styled from "styled-components";

// Importing App component
import App from "../App"

// Defining the properties that NavBar component will receive
interface NavBarProps {
  submitLogout: (e: React.FormEvent<HTMLFormElement>) => void
  course: string;
  activeCourse: string;
  activeMode: string;
  setSelectedMode: (newMode: string) => void;
}

// Styled-components for the Navbar
const GoodMorningDiv = styled.div`
  font-family: "Roboto Flex";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 38px;
  /* identical to box height */
  letter-spacing: 0.01em;
  padding-left: 30px;
  color: #000000;
`;

const VerticalLine = styled.div`
  width: 40px;
  height: 0px;
  left: 721px;
  top: 36px;
  border: 2px solid #d9def1;
  transform: rotate(90deg);
`;

const CourseNameDiv = styled.div`
  width: 145px;
  height: 60px;
  left: 747px;
  top: 35px;

  font-family: "Open Sans";
  font-weight: 700;
  font-size: 44px;
  color: ${({ theme }) => theme.colors.purple};
  line-height: 60px;
  /* identical to box height */

  letter-spacing: 0.01em;
`;

// Definition of the NavBar component
const NavBar: FC<NavBarProps> = ({
  submitLogout,
  course,
  activeCourse,
  activeMode,
  setSelectedMode,
}) => {
  const [alignment, setAlignment] = React.useState("home"); //Last change on default mode alignment
  const [noneSelected, setNoneSelected] = React.useState(true);

  // This effect will reset the alignment to 'home' every time the component re-renders
  useEffect(() => {
    // Reset alignment to 'left' every time the component re-renders
    setAlignment('home');
  }, []);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    // If newAlignment is null, ignore the update
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setSelectedMode(newAlignment);
    }
  };
  
  // If course equals activeCourse, render the NavBar
  return course == activeCourse ? (
    <>
      <Navbar expand="lg">
        <Navbar.Brand style={{paddingLeft: '1%'}} href="#home">
          <img
            alt=""
            src={logo}
            width="auto"
            height="70"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <GoodMorningDiv>Good Morning Matthew!</GoodMorningDiv>

        <VerticalLine />
        <CourseNameDiv>{course}</CourseNameDiv>

        {activeCourse != "" ? (
          <>
            <ToggleButtonGroup
              color="secondary"
              value={alignment}
              exclusive={true}
              onChange={handleChange}
              aria-label="Platform"
              style={{ "paddingLeft": "50px", "paddingRight": "190px" }}
            >
              <ToggleButton value="home">Home</ToggleButton>
              <ToggleButton value="students">Students</ToggleButton>
              <ToggleButton value="staff">Staff</ToggleButton>
            </ToggleButtonGroup>
          </>
        ) : (
          <></>
        )}
        <Navbar.Collapse className="justify-content-right">
          <Form onSubmit={e => submitLogout(e)} style={{ marginLeft: 'auto' }}>
            <Button style={{ height: '47px', marginRight: '0px' }} variant='outlined' color='error' type="submit">Log Out</Button>
          </Form>
        </Navbar.Collapse>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" />
        </Navbar.Collapse>
      </Navbar>
    </>
  ) : (
    <></>
  );
};

// Exporting the NavBar component
export default NavBar;
