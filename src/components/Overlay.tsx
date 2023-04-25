import React, { FC } from 'react';

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
        <h1 className={course}>{course}</h1>
      </>
      :
      <></>
    ))
  };

export default Overlay;