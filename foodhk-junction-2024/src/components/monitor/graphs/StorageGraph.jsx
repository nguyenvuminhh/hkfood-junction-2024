import { ChartsReferenceLine } from '@mui/x-charts';
import { LineChart } from '@mui/x-charts/LineChart';

const StorageGraph = (props) => {
  if (!props.deviations){
    return null
  }
  const data = props.deviations.slice(-10);
  return (
    <div className="bg-white rounded-md border border-gray-300 mr-2">
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
        series={[
          {
            curve: "linear",
            data: data,
          },
        ]}
        width={500}
        height={200}
      >
        <ChartsReferenceLine y={0} lineStyle={{ stroke: 'red' }} />
      </LineChart>
    </div>
  );
}

export default StorageGraph;

// import { ChartsReferenceLine } from '@mui/x-charts';
// import { LineChart } from '@mui/x-charts/LineChart';

// const StorageGraph = (props) => {
//   const data = props.deviations;
//   return (
//     <div className = "bg-white rounded-md border border-gray-300 mr-2 w-3/4">
//       <LineChart
//         xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
//         series={[
//           {
//             curve:"linear", data: data, min:0,
//           },
//         ]}
//         width={500}
//         height={200}
//       />
//     </div>
//     );
// }

// export default StorageGraph;