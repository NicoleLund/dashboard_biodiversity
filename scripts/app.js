


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

   // Review data for id=945
   sample = 945
   console.log("------Review data for id=495-------");

   var metadataResultArray = metadata.filter(sampleObj => sampleObj.id == sample);
   console.log("------metadata-------");
   console.log(metadataResultArray[0]);

   var namesResultArray = names.filter(sampleObj => sampleObj.id == sample);
   console.log("------names-------");
   console.log(namesResultArray[0]);

   var samplesResultArray = samples.filter(sampleObj => sampleObj.id == sample);
   console.log("------samples-------");
   console.log(samplesResultArray[0]);
});

// Create bar chart in "bar" section
