import React, { FC } from "react";
import logo from "../assets/Filigree_Logo_With_Name.png";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "../fonts.css";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

interface NavBarProps {
  course: string;
  activeCourse: string;
  activeMode: string;
  setSelectedMode: (newMode: string) => void;
}

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

const NavBar: FC<NavBarProps> = ({
  course,
  activeCourse,
  activeMode,
  setSelectedMode,
}) => {
  const [alignment, setAlignment] = React.useState("home");
  const [noneSelected, setNoneSelected] = React.useState(true);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    setSelectedMode(newAlignment);
  };

  return course == activeCourse ? (
    <>
      <Navbar expand="lg">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="auto"
            height="70"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <GoodMorningDiv>Good morning Matthew!</GoodMorningDiv>

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
              style={{ "padding-left": "50px", "padding-right": "50px" }}
            >
              <ToggleButton value="home">Home</ToggleButton>
              <ToggleButton value="students">Students</ToggleButton>
              <ToggleButton value="staff">Staff</ToggleButton>
            </ToggleButtonGroup>
          </>
        ) : (
          <></>
        )}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" />
        </Navbar.Collapse>
      </Navbar>
    </>
  ) : (
    <></>
  );
};

export default NavBar;
