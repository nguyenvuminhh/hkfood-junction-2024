import { LineChart } from '@mui/x-charts/LineChart';

const PreproductionGraph = () => {
    return (
      <div className = "bg-white rounded-md border border-gray-300 mr-2">
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={700}
          height={500}
        />
      </div>
      );
}

export default PreproductionGraph;