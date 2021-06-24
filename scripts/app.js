/* HINT 1

 When importing json, try using metadata

 d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    console.log(result);

 });

HINT 2

 Event Listener is different in this html, review id="selDataset" in index.html
 <select id="selDataset" onchange="optionChanged(this.value)"></select> 
 */

 
//Get Data
var data = jsonData;

// Populate Drop Down Menu
var dropMenu = d3.select("#selDataset");
let sampleIds = data.names;
sampleIds.forEach((id) => {
   dropMenu.append("option").text(id).property("value",id);
});

// Initialize page
var sample_id = 945;
buildBar(sample_id, data.samples);


// Create bar chart in "bar" section
function buildBar(selectedSample, samples) {
   // Retrieve selected sample data
   var sampleData = samples.filter(sampleObj => sampleObj.id == selectedSample);
   sampleData = sampleData[0];

   // console.log("------samples-------");
   // console.log(samples);
   console.log(`------Retrieve samples for sample_id=${selectedSample}-------`);
   console.log(sampleData);

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
      title: `OTUs present in patient ${selectedSample}`
   };

   // Define configuration
   var barConfig = {
      responsive: true,
      displayModeBar: false
   };

   // Render Plot
   Plotly.newPlot("bar", barTrace, barLayout, barConfig);
};

