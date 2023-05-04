import React, { FC } from "react";
import AuthorTable from "./AuthorTable";
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
  return course == activeCourse ? (
    <>
      <div style={{ flex: 1 }}></div>
      <h1 className={course}>{course}</h1>
      <AuthorTable />
    </>
  ) : (
    <></>
  );
};

export default Overlay;
