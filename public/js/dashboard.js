$(document).ready(function () {
    const getProductData = (userData) => {
        $.get(`/api/products/${userData.id}`).then((data) => {
            console.log(`Products Data:`, data);
        });
    }

    const getUserData = () => {
        $.get("/api/users/data").then((data) => {
            console.log(`User Data:`, data)
            // data conatins data.username and data.id
            // Add all of the dynamic stuff you need with the user in here (including grabbing a reference to the id)
            $("#user-name").text(data.username);
            getProductData(data);
        });
    }

    getUserData();    

      // Materialize Button Collapse Function
    (function () {
        $(".button-collapse").sideNav();
        $('.collapsible').collapsible();
        $('select').material_select();
        var bootTimeout = window.setTimeout(function setBootTimeout() {

        })();
    });

    // Chart.js Function

    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
        'November', 'December'
    ];
    const color = Chart.helpers.color;
    const barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Purchases',
            backgroundColor: color(window.chartColors.grey).alpha(0.6).rgbString(),
            borderColor: window.chartColors.grey,
            borderWidth: 1,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }, {
            label: 'Sales',
            backgroundColor: color(window.chartColors.blue).alpha(0.6).rgbString(),
            borderColor: window.chartColors.blue,
            borderWidth: 1,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }]

    };

    window.onload = () => {
        const ctx = document.getElementById('canvas').getContext('2d');
        window.myBar = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Purchases vs Sales'
                }
            }
        });

    };

    document.getElementById('randomizeData').addEventListener('click', () => {
        const zero = Math.random() < 0.2 ? true : false;
        barChartData.datasets.forEach((dataset) => {
            dataset.data = dataset.data.map(() => {
                return zero ? 0.0 : randomScalingFactor();
            });

        });
        window.myBar.update();
    });

    const colorNames = Object.keys(window.chartColors);
    document.getElementById('addDataset').addEventListener('click', function () {
        const colorName = colorNames[barChartData.datasets.length % colorNames.length];
        const dsColor = window.chartColors[colorName];
        const newDataset = {
            label: 'Dataset ' + barChartData.datasets.length,
            backgroundColor: color(dsColor).alpha(0.5).rgbString(),
            borderColor: dsColor,
            borderWidth: 1,
            data: []
        };

        for (const index = 0; index < barChartData.labels.length; ++index) {
            newDataset.data.push(randomScalingFactor());
        }

        barChartData.datasets.push(newDataset);
        window.myBar.update();
    });

    document.getElementById('addData').addEventListener('click', () => {
        if (barChartData.datasets.length > 0) {
            const month = MONTHS[barChartData.labels.length % MONTHS.length];
            barChartData.labels.push(month);

            for (const index = 0; index < barChartData.datasets.length; ++index) {
                // window.myBar.addData(randomScalingFactor(), index);
                barChartData.datasets[index].data.push(randomScalingFactor());
            }

            window.myBar.update();
        }
    });

    document.getElementById('removeDataset').addEventListener('click', () => {
        barChartData.datasets.splice(0, 1);
        window.myBar.update();
    });

    document.getElementById('removeData').addEventListener('click', () => {
        barChartData.labels.splice(-1, 1); // remove the label first

        barChartData.datasets.forEach((dataset) => {
            dataset.data.pop();
        });

        window.myBar.update();
    });

});
