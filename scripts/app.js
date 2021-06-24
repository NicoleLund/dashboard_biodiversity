


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





// Load samples.json
d3.json("data/samples.json").then((importedData) => {
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
});

// Initialize page
var sample_id = 945;
getSampleData(sample_id, metadata, names, samples);
buildBar(samplesResultArray);


// Retrieve data for selected sample
function getSampleData(sample_id, metadata, names, samples) {
   console.log(`------Retrieve data for sample_id=${sample_id}-------`);

   var metadataResultArray = metadata.filter(sampleObj => sampleObj.id == sample_id);
   console.log("------metadata-------");
   console.log(metadataResultArray[0]);

   var namesResultArray = names.filter(sampleObj => sampleObj == sample_id);
   console.log("------names-------");
   console.log(namesResultArray[0]);

   var samplesResultArray = samples.filter(sampleObj => sampleObj.id == sample_id);
   console.log("------samples-------");
   console.log(samplesResultArray[0]);

   return metadataResultArray, namesResultArray, samplesResultArray;
};


// Create bar chart in "bar" section
function buildBar(samples) {
   console.log(`Build bar chart for ${samples.id}`);
};

