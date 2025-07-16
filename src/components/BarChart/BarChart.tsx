import { useProductContext } from "../../context/productContext";

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function BarChart() {

  const { products } = useProductContext();
     
    const data = {
    labels: products.map((prod) => prod.title),
    datasets: [
      {
        label: 'Stock',
        data: products.map(p => p.stock),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,     
      },
    ],
  };

    const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top'  as const },
      title: { display: true, text: 'Stock por producto' },
    },
  };

  return (
  <div style={{ height: '400px', width: '100%' }}>
    <Bar data={data} options={options} />
  </div>
  );
}

export default BarChart;