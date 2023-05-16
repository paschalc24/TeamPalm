import React, { FC, useState, useEffect } from 'react';
import axios from "axios";
import Plotly from 'plotly.js';
import Plot from 'react-plotly.js';

interface Props {
  urlParam: string;
  dataDescriptor: string;
}

interface Data {
  per_day: any;
  per_week: any;
  per_hour: any;
}

function truncate(array: any, cutoff: number) {
  if (cutoff >= array.length) {
    return array;
  }
  
  return array.slice(array.length - cutoff);
}

const TrafficGraph: React.FC<Props> = ({urlParam, dataDescriptor}) => {
  const [data, setData] = useState<Data | null>(null); //data fetched from server
  const [graphData, setGraphData] = useState<any[]>([]); //data processed to put in graph
  const [timePeriod, setTimePeriod] = useState<string>("per_day"); // current time period

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Data>(`${urlParam}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [urlParam]);

  useEffect(() => {
    if (data) {
      const parsed = JSON.parse(JSON.stringify(data));
      const graph = [
        {
          x: truncate(parsed[timePeriod]["0"], 30),
          y: truncate(parsed[timePeriod]["1"], 30),
          type: 'bar',
        }
      ];
      setGraphData(graph);
    }
  }, [data, timePeriod]);

  let graphLayout;

  let timeUnitName = new Map([
    ["per_hour", "Hour"],
    ["per_day", "Day"],
    ["per_week", "Week"]
  ]);

  if (data) {
    graphLayout = {
      title: {
        text: `${dataDescriptor} by ${timeUnitName.get(timePeriod)}`,
        font: {
          family: 'Arial',
          size: 24,
          color: '#333333'
        }
      },
      xaxis: {
        title: {
          text: timeUnitName.get(timePeriod),
          font: {
            family: 'Arial',
            size: 16,
            color: '#333333'
          }
        },
        gridcolor: '#FFFFFF',
        showgrid: false,
        tickfont: {
          family: 'Arial',
          size: 14,
          color: '#333333'
        }
      },
      yaxis: {
        title: {
          text: '# of Posts',
          font: {
            family: 'Arial',
            size: 16,
            color: '#333333'
          }
        },
        gridcolor: '#FFFFFF',
        showgrid: false,
        tickfont: {
          family: 'Arial',
          size: 14,
          color: '#333333'
        }
      },
      plot_bgcolor: '#F5F5F5',
      paper_bgcolor: '#F5F5F5',
      margin: {
        l: 50,
        r: 50,
        t: 50,
        b: 50
      }
    };    
  }

  const handleTimePeriodChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTimePeriod(event.currentTarget.value);
  }

  return (
    <div>
      {data && graphData && graphLayout && (
        <div>
          <div>
            <button onClick={handleTimePeriodChange} value="per_day">Day</button>
            <button onClick={handleTimePeriodChange} value="per_week">Week</button>
            <button onClick={handleTimePeriodChange} value="per_hour">Hour</button>
          </div>
          <Plot
            data={graphData}
            layout={graphLayout}
          />
        </div>
      )}
    </div>
  );
};

export default TrafficGraph;

//<TrafficGraph urlParam="http://127.0.0.1:8000/forumtraffic/" dataDescriptor="Posts"/>
//<TrafficGraph urlParam="http://127.0.0.1:8000/viewstraffic/" dataDescriptor="Views"/>

/**
<div className="row" style={{ paddingTop: "20px", height: "500px"}}>
        <div className="col">
        <Card>
        <TrafficGraph urlParam="http://127.0.0.1:8000/forumtraffic/" dataDescriptor="Posts"/>
        </Card>
        </div>
        <div className="col">
        <Card>
        <TrafficGraph urlParam="http://127.0.0.1:8000/viewstraffic/" dataDescriptor="Views"/>
        </Card>
        </div>
      </div>
 */