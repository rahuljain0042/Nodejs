var initStackedBarChart = {
  draw: function(config) {
    xData =["Population2010","Population2013"];
    me = this,
    domEle = config.element,
    stackKey = config.key,
    data = config.data,
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    //parseCountryName = d3.timeParse("%m/%Y")
    width = 960- margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    xScale = d3.scaleBand().range([0, width]).padding(0.1),
    yScale = d3.scaleLinear().range([height, 0]),
    color = d3.scaleOrdinal(d3.schemeCategory20b),
    //xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")),
    xAxis = d3.axisBottom(xScale),
    yAxis =  d3.axisLeft(yScale),
    svg = d3.select("#"+domEle).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var stack = d3.stack()
      .keys(stackKey)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);
  
    var layers= stack(data);
      //data.sort(function(a, b) { return b.total - a.total; });
      xScale.domain(data.map(function(d) {return d.CountryName; }));
      yScale.domain([0, 3000]);

    var layer = svg.selectAll(".layer")
      .data(layers)
      .enter().append("g")
      .attr("class", "layer")
      .style("fill", function(d, i) { return color(i); });

      layer.selectAll("rect")
        .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return xScale((d.data.CountryName)); })
        .attr("y", function(d) { return yScale(d[1]); })
        .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); })
        .attr("width", xScale.bandwidth());




    svg.append("g")

     .attr("class", "x axis")
               .attr("transform", "translate(0," + height + ")")
               .call(xAxis)
               .selectAll("text")
               .style("text-anchor", "end")
               .attr("dx", "-1.8em")
               .attr("dy", "-.5em")
               .attr("transform", "rotate(-90)");
//       .attr("class", "axis axis--x")
//       .attr("transform", "translate(0," + (height+5) +")")
//       .call(xAxis)
// .attr("transform","rotate(-90)");
    
      svg.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(0,0)")
      .call(yAxis); 

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
  }
}
var data = [
{
    "CountryName": "Argentina",
    "Population2010": "40.79",
    "Population2013": "42.2"
  },
  {
    "CountryName": "Australia",
    "Population2010": "22.17",
    "Population2013": "23.3"
  },
  {
    "CountryName": "Brazil",
    "Population2010": "195.5",
    "Population2013": "201.03"
  },
  {
    "CountryName": "Canada",
    "Population2010": "33.96",
    "Population2013": "35.11"
  },
  {
    "CountryName": "China",
    "Population2010": "1340.91",
    "Population2013": "1360.72"
  },
  {
    "CountryName": "France",
    "Population2010": "62.77",
    "Population2013": "63.65"
  },
  {
    "CountryName": "Germany",
    "Population2010": "81.75",
    "Population2013": "80.77"
  },
  {
    "CountryName": "India",
    "Population2010": "1195.06",
    "Population2013": "1259.35"
  },
  {
    "CountryName": "Indonesia",
    "Population2010": "237.64",
    "Population2013": "248.82"
  },
  {
    "CountryName": "Italy",
    "Population2010": "59.19",
    "Population2013": "59.69"
  },
  {
    "CountryName": "Japan",
    "Population2010": "128.05",
    "Population2013": "127.34"
  },
  {
    "CountryName": "Mexico",
    "Population2010": "114.29",
    "Population2013": "118.4"
  },
  {
    "CountryName": "Russia",
    "Population2010": "142.9",
    "Population2013": "143.7"
  },
  {
    "CountryName": "Saudi Arabia",
    "Population2010": "27.56",
    "Population2013": "29.99"
  },
  {
    "CountryName": "South Africa",
    "Population2010": "50.79",
    "Population2013": "53.16"
  },
  {
    "CountryName": "Republic of Korea",
    "Population2010": "49.41",
    "Population2013": "50.22"
  },
  {
    "CountryName": "Turkey",
    "Population2010": "73.14",
    "Population2013": "76.06"
  },
  {
    "CountryName": "United Kingdom",
    "Population2010": "62.26",
    "Population2013": "64.09"
  },
  {
    "CountryName": "USA",
    "Population2010": "309.76",
    "Population2013": "316.74"
  }];
var key = ["Population2010","Population2013"];
initStackedBarChart.draw({
  data: data,
  key: key,
  element: 'stacked-bar'
});