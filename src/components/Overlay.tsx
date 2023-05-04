import React, { FC } from 'react';
import Grid from "./Grid"
import Raw from "./Raw"

interface CourseProps {
  course: string;
  activeCourse: string;
}

/*
function Overlay<CourseProps>({course}) {
    return <h1>{course}</h1>;
}
*/

const Overlay: FC<CourseProps> = ({ course, activeCourse }) => {
    return (
      (course == activeCourse ? 
      <>
        <div  style={{ flex: 8}}></div>
        <h1 className={course}>{course}</h1>
        {/* <Raw /> */}
        <Grid />
      </>
      :
      <></>
    ))
  };

export default Overlay;