function convertToChartData(data, intervalType = 'week') {
    // Initialize an object to store sales data for each day
    const salesData = {};
    console.log(data)
    // Iterate over each transaction
    data.forEach(transaction => {
        // Extract timestamp
        const timestamp = transaction.timestamp.seconds * 1000; // Convert to milliseconds

        // Get the date string in format "Month Day"
        const date = new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        // Increment total sales for the day
        if (salesData[date]) {
            salesData[date] += transaction.totalPrice;
        } else {
            salesData[date] = transaction.totalPrice;
        }
    });

    // Get the current date
    const currentDate = new Date();

    // Initialize arrays for categories and data
    const categories = [];
    const sales = [];

    // Calculate the starting and ending dates based on the interval type
    let startDate = new Date(currentDate);
    let endDate = new Date(currentDate);

    if (intervalType === 'past7') {
        startDate.setDate(startDate.getDate() - 6); // Start from 7 days ago
    } else if (intervalType === 'past14') {
        startDate.setDate(startDate.getDate() - 13); // Start from 14 days ago
    } else if (intervalType === 'past30') {
        startDate.setDate(startDate.getDate() - 29); // Start from 30 days ago
    } if (intervalType === 'month') {
        startDate.setDate(1); // Set to the first day of the current month
        endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // Last day of the current month
    }
    else if (intervalType === 'week') {
        startDate.setDate(currentDate.getDate() - currentDate.getDay()); // Set to the first day of the current week (Sunday)
        endDate.setDate(startDate.getDate() + 6); // Set to the last day of the current week (Saturday)
    }
    else if (intervalType === 'year') {
        startDate = new Date(startDate.getFullYear(), 0, 1); // Set to January 1st of the current year
        endDate = new Date(startDate.getFullYear(), 11, 31); // Set to December 31st of the current year
    }

    // Loop through the selected interval
    if (intervalType === 'year') {
        for (let i = 0; i < 12; i++) {
            const monthStartDate = new Date(startDate.getFullYear(), i, 1);
            const monthEndDate = new Date(startDate.getFullYear(), i + 1, 0);
            const monthName = monthStartDate.toLocaleDateString('en-US', { month: 'short' });
            let totalSales = 0;

            for (let j = monthStartDate; j <= monthEndDate; j.setDate(j.getDate() + 1)) {
                const dateKey = j.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                totalSales += salesData[dateKey] || 0;
            }

            categories.push(monthName);
            sales.push(totalSales);
        }
    } else {
        for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
            const dateKey = i.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            categories.push(dateKey);

            // If sales data exists for the date, push the sales value; otherwise, push 0
            sales.push(salesData[dateKey] || 0);
        }
    }

    // Construct the final chart data object
    const chartData = {
        categories: categories,
        series: [{
            name: 'Sales',
            data: sales
        }]
    };

    return chartData;
}



function convertToOrderCountData(data, intervalType = 'week') {
    // Initialize an object to store order count data for each day
    const orderCountData = {};

    // Iterate over each transaction
    data.forEach(transaction => {
        // Extract timestamp
        const timestamp = transaction.timestamp.seconds * 1000; // Convert to milliseconds

        // Get the date string in format "Month Day"
        const date = new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        // Increment total order count for the day
        if (orderCountData[date]) {
            orderCountData[date]++;
        } else {
            orderCountData[date] = 1;
        }
    });

    // Get the current date
    const currentDate = new Date();

    // Initialize arrays for categories and data
    const categories = [];
    const orderCounts = [];

    // Calculate the starting and ending dates based on the interval type
    let startDate = new Date(currentDate);
    let endDate = new Date(currentDate);

    if (intervalType === 'past7') {
        startDate.setDate(startDate.getDate() - 6); // Start from 7 days ago
    } else if (intervalType === 'past14') {
        startDate.setDate(startDate.getDate() - 13); // Start from 14 days ago
    } else if (intervalType === 'past30') {
        startDate.setDate(startDate.getDate() - 29); // Start from 30 days ago
    } if (intervalType === 'month') {
        startDate.setDate(1); // Set to the first day of the current month
        endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // Last day of the current month
    }
    else if (intervalType === 'week') {
        startDate.setDate(currentDate.getDate() - currentDate.getDay()); // Set to the first day of the current week (Sunday)
        endDate.setDate(startDate.getDate() + 6); // Set to the last day of the current week (Saturday)
    }
    else if (intervalType === 'year') {
        startDate = new Date(startDate.getFullYear(), 0, 1); // Set to January 1st of the current year
        endDate = new Date(startDate.getFullYear(), 11, 31); // Set to December 31st of the current year
    }

    // Loop through the selected interval
    if (intervalType === 'year') {
        for (let i = 0; i < 12; i++) {
            const monthStartDate = new Date(startDate.getFullYear(), i, 1);
            const monthEndDate = new Date(startDate.getFullYear(), i + 1, 0);
            const monthName = monthStartDate.toLocaleDateString('en-US', { month: 'short' });
            let totalOrderCount = 0;

            for (let j = monthStartDate; j <= monthEndDate; j.setDate(j.getDate() + 1)) {
                const dateKey = j.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                totalOrderCount += orderCountData[dateKey] || 0;
            }

            categories.push(monthName);
            orderCounts.push(totalOrderCount);
        }
    } else {
        for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
            const dateKey = i.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            categories.push(dateKey);

            // If order count data exists for the date, push the count value; otherwise, push 0
            orderCounts.push(orderCountData[dateKey] || 0);
        }
    }

    // Construct the final chart data object
    const chartData = {
        categories: categories,
        series: [{
            name: 'Order Count',
            data: orderCounts
        }]
    };

    return chartData;
}


export { convertToChartData , convertToOrderCountData };