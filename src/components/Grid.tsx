import React, { ReactNode } from "react";
import Card from "./Card";
import Placeholder2 from "./Placeholder2";

interface Props {
  data: ReactNode;
  header: string;
}

const Grid = () => {
  let heading = "Example";
  return (
    <div className="row g-4 mt-4">
      <div className="col" style={{ height: "100vh", flexDirection: "column" }}>
        <Placeholder2></Placeholder2>
      </div>
      <div className="col">
        <Card heading={heading} />
      </div>
      <div className="col">
        <Card heading={heading} />
      </div>
      <div className="col">
        <Card heading={heading} />
      </div>
    </div>
  );
};

export default Grid;
