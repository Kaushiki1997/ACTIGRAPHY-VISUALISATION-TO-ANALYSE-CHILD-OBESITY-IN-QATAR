

//based off http://nvd3.org/examples/linePlusBar.html and http://bl.ocks.org/daluu/f58884c24ff893186416
//tweaked with help from http://stackoverflow.com/questions/35264069/adapting-nvd3-lineplusbarchart-to-a-histogram-with-cumulative-percentage-line
var finalDataset = null; //for debugging in JS console

//define margins for chart, histogram bin size, and the x scale for the bins
var m = {top: 30, right: 60, bottom: 50, left: 70}
  , h = 400 - m.top - m.bottom
  , w = 800 - m.left - m.right
  , numBins = 50;
var x = d3.scale.linear().domain([0, 50]).range([0, w]);



var dataset2=[];
var dataset1 = [];
  var convertedData=[];
  var countObj1=[];
  var countObj2=[];
  

  
 d3.csv("BC_43_bmi.csv", function(error, data){
  
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
 
 d3.csv("BC_45_bmi.csv", function(error, data){
  
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
            .width(1000)
            //We can set x data accessor to use index. Reason? So the bars all appear evenly spaced.
            .x(function(d,i) { return d[0] })
            .y(function(d,i) {return d[1] })
            //.focusEnable(false)
          //  .barColor(d3.scale.category20().range())
            .duration(300)
           // .rotateLabels(0)
            .groupSpacing(0.1)
            .reduceXTicks(false)
            //.legend.rightAlign(true);
            
                    ;
  chart.legend.margin({top: 10, right: 200, left: 0, bottom: 20});
  
  
      chart.xAxis.tickFormat(function(d) {
        return d
      });
      var data=convertedData;
      chart.xAxis.ticks(data[0].values.length)
      chart.xAxis.axisLabel('BMI');
      

      chart.yAxis
          .tickFormat(d3.format(',f'))
          .axisLabel('No. of Children');
          
           
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


