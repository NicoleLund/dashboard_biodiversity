
/*

HINT 1

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
   var metadata = data.metadata;
   console.log(data);
   console.log(metadata);

   var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
   var result = resultArray[0];
   console.log(result);
});

// Create bar chart in "bar" section
