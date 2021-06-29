/* ---------------------------------------------------------
index.html, app.js
----

Written in HTML with Bootstrap and D3.js

By Nicole Lund 

The starter code and data for this challenge was 
provided and can be reviewed in assignment_instructions.

The resource I used to develop the gauge was based on the following website
   Create interactive charts with Plotly.js, Part 5: Pie charts and gauges - Programmer Sought. (n.d.). 
   https://www.programmersought.com/article/72787385250/.
--------------------------------------------------------- */

 
//Get Data
d3.json("./data/samples.json").then(function(data) {
   console.log(data);

   // Populate Drop Down Menu
   var dropMenu = d3.select("#selDataset");
   let sampleIds = data.names;
   sampleIds.forEach((id) => {
      dropMenu.append("option").text(id).property("value",id);
   });

   // Initialize page with first Test Subject
   popDemographic(sampleIds[0],data.metadata);
   buildBar(sampleIds[0], data.samples);
   buildGauge(sampleIds[0], data.metadata);
   buildBubble(sampleIds[0], data.samples);
});

// Update page when Test Subject is changed
function optionChanged(sample_id) {
   d3.json("./data/samples.json").then(function(data) {
      popDemographic(sample_id,data.metadata);
      buildBar(sample_id, data.samples);
      buildGauge(sample_id, data.metadata);
      buildBubble(sample_id, data.samples);
   });
};

// Add Demographic Info for Test Subject
function popDemographic(selectedSample, metadata) {
   // Retrieve selected metadata
   var meta = metadata.filter(metaObj => metaObj.id == selectedSample);
   // console.log(meta[0]);
   var demoPanel = d3.select("#sample-metadata");
   demoPanel.selectAll("p").remove();
   Object.entries(meta[0]).forEach(([key, value]) => {
      // console.log(`Metadata [Key: ${key}, Value: ${value}]`);
      demoPanel.append('p').text(`${key}: ${value}`);
   });
};

// Create bar chart in "bar" section
function buildBar(selectedSample, samples) {
   // Retrieve selected sample data
   var sampleData = samples.filter(sampleObj => sampleObj.id == selectedSample);
   sampleData = sampleData[0];
   console.log(`------Retrieve samples for sample_id=${selectedSample}-------`);
   // console.log(sampleData);

   // Reorganize data into array of objects
   barData = [];
   for (i=0; i < sampleData.sample_values.length; i++) {
      barData.push({
         "sample_id":sampleData.id,
         "otu_id":sampleData.otu_ids[i],
         "sample_value":sampleData.sample_values[i],
         "otu_label":sampleData.otu_labels[i]
      });
   };
   
   // Sort the samplesResultArray by sample_values
   barData.sort((a,b) => b.sample_value - a.sample_value);

   // Slice the top 10 objects
   barData = barData.slice(0,10);

   // Reverse the array due to Plotly's defaults
   barData = barData.reverse();

   // Define data trace
   var barTrace = [{
      x: barData.map(row => row.sample_value),
      y: barData.map(row => `OTU ${row.otu_id}`),
      text: barData.map(row => row.otu_label),
      type: "bar",
      orientation: "h"
   }];

   // Define layout
   var barLayout = {
      title: `OTUs present in Test Subject ${selectedSample}`
   };

   // Define configuration
   var barConfig = {
      responsive: true,
      displayModeBar: false
   };

   // Render Plot
   Plotly.newPlot("bar", barTrace, barLayout, barConfig);
};

function buildGauge(selectedSample, metadata) {
   // Retrieve selected metadata
   var meta = metadata.filter(metaObj => metaObj.id == selectedSample);
   // console.log(meta[0]);
   meta = meta[0];
   var washFreq = meta.wfreq;
   // console.log(washFreq);    

   var gaugeTrace = [{
      type: "pie",
      hole: 0.4,
      rotation: 90,
      direction: "clockwise",
      values: [1,1,1,1,1,1,1,1,1,9],
      text: ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9",""],
      textinfo: 'text',
      textposition: "inside",
      marker: {
         colors: ['','','','','','','','','','white']
      },
      showlegend: false
   }];

   // Calculate arrow tip
   var x0 = 0.5, y0 = 0.5, radius = 0.25;
   var radians = washFreq * Math.PI / 9;
   var x = x0 - radius * Math.cos(radians);
   var y = y0 + radius * Math.sin(radians);
   
   // Define layout
   var gaugeLayout = {
      hovermode: false,
      shapes:[{
         type: 'line',
         x0: x0,
         y0: y0,
         x1: x,
         y1: y,
         line: {
            color: 'black',
            width: 10
         }
      }],
      title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
      xaxis: {visible: false, range: [-1,1]},
      yaxis: {visible: false, range: [-1,1]},
   };
   
   // Define configuration
   var gaugeConfig = {
      responsive: true,
      displayModeBar: false
   };

   // Render Plot
   Plotly.newPlot("gauge", gaugeTrace, gaugeLayout, gaugeConfig);
};

function buildBubble(selectedSample, samples) {
   // Retrieve selected sample data
   var sampleData = samples.filter(sampleObj => sampleObj.id == selectedSample);
   sampleData = sampleData[0];

   // Define data trace
   var bubbleTrace = [{
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      mode: 'markers',
      marker: {
         color: sampleData.otu_ids,
         size: sampleData.sample_values
      }
   }];
   // console.log(bubbleTrace);

   // Define layout
   var bubbleLayout = {
      title: `All OTUs present in Test Subject ${selectedSample}`,
      xaxis: {title: 'OTU ID'},
      yaxis: {title: 'OTU Abundance'}
   };

   // Define configuration
   var bubbleConfig = {
      responsive: true,
      displayModeBar: false
   };

   // Render Plot
   Plotly.newPlot("bubble", bubbleTrace, bubbleLayout, bubbleConfig);
};
