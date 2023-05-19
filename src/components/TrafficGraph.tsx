import React, { FC, useState, useEffect } from 'react';
import axios from "axios";
import Plotly from 'plotly.js';
import Plot from 'react-plotly.js';
import Spinner from 'react-bootstrap/Spinner';


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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const cachedData = localStorage.getItem(`${urlParam}`);
  
        if (cachedData) {
          setData(JSON.parse(cachedData));
          setIsLoading(false);
        } else {
          const response = await axios.get<Data>(`${urlParam}`);
          setData(response.data);
          localStorage.setItem(`${urlParam}`, JSON.stringify(response.data));
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [urlParam]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem(`${urlParam}`);
        if (cachedData) {
          setData(JSON.parse(cachedData));
        } else {
          const response = await axios.get<Data>(`${urlParam}`);
          setData(response.data);
          localStorage.setItem(`${urlParam}`, JSON.stringify(response.data));
        }
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
          family: 'Roboto',
          size: 24,
          color: '#000000'
        }
      },
      xaxis: {
        title: {
          text: timeUnitName.get(timePeriod),
          font: {
            family: 'Roboto',
            size: 16,
            color: '#000000'
          }
        },
        gridcolor: '#FFFFFF',
        showgrid: false,
        tickfont: {
          family: 'Roboto',
          size: 14,
          color: '#000000'
        }
      },
      yaxis: {
        title: {
          text: '# of Posts',
          font: {
            family: 'Roboto',
            size: 16,
            color: '#000000'
          }
        },
        gridcolor: '#FFFFFF',
        showgrid: false,
        tickfont: {
          family: 'Roboto',
          size: 14,
          color: '#000000'
        }
      },
      plot_bgcolor: '#FFFFFF',
      paper_bgcolor: '#FFFFFF',
      autosize: true,
      showlegend: false,
      hovermode: 'closest',
      transition: {
        duration: 500,
        easing: 'cubic-in-out'
      }

    };    
  }

  const handleTimePeriodChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTimePeriod(event.currentTarget.value);
  }

  return (
    <div>
      {isLoading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '43.5vh' 
        }}>
          <Spinner animation="border" role="status">
          </Spinner>
        </div>
      ) : data && graphData && graphLayout && (
        <div>
          <div>
            <button onClick={handleTimePeriodChange} value="per_day">Day</button>
            <button onClick={handleTimePeriodChange} value="per_week">Week</button>
            <button onClick={handleTimePeriodChange} value="per_hour">Hour</button>
          </div>
          <Plot
            data={graphData}
            layout={graphLayout}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
}

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