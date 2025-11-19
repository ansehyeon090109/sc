const ctx = document.getElementById('myChart').getContext('2d');

const data_list = [10, 5, -3, -10, 8];

const reload = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['0.5s', '1.0s', '1.5s', '2.0s', '2.5s', '3.0s'],
        datasets: [
            {
                label: 'Revenue',
                data: data_list,
                borderColor: '#00B0FF',
                backgroundColor: 'rgba(0, 180, 255, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                align: 'start',
                labels: {
                    color: 'white',
                    usePointStyle: true,
                }
            },
            tooltip: {
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                titleColor: '#fff',
                bodyColor: '#fff',
                cornerRadius: 8,
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y;
                        return `${label}: ${value / 1}K`;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: { color: 'black' },
                grid: { display: false },
            },
            y: {
                beginAtZero: true,
                
                grid: {
                    color: 'rgba(107, 114, 128, 0.3)',
                    drawBorder: false
                },
            }
        }
    }
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function GetData() {
    const temp = [];

    for(let i = 0; i < 6; i++) {  
        try {
            const response = await fetch('/data');
            const data = await response.json();
            temp.push(data);

            reload.data.datasets[0].data = [...temp]; // 차트 데이터 갱신
            console.log(temp);
            reload.update();

        } catch (error) {
            console.log(error);
        }

        await sleep(500);
    }

    reload.update();
}
