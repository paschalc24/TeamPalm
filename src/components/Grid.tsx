import React, { ReactNode } from "react";
import Card from "./Card";
import List from "./List";
import Raw from "./Raw";
import TrafficGraph from "./TrafficGraph";

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
        <Card>
          <Raw />
        </Card>
      </div>
      <div
        className="col"
        style={{ paddingTop: "20px", height: "500px", overflowY: "auto" }}
      >
        <div className="col" style={{ width: "auto" }}>
          <Card>
            <TrafficGraph
              urlParam="http://127.0.0.1:8000/forumtraffic/"
              dataDescriptor="Posts"
            />
          </Card>
        </div>
        <div className="col">
          <Card>
            <TrafficGraph
              urlParam="http://127.0.0.1:8000/viewstraffic/"
              dataDescriptor="Views"
            />
          </Card>
        </div>
      </div>
      <div
        className="col d-flex justify-content-end"
        style={{ paddingTop: "20px", height: "100%", overflowY: "auto" }}
      >
        <Card width="75%">
          <List />
        </Card>
      </div>
    </div>
  );
};

export default Grid;
