
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeriesCanvas } from 'react-vis';
import { Typography } from "antd";
const { Title } = Typography;

export default function BoulderChart({ boulders }) {

  let boulderCountPerGrade = {
    "3": 0,
    "3+": 0,
    "4": 0,
    "4+": 0,
    "5": 0,
    "5+": 0,
    "6A": 0,
    "6A+": 0,
    "6B": 0,
    "6B+": 0,
    "6C": 0,
    "6C+": 0,
    "7A": 0,
    "7A+": 0,
    "7B": 0,
    "7B+": 0,
    "7C": 0,
    "7C+": 0,
    "8A": 0,
    "8A+": 0,
    "8B": 0,
    "8B+": 0,
    "8C": 0,
    "8C+": 0,
  }

  boulderCountPerGrade = boulders.reduce((counter, boulder) => {
    counter[boulder.grade.title]++;
    return counter;
  }, boulderCountPerGrade)

  let data = Object.keys(boulderCountPerGrade).sort().reduce((data, grade) => {
    let countX = boulderCountPerGrade[grade];
    data.push({"x": grade, "y": countX})
    console.log(grade, countX)
    return data;
  }, [])

  return(
    <div className="chart-wrapper">
      <Title level={4}>Fordeling av grader</Title>
      <XYPlot width={900} height={200} xType="ordinal">
        <HorizontalGridLines />
        <VerticalBarSeriesCanvas
          color="#1890ff"
          data={data}
        />
        <YAxis />
        <XAxis />
      </XYPlot>
      <style jsx>{`
        .chart-wrapper {
          overflow-x: auto;
          overflow-y: hidden;
          margin-top: 1em;
        }
      `}</style>
  </div>
  )
}