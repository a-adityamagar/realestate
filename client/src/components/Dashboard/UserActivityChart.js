import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function UserActivityChart({ users }) {
    const userNames = users.map(user => user.username);
    const userActivityData = users.map(user => user.activityCount || 0);

    const data = {
        labels: userNames,
        datasets: [
            {
                label: 'User Activity',
                data: userActivityData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'User Activity Overview'
            }
        }
    };

    return (
        <div>
            <h3>User Activity Chart</h3>
            <Bar data={data} options={options} />
        </div>
    );
}

export default UserActivityChart;
