document.addEventListener('DOMContentLoaded', function() {
  // Plot for Crime Trends Over Time by Category
  d3.csv("crime_group_by_date.csv").then(function(data) {
      let traces = [];
      let categories = new Set(data.map(d => d.Crime_Group));
      categories.forEach(category => {
          let filteredData = data.filter(d => d.Crime_Group === category);
          let trace = {
              type: "scatter",
              mode: "lines+markers",
              name: category,
              x: filteredData.map(d => d.Dispatch_Date),
              y: filteredData.map(d => +d.Frequency),
              line: { shape: 'spline' }
          };
          traces.push(trace);
      });

      var layout = {
          title: 'Crime Trends Over Time by Category',
          xaxis: {
              autorange: true,
              type: 'date',
              title: 'Date',
              rangeselector: {
                  buttons: [
                      {
                          count: 1,
                          label: '1m',
                          step: 'month',
                          stepmode: 'backward'
                      },
                      {
                          count: 6,
                          label: '6m',
                          step: 'month',
                          stepmode: 'backward'
                      },
                      { step: 'all' }
                  ]
              },
              rangeslider: { range: ['2024-01-01', '2024-7-31'] },
              tickformat: '%b %Y'
          },
          yaxis: {autorange: true, type: 'linear', title: 'Frequency of Crimes'}
      };

      Plotly.newPlot('crimeTrendsDiv', traces, layout);
  });

  // Plot for High School Metrics
  d3.csv("Total_Crimes_HS_PSA.csv").then(function(data) {
      let xData = data.map(d => +d.Total_Crimes);
      let yDataAttendance = data.map(d => +d.Average_Percent_Attending_90);
      let yDataProficiency = data.map(d => +d.Average_Percent_Proficient_All_Keystones);
      
      var data = [
          {x: xData, y: yDataAttendance, mode: 'markers', type: 'scatter', name: 'Attendance vs. Crimes'},
          {x: xData, y: yDataProficiency, mode: 'markers', type: 'scatter', name: 'Proficiency vs. Crimes'}
      ];

      var layout = {
          title: 'PSA Crime Impact on High School Metrics',
          xaxis: {title: 'Total Crimes in PSA'},
          yaxis: {title: 'School Metrics Percentage'}
      };

      Plotly.newPlot('hsMetricsDiv', data, layout);
  });

  // Plot for Elementary School Metrics
  d3.csv("Total_Crimes_ES_PSA.csv").then(function(data) {
      let xData = data.map(d => +d.Total_Crimes);
      let yData = [
          {data: data.map(d => +d.Average_Percent_Attending_90), name: 'Attendance'},
          {data: data.map(d => +d.Average_ELA_Proficiency_3_to_8), name: 'ELA Proficiency'},
          {data: data.map(d => +d.Average_Math_Proficiency_3_to_8), name: 'Math Proficiency'}
      ];

      var traces = yData.map(metric => ({
          x: xData,
          y: metric.data,
          mode: 'markers',
          type: 'scatter',
          name: `${metric.name} vs. Crimes`
      }));

      var layout = {
          title: 'PSA Crime Impact on Elementary School Metrics',
          xaxis: {title: 'Total Crimes in PSA'},
          yaxis: {title: 'School Metrics Percentage'}
      };

      Plotly.newPlot('esMetricsDiv', traces, layout);
  });

  // New Plot for Total Crimes and School Scores by PSA
  document.addEventListener('DOMContentLoaded', function() {
    d3.csv("Total_Crimes_School_Scores_PSA.csv").then(function(data) {
        let psaNumbers = data.map(row => row.PSA);
        let totalCrimes = data.map(row => +row.Total_Crimes);
        let attendanceRates = data.map(row => +row.Attendance_Rate);
        let elaProficiency = data.map(row => +row.ELA_Proficiency);
        let mathProficiency = data.map(row => +row.Math_Proficiency);

        let trace1 = {
            x: psaNumbers,
            y: totalCrimes,
            name: 'Total Crimes',
            type: 'bar',
            marker: { color: 'rgb(49,130,189)' }
        };

        let trace2 = {
            x: psaNumbers,
            y: attendanceRates,
            name: 'Attendance Rate',
            type: 'bar',
            marker: { color: 'rgb(204,204,204)' }
        };

        let trace3 = {
            x: psaNumbers,
            y: elaProficiency,
            name: 'ELA Proficiency',
            type: 'bar',
            marker: { color: 'rgb(255,153,51)' }
        };

        let trace4 = {
            x: psaNumbers,
            y: mathProficiency,
            name: 'Math Proficiency',
            type: 'bar',
            marker: { color: 'rgb(50,171,96)' }
        };

        let layout = {
            title: 'Total Crimes and School Scores by PSA',
            barmode: 'group',
            xaxis: { title: 'PSA Number' },
            yaxis: {
                title: 'Total Crimes',
                side: 'left',
                position: 0
            },
            yaxis2: {
                title: 'School Metrics Percentage',
                overlaying: 'y',
                side: 'right',
                range: [0, 100]  // Adjust this range based on your actual data scale
            },
            legend: {
                x: 1,
                xanchor: 'right',
                y: 1
            }
        };

        Plotly.newPlot('barGraphDiv', [trace1, trace2, trace3, trace4], layout);
    }).catch(function(error) {
        console.error('Error fetching and parsing the data for bar graphs:', error);
    });
});