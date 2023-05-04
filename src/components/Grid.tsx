import React, { ReactNode } from "react";
import Card from "./Card";
import List from "./List";
import Raw from "./Raw";

interface Props {
  data: ReactNode;
  header: string;
}

const Grid = () => {
  let heading = "Example";
  return (
    <div className="row g-4 mt-4">
      {/* <div className="row" style={{height: "500px", overflowY: 'auto'}}>*/}
      <div>
        <Raw />
      </div>
      <div className="row" style={{ paddingTop: "20px", height: "500px", overflowY: "auto" }}>
        <List />
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
