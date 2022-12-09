'use strict'

const mapHeight = 8;
const mapWidth = 16;
const maxVal = 741;

var datalist = (function () {
    const dlist = []
    for (let i = 0; i < mapHeight * mapWidth; i++) {
        dlist.push(Math.random())
    }
    return dlist
})()

const generateDatasets = function () {
    const datasets = []

    for (let i = 0; i < mapHeight; i++) {
        datasets.push({
            data: new Array(mapWidth).fill(1),
            borderWidth: 0.2,
            borderColor: "#FFFFFF",
            backgroundColor: generateColor(i)
        })
    }
    return datasets
}

const generateColor = function (y) {
    const datasetColors = []

    for (let x = 0; x < mapWidth; x++) {
        const opa = ((datalist[x + (mapHeight - y - 1) * mapWidth]) * 0.7 + 0.3).toFixed(2);
        datasetColors.push("rgb(235,10,10," + opa + ")")
    }
    return datasetColors;
}

const generateLabels = function () {
    let labels = []
    for (var i = 1; i < mapWidth + 1; i++) {
        labels.push(i)
    }
    return labels
}

const ctx = document.getElementById('heatMap').getContext('2d')
const heatMap = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: generateDatasets(),
        labels: generateLabels()
    },
    options: {
        title: {
            display: true,
            text: 'Heat Map Sample',
            fontSize: 18,
        },
        animation: false,
        animation: {
            duration: 0
        },
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: '#FFFFFF',
                },
                barPercentage: 0.99,
                categoryPercentage: 0.99,
                stacked: true,
                ticks: {
                    min: 0,
                    display: false,
                }
            }],
            yAxes: [{
                gridLines: {
                    color: '#FFFFFF',
                    zeroLineWidth: 0
                },
                stacked: true,
                ticks: {
                    min: 0,
                    stepSize: 1,
                    display: false
                }
            }]
        },
    }
});