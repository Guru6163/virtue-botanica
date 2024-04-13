import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = ({ interval = 'past14' }) => {
    // Function to generate dummy data based on the specified interval
    const generateDummyData = () => {
        // Generate dummy sales data for demonstration
        let categories = [];
        let seriesData = [];

        switch (interval) {
            case 'daily':
                categories = new Array(7).fill().map((_, index) => `Day ${index + 1}`);
                seriesData = new Array(7).fill().map(() => Math.floor(Math.random() * 1000)); // Random sales data for 7 days
                break;
            case 'weekly':
                categories = new Array(4).fill().map((_, index) => `Week ${index + 1}`);
                seriesData = new Array(4).fill().map(() => Math.floor(Math.random() * 1000)); // Random sales data for 4 weeks
                break;
            case 'monthly':
                categories = new Array(4).fill().map((_, index) => `Month ${index + 1}`);
                seriesData = new Array(4).fill().map(() => Math.floor(Math.random() * 1000)); // Random sales data for 4 months
                break;
            case 'past7':
                categories = new Array(7).fill().map((_, index) => {
                    const date = new Date();
                    date.setDate(date.getDate() - index);
                    return `${date.getDate()}/${date.getMonth() + 1}`;
                });
                seriesData = new Array(7).fill().map(() => Math.floor(Math.random() * 1000)); // Random sales data for 7 days
                break;
            case 'past14':
                categories = new Array(14).fill().map((_, index) => {
                    const date = new Date();
                    date.setDate(date.getDate() - index);
                    return `${date.getDate()}/${date.getMonth() + 1}`;
                });
                seriesData = new Array(14).fill().map(() => Math.floor(Math.random() * 1000)); // Random sales data for 14 days
                break;
            case 'past30':
                categories = new Array(30).fill().map((_, index) => {
                    const date = new Date();
                    date.setDate(date.getDate() - index);
                    return `${date.getDate()}/${date.getMonth() + 1}`;
                });
                seriesData = new Array(30).fill().map(() => Math.floor(Math.random() * 1000)); // Random sales data for 30 days
                break;
            default:
                break;
        }


        return {
            categories,
            series: [{ name: 'Sales', data: seriesData }]
        };
    };

    const dummyData = generateDummyData();

    const options = {
        chart: {
            id: 'line-chart',
            toolbar: {
                show: false // Hide chart toolbar
            }
        },
        xaxis: {
            categories: dummyData.categories,
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
            enabled: false // Disable data labels
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
            <Chart options={options} series={dummyData.series} type="line" height={350} />
        </div>
    );
};

export default LineChart;
