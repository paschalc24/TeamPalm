import React, { FC } from "react";
import Placeholder2 from "./Placeholder2";
import Card from "./Card";

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
      <Card>
        <Placeholder2 />
      </Card>
    </>
  ) : (
    <></>
  );
};

export default Overlay;
