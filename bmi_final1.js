
function bmi()
{
   
//based off http://nvd3.org/examples/linePlusBar.html and http://bl.ocks.org/daluu/f58884c24ff893186416
//tweaked with help from http://stackoverflow.com/questions/35264069/adapting-nvd3-lineplusbarchart-to-a-histogram-with-cumulative-percentage-line
var finalDataset = null; //for debugging in JS console

//define margins for chart, histogram bin size, and the x scale for the bins
var m = {top: 30, right: 60, bottom: 50, left: 70}
  , h = 400 - m.top - m.bottom
  , w = 800 - m.left - m.right
  , numBins = 40;
var x = d3.scale.linear().domain([12,42]).range([0, w]);



var dataset2=[];
var dataset1 = [];
  var convertedData=[];
  var countObj1=[];
  var countObj2=[];
  
var selection1=document.getElementById("selection1").value;
//console.log(selection)
var dselection1=document.getElementById(selection1).value;
console.log(dselection1);
var csvFile1 = "../../" + dselection1 + "_bmi.csv";

var selection2=document.getElementById("selection2").value;
//console.log(selection1)
var dselection2=document.getElementById(selection2).value;
console.log(dselection2);
var csvFile2 = "../../" + dselection2 + "_bmi.csv";


 d3.csv(csvFile1, function(error, data){
  
		//console.log(data);
		// create an empty object that nv is expecting
        // populate the empty object with your data
    data.forEach(function (d){
    	dataset1.push(d.bmi);
    });
        binData1 = d3.layout.histogram().bins(x.ticks(numBins))(dataset1);
          countObj1 = {'key': 'Cluster1', 'bar': true, 'color': '#ccf', 'values': []};
  //var cdfObj = {'key': 'CDF', 'color': '#333', 'values': []};
 for(var i = 0; i < binData1.length; i++){
  countObj1.values.push([binData1[i].x,binData1[i].y]);
   //countObj2.values.push([binData2[i].x,binData2[i].y]);
    //cdfObj.values.push([binData[i].x,jstat.normal(jstat.mean(), jstat.stdev()).cdf(binData[i].x)]);
  }

      
  
convertedData.push(countObj1);

 });
   

 d3.csv(csvFile2, function(error, data){
  
		//console.log(data);
		// create an empty object that nv is expecting
        // populate the empty object with your data
    data.forEach(function (d){
    	dataset2.push(d.bmi);
    });
  binData2 = d3.layout.histogram().bins(x.ticks(numBins))(dataset2);
    countObj2 = {'key': 'Cluster2', 'bar': true, 'color': '#333', 'values': []};
 for(var i = 0; i < binData2.length; i++){
    countObj2.values.push([binData2[i].x,binData2[i].y]);
   }
  
   
   //return countObj2;
 convertedData.push(countObj2);
 });

 // binData2 = d3.layout.histogram()(dataset2);
  
 

 
  
 // convertedData.push(cdfObj);
  
  
  //finalDataset = data;

  nv.addGraph(function() {
      var chart = nv.models.multiBarChart()
              .margin({top: m.top, right: m.right, bottom: m.bottom, left: m.left})
            //.width(1000)
            //We can set x data accessor to use index. Reason? So the bars all appear evenly spaced.
            .x(function(d,i) { return d[0] })
            .y(function(d,i) {return d[1] })
            //.focusEnable(false)
          //  .barColor(d3.scale.category20().range())
            .duration(300)
            .rotateLabels(60)
            .groupSpacing(0.1)
            .reduceXTicks(false)
           //.staggerLabels(true)
            //.legend.rightAlign(true);
            
                    ;
  
  
  chart.xAxis.tickPadding(5);
  
      chart.xAxis.tickFormat(function(d) {
        return d
      });
      var data=convertedData;
 
                     
      chart.xAxis.ticks(data[0].values.length)
      chart.xAxis.axisLabel('BMI');
      //chart.yAxis.axisLabelDistance(0.01);
     // chart.xAxis.scale(xscale);
      //var xScale = d3.scale.linear().domain([10,40]);
                 // .domain([convertedData[0][0],convertedData[convertedData.length-1][0]]);//, function(d) {
                    //return d.x;}])
                  //chart.xScale(xScale);
      
      /*  var xScale = d3.scale.linear();
      chart.bars.xScale.domain([convertedData[0][0],convertedData[convertedData.length-1][0]]);  
    
    chart.xAxis.scale(x);*/
   
      chart.yAxis
          .tickFormat(d3.format(',f'))
          .axisLabel('No. of Children');
         
      
           //chart.xDomain([15,35]);
//chart.legend.updateState(true);
      //chart.bars.forceY([0]);
/*chart.tooltip.contentGenerator(function(d) {
						if(d.data != null)
					      return 'BMI:' + d.data.x + '<br>Children:'+ d.data.y;
					     else
					    	return 'BMI:' + d.point.x + '<br>Children:'+ d.point.label;
					  });*/
      d3.select('#bmi svg')
        .datum(data)
        .transition()
        .duration(0)
        .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
  });

}
