
import AuthorTable from "./AuthorTable";
import React, { FC, useState, useEffect } from 'react';

interface CourseProps {
  course: string;
  activeCourse: string;
  activeMode: string;
}

/*
function Overlay<CourseProps>({course}) {
    return <h1>{course}</h1>;
}
*/

const Overlay: FC<CourseProps> = ({ course, activeCourse, activeMode }) => {
  const [currMode, setCurrMode] = useState('');

  useEffect(() => {
    setCurrMode(activeMode);
  }, [activeMode]);


  return course == activeCourse ? (
    <>
      <div  style={{ flex: 1 }}></div>
      <h1 className={course}>{course + currMode}</h1>
      <AuthorTable />
    </>
  ) : (
    <></>
  )
};

export default Overlay;
