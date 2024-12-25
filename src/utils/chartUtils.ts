export function createGradient(colorStart: string, colorEnd: string) {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return undefined;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
}

export function createChartOptions(yLabel: string, xLabel: string) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        },
        plugins: {
            legend: {
                labels: {
                    color: '#E4E6F0',
                    font: { family: 'Poppins' }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: {
                    color: '#E4E6F0',
                    font: { family: 'Poppins' }
                }
            },
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: {
                    color: '#E4E6F0',
                    font: { family: 'Poppins' }
                }
            }
        }
    };
}

export function initializeCharts() {
    const charts: any = {};
    
    const trendChartElement = document.getElementById('trendChart');
    if (trendChartElement) {
        const ctx = (trendChartElement as HTMLCanvasElement).getContext('2d');
        if (ctx) {
            charts.trendChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Predicted Inventory',
                        data: [],
                        borderColor: '#6C63FF',
                        backgroundColor: createGradient('rgba(108, 99, 255, 0.2)', 'rgba(108, 99, 255, 0)'),
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: createChartOptions('Quantity', 'Time')
            });
        }
    }
    
    return charts;
}