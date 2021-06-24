


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






// Initialize page
var sample_id = 945;
var data = jsonData;
buildBar(sample_id, data);


// Create bar chart in "bar" section
function buildBar(selectedSample, data) {
   // // Load samples.json
   // d3.json("data/samples.json").then((importedData) => {
   // Retrieve all data
   // var data = importedData;
   console.log("------data-------");
   console.log(data);
   var metadata = data.metadata;
   console.log("------metadata-------");
   console.log(metadata);
   var names = data.names;
   console.log("------names-------");
   console.log(names);
   var samples = data.samples;
   console.log("------samples-------");
   console.log(samples);

   // Retrieve selected data
   console.log(`------Retrieve data for sample_id=${selectedSample}-------`);
   var metadataResultArray = metadata.filter(sampleObj => sampleObj.id == selectedSample);
   console.log("------metadata-------");
   console.log(metadataResultArray[0]);
   var namesResultArray = names.filter(sampleObj => sampleObj == selectedSample);
   console.log("------names-------");
   console.log(namesResultArray[0]);
   var samplesResultArray = samples.filter(sampleObj => sampleObj.id == selectedSample);
   console.log("------samples-------");
   console.log(samplesResultArray[0]);

   // Sort the samplesResultArray by sample_values
   samplesResultArray.sort((a,b) => parseInt(b.sample_values) - parseInt(a.sample_values));

   // Slice the first 10 items
   samplesResultArray = samplesResultArray.slice(0,10);

   // Define data trace
   var barTrace = [{
      x: samplesResultArray.map(row => row.sample_values),
      y: samplesResultArray.map(row => `OTU ${row.otu_ids}`),
      text: samplesResultArray.map(row => row.otu_labels),
      type: "bar",
      orientation: "h"
   }];

   // Define layout
   var barLayout = {
      title: `OTUs present in patient ${selectedSample}`
   };

   // Define configuration
   var barConfig = {
      responsive: true
   };

   // Render Plot
   Plotly.newPlot("bar", barTrace, barLayout, barConfig);

   // });
};

