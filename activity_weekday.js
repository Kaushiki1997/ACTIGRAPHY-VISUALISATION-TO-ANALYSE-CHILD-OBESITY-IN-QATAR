function weekday1(){
    
   console.log("hello");
var selection1=document.getElementById("selection1").value;
console.log("test1");
console.log(selection1)
var dselection1=document.getElementById(selection1).value;
console.log(dselection1);
var csvFile1 = "../../" + dselection1 + "_weekday.csv";

    
     
  
    d3.csv(csvFile1,function(err,data){
         var m = [80, 80, 80, 80]; // margins
    var w = 1000 - m[1] - m[3]; // width
    var h = 400 - m[0] - m[2]; // height
    
      var ticks = [];
      //get each key of the data that is not date
      //these will be our key in the key/value pair
      //the values x and y will be month and the value
      var dataToPlot = Object.keys(data[0]).filter(function(k){return k!="start_time"})
        .map(function(k){
          return {"key":k,"values":data.map(function(d){
           return {
             //let's make this a real date
             "x":d.start_time,//d3.time.format('%H:%M'),
             "y":+d[k]
           }
          })}
        })
         nv.addGraph(function() {
        var chart = nv.models.multiBarChart()
         // .duration(350)
          //.reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
          //.rotateLabels(45)      //Angle to rotate x-axis labels.
          .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
       //   .groupSpacing(0.1)    //Distance between each group of bars.
          .stacked(true)
          //.grouped(false) 
       .showControls(false)
       .staggerLabels(true)
       
        ;
          chart.tooltip.contentGenerator(function(d){
				          var html = "<div class='panel-body'><h5 style='color:"+d.color+"'>Time: <b>"+d.value+"</b></h5>";
				          d.series.forEach(function(elem){
								
										/*if (elem.value<60)
										{
									html += "<h5 style='color:"+elem.color+"'>Activity minutes: <b>"+elem.value+"</b></h5>";
										}
										else{ 
											elem.value=(elem.value)/60;
										elem.value=elem.value.toFixed(1);*/
			                   html += "<h5 style='color:"+elem.color+"'>Activity hours: <b>"+elem.value+"</b></h5>";}
										
				          )
				          html += "</div>";
				          return html;
				        });
      
//chart.xScale(d3.time.scale().domain([dataToPlot[0].values[0].x,dataToPlot[0].values[dataToPlot[0].values.length-1].x]));
    chart.reduceXTicks(false);//.staggerLabels(true);
      
         chart.xAxis
            .axisLabel("Hours")
            .axisLabelDistance(5)
            .showMaxMin(false)
          // .transform()
           // .tickFormat(d3.format(',.6f'))
        ;
          chart.yAxis
            .axisLabel("Activity Level")
            .axisLabelDistance(-5)
            .tickFormat(d3.format(',.01f'))
        ;
        				
       //chart.xDomain(data.map(function(d) { return d.start_time; }));
       //chart.xDomain([0,1440]);
       //d3.time.scale.domain([7:00,14:00]);
          //chart.xAxis.tickValues(ticks);
 /*   chart.tooltipContent(function (key, d.start_time, e, graph) {
     var value = graph.value;
     return  "" + d.start_time+ "" + value + "</p>";
});
    */
        d3.select('#activity_weekday1 svg')
            .datum(dataToPlot)
            .call(chart);
            
    
        nv.utils.windowResize(chart.update);
   
    
            
        /*chart.dispatch.on('stateChange', function(e) {
            nv.log('New State:', JSON.stringify(e));
        });
        
        chart.state.dispatch.on('change', function(state){
            nv.log('state', JSON.stringify(state));
        });*/
        return chart;
     
         });
    });
  
         //d3.time.scale().domain([0, dataToPlot.length]).range([0, w]);
    // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
  //  var y = d3.scale.linear().domain([d3.min(data), d3.max(data)]).range([h, 0]);
   
 //   t.select(".x.axis").call(xAxis);
  //  t.select('.path').attr("d", line(data));
}
function weekday2(){ 
   

var selection2=document.getElementById("selection2").value;
console.log("test 2");
console.log(selection2);
var dselection2=document.getElementById(selection2).value;
console.log(dselection2);
var csvFile2 = "../../" + dselection2 + "_weekday.csv";

    
     
  
    d3.csv(csvFile2,function(err,data){
         var m = [80, 80, 80, 80]; // margins
    var w = 1000 - m[1] - m[3]; // width
    var h = 400 - m[0] - m[2]; // height
    
      var ticks = [];
      //get each key of the data that is not date
      //these will be our key in the key/value pair
      //the values x and y will be month and the value
      var dataToPlot = Object.keys(data[0]).filter(function(k){return k!="start_time"})
        .map(function(k){
          return {"key":k,"values":data.map(function(d){
           return {
             //let's make this a real date
             "x":d.start_time,//d3.time.format('%H:%M'),
             "y":+d[k]
           }
          })}
        })
         nv.addGraph(function() {
        var chart = nv.models.multiBarChart()
         // .duration(350)
          //.reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
          //.rotateLabels(45)      //Angle to rotate x-axis labels.
          .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
       //   .groupSpacing(0.1)    //Distance between each group of bars.
          .stacked(true)
          //.grouped(false) 
       .showControls(false)
       .staggerLabels(true)
       
        ;
          chart.tooltip.contentGenerator(function(d){
				          var html = "<div class='panel-body'><h5 style='color:"+d.color+"'>Time: <b>"+d.value+"</b></h5>";
				          d.series.forEach(function(elem){
								
										/*if (elem.value<60)
										{
									html += "<h5 style='color:"+elem.color+"'>Activity minutes: <b>"+elem.value+"</b></h5>";
										}
										else{ 
											elem.value=(elem.value)/60;
										elem.value=elem.value.toFixed(1);*/
			                   html += "<h5 style='color:"+elem.color+"'>Activity hours: <b>"+elem.value+"</b></h5>";}
										
				          )
				          html += "</div>";
				          return html;
				        });
      
//chart.xScale(d3.time.scale().domain([dataToPlot[0].values[0].x,dataToPlot[0].values[dataToPlot[0].values.length-1].x]));
    chart.reduceXTicks(false);//.staggerLabels(true);
      
         chart.xAxis
            .axisLabel("Hours")
            .axisLabelDistance(10)
            .showMaxMin(false)
          // .transform()
           // .tickFormat(d3.format(',.6f'))
        ;
          chart.yAxis
            .axisLabel("Activity Level")
            .axisLabelDistance(-5)
            .tickFormat(d3.format(',.01f'))
        ;
        				
       //chart.xDomain(data.map(function(d) { return d.start_time; }));
       //chart.xDomain([0,1440]);
       //d3.time.scale.domain([7:00,14:00]);
          //chart.xAxis.tickValues(ticks);
 /*   chart.tooltipContent(function (key, d.start_time, e, graph) {
     var value = graph.value;
     return  "" + d.start_time+ "" + value + "</p>";
});
    */
        d3.select('#activity_weekday2 svg')
            .datum(dataToPlot)
            .call(chart);
            
    
        nv.utils.windowResize(chart.update);
   
    
            
        /*chart.dispatch.on('stateChange', function(e) {
            nv.log('New State:', JSON.stringify(e));
        });
        
        chart.state.dispatch.on('change', function(state){
            nv.log('state', JSON.stringify(state));
        });*/
        return chart;
     
         });
    });
  
         //d3.time.scale().domain([0, dataToPlot.length]).range([0, w]);
    // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
  //  var y = d3.scale.linear().domain([d3.min(data), d3.max(data)]).range([h, 0]);
   
 //   t.select(".x.axis").call(xAxis);
  //  t.select('.path').attr("d", line(data));
  

  



}

