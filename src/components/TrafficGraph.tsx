import React, { FC, useState, useEffect } from 'react';
import axios from "axios";
import Plotly from 'plotly.js';
import Plot from 'react-plotly.js';
import Spinner from 'react-bootstrap/Spinner';
import "../fonts.css";


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
          x: parsed[timePeriod]["0"], //truncate(parsed[timePeriod]["0"], 30),
          y: parsed[timePeriod]["1"],
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
          family: 'Roboto Flex',
          size: 24,
          color: '#000000'
        }
      },
      xaxis: {
        title: {
          text: timeUnitName.get(timePeriod),
          font: {
            family: 'Roboto Flex',
            size: 16,
            color: '#000000'
          }
        },
        gridcolor: '#FFFFFF',
        showgrid: false,
        tickfont: {
          family: 'Roboto Flex',
          size: 14,
          color: '#000000'
        }
      },
      yaxis: {
        title: {
          text: '# of Posts',
          font: {
            family: 'Roboto Flex',
            size: 16,
            color: '#000000'
          }
        },
        gridcolor: '#FFFFFF',
        showgrid: false,
        tickfont: {
          family: 'Roboto Flex',
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
      ) : data && graphData && (
        <div>
          <div>
            <button onClick={handleTimePeriodChange} value="per_week" style={{
                margin: '0 5px',
                padding: '10px 20px',
                borderRadius: '20px',
                backgroundColor: '#your-color',
                color: '#your-color',
                fontFamily: 'Roboto Flex',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer'
              }}>Week</button>
            <button onClick={handleTimePeriodChange} value="per_day" style={{
                margin: '0 5px',
                padding: '10px 20px',
                borderRadius: '20px',
                backgroundColor: '#your-color',
                color: '#your-color',
                fontFamily: 'Roboto Flex',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer'
              }}>Day</button>
            <button onClick={handleTimePeriodChange} value="per_hour" style={{
                margin: '0 5px',
                padding: '10px 20px',
                borderRadius: '20px',
                backgroundColor: '#your-color',
                color: '#your-color',
                fontFamily: 'Roboto Flex',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer'
              }}>Hour</button>
          </div>
          <Plot
            data={[
              {
                x: graphData.length !== 0 ? graphData[0]['x'] : [],
                y: graphData.length !== 0 ? graphData[0]['y'] : [],
                type: 'scatter',
                mode: 'lines+markers',
                line: {
                  color: 'rgb(153, 37, 190)',
                  width: 2
                },
                marker: {
                  color: 'purple',
                  size: 6,
                  symbol: 'square',
                  line: {
                    color: 'reg(153, 37, 190)',
                    width: 1
                  }
                },
                fill: 'tozeroy',
                fillcolor: 'rgba(156, 39, 176, 0.08)'
              }
            ]}
            layout={{
              title: {
                text: `${dataDescriptor} by ${timeUnitName.get(timePeriod)}`,
                font: {
                  family: 'Roboto Flex',
                  size: 24,
                  color: '#000000'
                }
              },
              xaxis: {
                title: {
                  text: timeUnitName.get(timePeriod),
                  font: {
                    family: 'Roboto Flex',
                    size: 16,
                    color: '#000000'
                  }
                },
                gridcolor: '#FFFFFF',
                showgrid: false,
                tickfont: {
                  family: 'Roboto Flex',
                  size: 14,
                  color: '#000000'
                },
                range: [graphData.length > 0 ? graphData[0].x.slice(-30)[0] : null, graphData.length > 0 ? graphData[0].x.slice(-1)[0] : null]
              },
              yaxis: {
                title: {
                  text: '# of Views',
                  font: {
                    family: 'Roboto Flex',
                    size: 16,
                    color: '#000000'
                  }
                },
                gridcolor: '#FFFFFF',
                showgrid: false,
                tickfont: {
                  family: 'Roboto Flex',
                  size: 14,
                  color: '#000000'
                }
              },
              plot_bgcolor: '#FFFFFF',
              paper_bgcolor: '#FFFFFF',
              showlegend: false,
              hovermode: 'closest',
              transition: {
                duration: 500,
                easing: 'cubic-in-out'
              }
        
            }}    
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