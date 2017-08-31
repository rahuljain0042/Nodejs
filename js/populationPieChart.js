var svg = d3.select("svg"),
   width = +svg.attr("width"),
   height = +svg.attr("height"),
   radius = Math.min(width, height) / 2,
   g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(["#5FECEC","#CEEC5F", "#D571DC", "#DC3D69", "#132AE5", "#ff8c00"]);

var pie = d3.pie()
   .sort(null)
   .value(function(d) { return d.population; });

var path = d3.arc()
   .outerRadius(radius - 10)
   .innerRadius(0);

var label = d3.arc()
   .outerRadius(radius - 40)
   .innerRadius(radius - 40);



d3.json("../json/continents.json", function(error, data) {
 if (error) throw error;
xData =['Australia','SouthAmerica','Europe','Asia','Africa','NorthAmerica'];
 var arc = g.selectAll(".arc")
   .data(pie(data))
   .enter().append("g")
     .attr("class", "arc");

 arc.append("path")
     .attr("d", path)
     .attr("fill", function(d) { return color(d.data.continent); });

 arc.append("text")
     .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
     .attr("dy", "0.35em")
     .text(function(d) { return d.data.continent; });

     var legend = svg.selectAll(".legend")
               .data(xData.slice())
               .enter().append("g")
               .attr("class", "legend")
               .attr("transform", function (d, i) { return "translate(-20," + i * 20 + ")"; });           
               legend.append("rect")
               .attr("x", width - 18)
               .attr("width", 18)
               .attr("height", 18);            
               legend.select("rect").style("fill", function (d, i) {
                   return color(i);
               });            
               legend.append("text")
               .attr("x", width - 24)
               .attr("y", 9)
               .attr("dy", ".35em")
               .style("text-anchor", "end")
               .text(function (d) { return d; });    
});