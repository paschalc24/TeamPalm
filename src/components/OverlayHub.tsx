import React, { FC } from 'react';
import { useState } from "react";
import SideBar from "./SideBar"
import Overlay from "./Overlay"
import NavBar from "./NavBar"


interface OverlayHubProps {
    courses: {
      imageSrc: string;
      tooltipText: string;
      onClick: () => void;
    }[];
  }
  
  const OverlayHub: FC<OverlayHubProps> = ({ courses }) => {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedMode, setSelectedMode] = useState("home");
    //const [selectedMode, setSelectedMode] = useState("");


    const modeHandler = (newMode: string) => {
        setSelectedMode(newMode);
    }

    return (
        <div>
            {selectedCourse != "" ?
                (courses.map((course, index) => (
                    <NavBar key={index} course={course.tooltipText} activeCourse={selectedCourse} activeMode={"home"} setSelectedMode={setSelectedMode}/>
                )))
                :
                <NavBar course={""} activeCourse={""} activeMode={""} setSelectedMode={setSelectedMode}/>
            }
            
            <div style={{ display: 'flex' }}>
                <div style={{ width: '250px' }}>
                    <SideBar courses={courses} username="Matthew Rattigan"
                    selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} setSelectedMode={modeHandler}/>
                </div>
                <div style={{flex:1}}>
                    {courses.map((course, index) => (
                        <Overlay key={index} course={course.tooltipText} activeCourse={selectedCourse} activeMode={selectedMode}/>
                    ))}
                </div>
            </div>
        </div>
        
    );
  };
  
  export default OverlayHub;