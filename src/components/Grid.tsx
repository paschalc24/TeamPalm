import React, { ReactNode } from "react";
import Card from "./Card";

interface Props {
  data: ReactNode;
  header: string;
}

const Grid = () => {
  let heading = "Example";
  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      <div className="col">
        <Card heading={heading} data="" />
      </div>
      <div className="col">
        <Card heading={heading} data="" />
      </div>
      <div className="col">
        <Card heading={heading} data="" />
      </div>
      <div className="col">
        <Card heading={heading} data="" />
      </div>
    </div>
  );
};

export default Grid;
