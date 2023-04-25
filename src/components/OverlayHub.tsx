import React, { FC } from 'react';
import { useState } from "react";
import SideBar from "./SideBar"
import Overlay from "./Overlay"


interface OverlayHubProps {
    courses: { 
      imageSrc: string;
      tooltipText: string;
      onClick: () => void;
    }[];
  }
  
  const OverlayHub: FC<OverlayHubProps> = ({ courses }) => {
    const [selectedCourse, setSelectedCourse] = useState("");
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '250px' }}>
                <SideBar courses={courses} username="Matthew Rattigan"
                selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
            </div>
            <div style={{flex:1}}>
                {courses.map((course, index) => (
                    <Overlay key={index} course={course.tooltipText} activeCourse={selectedCourse}/>
                ))}
            </div>
        </div>
    );
  };
  
  export default OverlayHub;