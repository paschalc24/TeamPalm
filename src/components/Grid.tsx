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
      <div>
        <Card>
          <Raw />
        </Card>
      </div>
      <div
        className="col"
        style={{ paddingTop: "20px", height: "auto", overflowY: "auto", paddingBottom: "30px" }}
      >
        <div className="col" style={{ width: "auto", paddingBottom: "30px"}}>
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
        className="col-5 d-flex justify-content-end"
        style={{ paddingTop: "20px", height: "100%", overflowY: "auto" }}
      >
        <Card width="100%">
          <List />
        </Card>
      </div>
    </div>
  );
};

export default Grid;
