import React, {Component, useEffect, useState} from 'react';
import { ResponsiveBar } from '@nivo/bar';

class Bar extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    this.getData();
    this.interval = setInterval(() => {this.getData()}, 100000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  getData() {
    fetch("https://app3.devops.cchs.local/data.json")
    .then(res => res.json())
    .then(
      (data) => {
        this.setState({data});
      },
      (error) => {
        console.error(error);
      }
    )
  }
  render() {
    const data = this.state.data;
    const colors = {
                      'INTERACTING': '#00ff80',
                      'COMMUNICATING': '#13ec80',
                      'ON_QUEUE': '#80ffbf',
                      'AVAILABLE': '#ccffe6',
                      'IDLE': '#ffcccc',
                      'NOT_RESPONDING': '#ffcccc',
                      'OFF_QUEUE': '#ff9999',
                      'AWAY': '#ffcccc',
                      'OFFLINE': '#ff1414',
                      'BREAK': "#ffffb3",
                      'MEETING': "#ffff4d",
                      'MEAL': "#ffff80",
                      'TRAINING': "#ffffcc",
                      'BUSY': "#ffe6e6"
                    }
    const theme = {
      fontSize: 12,
      fontWeight: 900
    };
    const getColor = bar => colors[bar.id]
      return (
        <div className="bar">
          <ResponsiveBar
              data={data}
              // colors={{ scheme: 'nivo' }}
              colors={getColor}
              keys={[ 'INTERACTING', 'COMMUNICATING', 'ON_QUEUE', 'AVAILABLE', 'MEETING', 'MEAL', 'TRAINING', 'BREAK', 'BUSY', 'NOT_RESPONDING', 'IDLE', 'AWAY', 'OFF_QUEUE' ]}
              indexBy="Agent"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              maxValue={10}
              valueScale={{  type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Agent',
                  legendPosition: 'middle',
                  legendOffset: 32
              }}
              axisLeft={{
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Hours',
                  legendPosition: 'middle',
                  legendOffset: -40
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [ [ 'darker', '2' ] ] }}
              legends={[
                  {
                      dataFrom: 'keys',
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 20,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: 'right-to-left',
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [
                          {
                              on: 'hover',
                              style: {
                                  itemOpacity: 1
                              }
                          }
                      ]
                  }
              ]}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              theme={theme}
              defs={[
                  {
                      id: 'dots',
                      type: 'patternDots',
                      background: 'inherit',
                      color: '#0ef07e',
                      size: 4,
                      padding: 1,
                      stagger: true
                  },
                  {
                      id: 'lines',
                      type: 'patternLines',
                      background: 'inherit',
                      color: '#f0bdbd',
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10
                  }
              ]}
              fill={[
                  {
                      match: {
                          id: 'INTERACTING'
                      },
                      id: 'dots'
                  },
                  {
                      match: {
                          id: 'IDLE'
                      },
                      id: 'lines'
                  }
              ]}
          />
        </div>
      )
  }
}
export default Bar
