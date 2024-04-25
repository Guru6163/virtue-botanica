import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = ({data}) => {


    const options = {
        chart: {
            id: 'line-chart',
            toolbar: {
                show: false // Hide chart toolbar
            }
        },
        xaxis: {
            categories: data.categories,
            labels: {
                style: {
                    colors: '#666' // X-axis label color
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#666' // Y-axis label color
                }
            }
        },
        grid: {
            borderColor: '#e0e0e0' // Grid lines color
        },
        colors: ['#4caf50'], // Line color
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
        },
        stroke: {
            curve: 'smooth', // Smooth curve for the line
            width: 3 // Line width
        },
        markers: {
            size: 5, // Marker size
            colors: ['#4caf50'], // Marker color
            strokeColors: '#fff', // Marker border color
            strokeWidth: 2 // Marker border width
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <Chart options={options} series={data?.series} type="line" height={350} />
        </div>
    );
};

export default LineChart;
