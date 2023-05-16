import React, { FC, useEffect, useState } from "react";
import Grid from "./Grid";
import Raw from "./Raw";
import List from "./List";
import AuthorTable from "./AuthorTable";
import Card from "./Card";

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
  const [currMode, setCurrMode] = useState("");

  useEffect(() => {
    setCurrMode(activeMode);
  }, [activeMode]);

  return course == activeCourse ? (
    <>
      <div style={{ flex: 1 }}></div>
      {/* <h1 className={course}>{course + currMode}</h1> */}

      {currMode == "home" ? (
        <>
          <Grid />
        </>
      ) : (
        <></>
      )}
      {currMode == "students" ? (
        <>
          <div style={{ paddingRight: "50px" }}>
            <Card>
              <AuthorTable isMod={false} />
            </Card>
          </div>
        </>
      ) : (
        <></>
      )}
      {currMode == "staff" ? (
        <>
          <div style={{ paddingRight: "50px" }}>
            <Card>
              <AuthorTable isMod={true} />
            </Card>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  ) : (
    <></>
  );
};

export default Overlay;
