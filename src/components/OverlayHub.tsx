import React, { FC } from 'react';
import { useState } from "react";
import SideBar from "./SideBar"
import Overlay from "./Overlay"
import NavBar from "./NavBar"


interface OverlayHubProps {
    submitLogout: (e: React.FormEvent<HTMLFormElement>) => void
    courses: {
      imageSrc: string;
      tooltipText: string;
      onClick: () => void;
    }[];
  }
  
  const OverlayHub: FC<OverlayHubProps> = ({ courses, submitLogout }) => {
    const [selectedCourse, setSelectedCourse] = useState("CS-320");
    const [selectedMode, setSelectedMode] = useState("home");
    //const [selectedMode, setSelectedMode] = useState("");


    const modeHandler = (newMode: string) => {
        setSelectedMode(newMode);
    }

    return (
        <div>
            {selectedCourse != "" ?
                (courses.map((course, index) => (
                    <NavBar submitLogout={submitLogout} key={index} course={course.tooltipText} activeCourse={selectedCourse} activeMode={"home"} setSelectedMode={setSelectedMode}/>
                )))
                :
                <NavBar submitLogout={submitLogout} course={""} activeCourse={""} activeMode={""} setSelectedMode={setSelectedMode}/>
            }
            
            <div style={{ display: 'flex' }}>
                <div style={{ width: '180px' }}>
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