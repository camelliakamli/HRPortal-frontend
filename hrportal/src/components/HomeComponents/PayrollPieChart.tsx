import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PayrollPieChartProps {
  data: {
    paid: number;
    unpaid: number;
  };
}

const PayrollPieChart: React.FC<PayrollPieChartProps> = ({ data }) => {
  const totalEmployees = data.paid + data.unpaid;

  const chartData = {
    labels: ["Paid", "Unpaid"],
    datasets: [
      {
        data: [data.paid, data.unpaid],
        backgroundColor: ["#FADA68", "#A07CE9"],
        hoverBackgroundColor: ["#FADA68", "#A07CE9"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%", // Creates a doughnut effect
    plugins: {
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (tooltipItem: any) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div
      className="bg-white rounded-lg p-4 w-full max-w-md mx-auto"
      style={{
        boxShadow: "none", 
        border: "1px solid #F0F0F0", 
      }}
    >
      <h2 className="text-lg font-semibold mb-4 text-center">
        Payroll Distribution
      </h2>
      {/* Circle chart */}
      <div className="relative w-full h-48 md:h-56">
        <Pie data={chartData} options={options} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-2xl font-semibold">{totalEmployees}</span>
          <p className="text-sm text-gray-600">Total Employees</p>
        </div>
      </div>
      {/* Legend below chart */}
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        {chartData.labels.map((label, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: chartData.datasets[0].backgroundColor[index],
              }}
            ></span>
            <span>
              {label}: {chartData.datasets[0].data[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayrollPieChart;
