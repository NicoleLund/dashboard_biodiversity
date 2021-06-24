


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
buildBar(sample_id);


// Create bar chart in "bar" section
function buildBar(selectedSample) {
   // Load samples.json
   d3.json("data/samples.json").then((importedData) => {
      // Retrieve all data
      var data = importedData;
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

      // Retrieve bar chart values
      console.log(`Build bar chart for ${samplesResultArray.id}`);
      var otu_ids = samplesResultArray.otu_ids;
      var otu_labels = samplesResultArray.otu_labels;
      var sample_values  = samplesResultArray.sample_values;
      var otu_names = otu_ids.forEach(id => `OTU ${id}`);
      console.log(otu_names);
      console.log(otu_labels);
      console.log(sample_values);
   });
};

