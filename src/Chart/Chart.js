import React, { PureComponent } from "react";
import { curveCardinal } from "d3-shape";
import "./Chart.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const cardinal = curveCardinal.tension(0.2);
export default class Example extends PureComponent {
  constructor(props) {
    super(props);
  }

  static demoUrl = "https://codesandbox.io/s/simple-area-chart-4ujxw";

  render() {
    const sortedData = this.props.data.sort((a, b) => a.date - b.date);

    const result = sortedData.reduce((acc, curr) => {
      const existingItem = acc.find((item) => item.date === curr.date);
      if (existingItem) {
        existingItem.name.push(curr.name);
      } else {
        acc.push({ date: curr.date, name: [curr.name] });
      }
      return acc;
    }, []);

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            <p className="yearr">{payload[1].payload.date}</p>
            {payload[1].payload.name.map((m) => (
              <p>{m}</p>
            ))}
          </div>
        );
      }
      return null;
    };

    const finalData = result.map((item) => {
      return {
        ...item,
        listName: item.name.toString(),
        length: item.name.length,
      };
    });

    return (
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={finalData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="30%" stopColor="#a8a4d5" stopOpacity={0.8} />
                <stop offset="85%" stopColor="#7fdaa9" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area
              className="lengthClass"
              type="monotone"
              dataKey="length"
              stroke="url(#colorUv)"
              fill="url(#colorUv)"
            />
            <Area
              className="lengthClass"
              type="monotone"
              dataKey="listName"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
