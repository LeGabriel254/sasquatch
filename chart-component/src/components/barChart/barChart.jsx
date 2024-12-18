// BarChart.js
import React, { useState, useEffect } from 'react';
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

import { fetchData } from '../data/data.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //  async function to fetch data
    async function loadChartData() {
      try {
        const result = await fetchData();

        const chartData = {
          labels: result.labels,
          datasets: [
            {
              label: 'Weekly Sales',
              data: result.data,
              backgroundColor: '#ec775f',
              borderColor: '#ec775f',
              borderWidth: 1,
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadChartData();
  }, []);

  // calculation (replace these with real values as needed)
  const totalThisMonth = 478.33;
  const percentageChange = 2.4;

  if (loading) {
    return <div className="text-amber-300">Loading...</div>;
  }

  return (
    <div className="fixed bg-primary w-[38%] h-auto ml-96 mt-5 rounded-2xl spn">
      <div className="flex flex-row ml-10 mt-5 text-black text-xl font-bold top-4">
        Spending - Last 7 days
      </div>
      <div className="flex justify-center items-center cursor-pointer">
        {chartData ? (
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        ) : (
          <p>No data available</p>
        )}
      </div>

      {/* Bottom section for "Total this month" */}
      <div className="mt-5 p-4 bg-[#F8F4EF] rounded-lg text-center mb-3">

        <div className="text-gray-500 text-sm flex">Total this month</div>

        <div className="text-3xl font-bold text-black flex">${totalThisMonth.toFixed(2)}</div>

        <div className="flex items-center justify-center text-sm mt-1 ml-72">

          <div className="text-green-600 font-semibold ml-10 -mt-11">
            {percentageChange > 0 ? `+${percentageChange}%` : `${percentageChange}%`}
            <br /><span className="text-gray-500 ml-1 mt-9">from last month</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BarChart;
