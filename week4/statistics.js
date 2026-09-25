let data = [];

let districtChart;
let locationChart;


// CSV 읽기
Papa.parse("./data/sdot.csv", {

    download: true,

    header: true,

    delimiter: ";",

    skipEmptyLines: true,

    complete: function(results) {

        console.log("CSV 읽기 성공");
        console.log(results.data);

        data = results.data;

        drawDistrictChart();
        drawLocationChart();
    },

    error: function(error) {

        console.log("CSV 읽기 실패");
        console.log(error);
    }
});


// 그래프 1
// 지역별 센서 수
function drawDistrictChart() {

    const districtCount = {};


    data.forEach(function(row) {

        const address = row["주소"];

        if (!address) {
            return;
        }


        // 주소에서 ○○구 찾기
        const match = address.match(/([가-힣]+구)/);


        if (match) {

            const district = match[1];

            if (!districtCount[district]) {
                districtCount[district] = 0;
            }

            districtCount[district]++;
        }

    });


    const labels = Object.keys(districtCount);

    const values = Object.values(districtCount);


    const ctx = document.querySelector("#districtChart");


    districtChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [
                {
                    label: "센서 수",

                    data: values
                }
            ]
        },


        options: {

            responsive: true,

            plugins: {

                legend: {
                    display: true
                }

            },


            scales: {

                x: {
                    title: {
                        display: true,
                        text: "지역"
                    }
                },


                y: {

                    beginAtZero: true,

                    title: {
                        display: true,
                        text: "센서 수"
                    }

                }

            }

        }

    });

}



// 그래프 2
// 센서 위치 분포
function drawLocationChart() {

    const points = [];


    data.forEach(function(row) {

        const latitude = parseFloat(row["위도"]);

        const longitude = parseFloat(row["경도"]);


        if (!isNaN(latitude) && !isNaN(longitude)) {

            points.push({

                x: longitude,

                y: latitude

            });

        }

    });


    const ctx = document.querySelector("#locationChart");


    locationChart = new Chart(ctx, {

        type: "scatter",

        data: {

            datasets: [

                {

                    label: "S-DoT 센서 위치",

                    data: points

                }

            ]

        },


        options: {

            responsive: true,


            scales: {

                x: {

                    title: {

                        display: true,

                        text: "경도"

                    }

                },


                y: {

                    title: {

                        display: true,

                        text: "위도"

                    }

                }

            }

        }

    });

}



// 첫 번째 버튼
document.querySelector("#tab1").addEventListener("click", function() {

    document.querySelector("#chart1").hidden = false;

    document.querySelector("#chart2").hidden = true;


    document.querySelector("#tab1")
        .setAttribute("aria-pressed", "true");

    document.querySelector("#tab2")
        .setAttribute("aria-pressed", "false");


    requestAnimationFrame(function() {

        districtChart.resize();

    });

});



// 두 번째 버튼
document.querySelector("#tab2").addEventListener("click", function() {

    document.querySelector("#chart1").hidden = true;

    document.querySelector("#chart2").hidden = false;


    document.querySelector("#tab1")
        .setAttribute("aria-pressed", "false");

    document.querySelector("#tab2")
        .setAttribute("aria-pressed", "true");


    requestAnimationFrame(function() {

        locationChart.resize();

    });

});