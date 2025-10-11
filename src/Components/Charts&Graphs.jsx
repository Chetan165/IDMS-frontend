import React from "react";

const StatusCard = ({ label, count, color }) => {
  return (
    <div
      className={`bg-white p-4 rounded-xl shadow-md border-b-4 border-l-2 border-gray-200 
                        hover:shadow-lg transition duration-150 transform hover:-translate-y-0.5`}
    >
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className={`text-4xl font-extrabold text-blue-600`}>{count}</p>
    </div>
  );
};

const TrendChart = ({ title, description }) => {
  const mockChartData = {
    labels: ["September", "July", "August"],
    dataNewIdea: [4, 1, 3],
    dataRWH: [30000, 10000, 25000],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-96">
      <p className="text-lg font-medium text-gray-700 mb-4">{title}</p>
      <div className="text-sm text-gray-500 italic mb-4">{description}</div>
      <div className="relative h-64 flex items-end justify-between px-4">
        {/* Visual Simulation of the New Idea Bar Chart (left axis) */}
        {mockChartData.dataNewIdea.map((count, index) => (
          <div key={index} className="flex flex-col items-center group">
            <span className="text-xs text-blue-700 mb-1">{count}</span>
            <div
              className="w-8 bg-blue-500 rounded-t-md transition-all duration-500"
              style={{ height: `${count * 15}%` }} // Scaling the bar
            ></div>
            <span className="text-xs text-gray-600 mt-1">
              {mockChartData.labels[index]}
            </span>
          </div>
        ))}

        {/* Simulation of the RWH Line/Area Chart (right axis) - simplified */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center text-gray-400 pointer-events-none">
          (Simulated Chart Area)
        </div>
      </div>
    </div>
  );
};

const Chart = ({ HardSavingPercent, SoftSavingPercent }) => {
  return (
    <div className="flex space-x-8 mb-8 justify-start items-center">
      {/* Hard Savings Chart */}
      <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md w-48">
        <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold">
          {HardSavingPercent}%
        </div>
        <p className="mt-2 text-sm font-medium text-gray-700">Hard Savings</p>
        <p className="text-xs text-gray-500">Remaining</p>
      </div>

      {/*  Soft Savings Doughnut Chart*/}
      <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md w-48">
        <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold">
          {SoftSavingPercent}%
        </div>
        <p className="mt-2 text-sm font-medium text-gray-700">Soft Savings</p>
        <p className="text-xs text-gray-500">Remaining</p>
      </div>
    </div>
  );
};

export { StatusCard, TrendChart, Chart };
