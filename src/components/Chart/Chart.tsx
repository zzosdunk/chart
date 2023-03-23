import { CartData } from "../Types/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  cartToShow?: CartData;
}

const Chart = ({ cartToShow }: ChartProps) => {
  const labels = cartToShow?.products.map((product) => product.title);

  const chartName = cartToShow
    ? `Cart chart data with total amount of ${cartToShow?.total}`
    : "Choose some cart to see it's data";

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        color: "#d5f134",
        labels: {
          font: {
            size: 15, // set the font size
            color: "white", // set the font color
          },
        },
      },
      title: {
        display: false,
        text: chartName,
        color: "#d5f134",
        fontSize: 50,
      },
    },
    scales: {
      y: {
        grid: {
          color: "#ffffff",
        },
        ticks: {
          color: "#ffffff",
        },
      },
      x: {
        grid: {
          color: "#ffffff",
        },
        ticks: {
          color: "#ffffff ",
        },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Price",
        data: cartToShow?.products.map((product) => product.price),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        color: "#ffffff",
      },
      {
        label: "Disounted price",
        data: cartToShow?.products.map(
          (product) =>
            product.price - product.price * (product.discountPercentage / 100)
        ),
        borderColor: "#d5f134",
        backgroundColor: "#66f134",
        color: "#ffffff",
      },
    ],
  };

  return (
    <>
      <div className="header-content">
        <h1 className="gradient__text">{chartName}</h1>
      </div>
      <Line options={options} data={chartData} />
    </>
  );
};

export default Chart;
