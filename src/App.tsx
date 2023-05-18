import { useState } from "react";
import reactLogo from "./assets/react.svg";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Grid from "./components/Grid";
import OverlayHub from "./components/OverlayHub";
import CourseButton from "./components/CourseButton";
import { ThemeProvider } from "styled-components";
import Card from "./components/Card";
import styled from 'styled-components';


//import './App.css'
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

function App() {
  return (
    <ThemeProvider theme={theme} >
      <FullScreenDiv>
        <OverlayHub courses={courseObjects}/>
      </FullScreenDiv>
    </ThemeProvider>
  );
}

export default App;
