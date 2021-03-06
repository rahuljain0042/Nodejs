var initStackedBarChart = {
  draw: function(config) {
    xData =["PurchasingPower2010","PurchasingPower2013"];
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
      yScale.domain([0, 35000]);

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

      svg.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(0,0)")
      .call(yAxis); 

      var legend = svg.selectAll(".legend")
               .data(xData.slice())
               .enter().append("g")
               .attr("class", "legend")
               .attr("transform", function (d, i) { return "translate(-20," + i * 20 + ")"; });            legend.append("rect")
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
    "PurchasingPower2010": "784.28",
    "PurchasingPower2013": "931.3"
  },
  {
    "CountryName": "Australia",
    "PurchasingPower2010": "917.89",
    "PurchasingPower2013": "1053.23"
  },
  {
    "CountryName": "Brazil",
    "PurchasingPower2010": "2803.9",
    "PurchasingPower2013": "3218.2"
  },
  {
    "CountryName": "Canada",
    "PurchasingPower2010": "1355.51",
    "PurchasingPower2013": "1532.79"
  },
  {
    "CountryName": "China",
    "PurchasingPower2010": "12357.02",
    "PurchasingPower2013": "16585"
  },
  {
    "CountryName": "France",
    "PurchasingPower2010": "2340.16",
    "PurchasingPower2013": "25544.72"
  },
  {
    "CountryName": "Germany",
    "PurchasingPower2010": "3279.68",
    "PurchasingPower2013": "3630.15"
  },
  {
    "CountryName": "India",
    "PurchasingPower2010": "5370.62",
    "PurchasingPower2013": "6796.13"
  },
  {
    "CountryName": "Indonesia",
    "PurchasingPower2010": "2003.96",
    "PurchasingPower2013": "2516.06"
  },
  {
    "CountryName": "Italy",
    "PurchasingPower2010": "2077.42",
    "PurchasingPower2013": "2109.84"
  },
  {
    "CountryName": "Japan",
    "PurchasingPower2010": "4319.5",
    "PurchasingPower2013": "4694.85"
  },
  {
    "CountryName": "Mexico",
    "PurchasingPower2010": "1785.68",
    "PurchasingPower2013": "2069.84"
  },
  {
    "CountryName": "Russia",
    "PurchasingPower2010": "3031.01",
    "PurchasingPower2013": "3498.04"
  },
  {
    "CountryName": "Saudi Arabia",
    "PurchasingPower2010": "1217.78",
    "PurchasingPower2013": "1530.54"
  },
  {
    "CountryName": "South Africa",
    "PurchasingPower2010": "601.5",
    "PurchasingPower2013": "685.22"
  },
  {
    "CountryName": "Republic of Korea",
    "PurchasingPower2010": "1473.65",
    "PurchasingPower2013": "1698.88"
  },
  {
    "CountryName": "Turkey",
    "PurchasingPower2010": "1184.4",
    "PurchasingPower2013": "1448.17"
  },
  {
    "CountryName": "United Kingdom",
    "PurchasingPower2010": "2233.48",
    "PurchasingPower2013": "2454.23"
  },
  {
    "CountryName": "USA",
    "PurchasingPower2010": "14964.4",
    "PurchasingPower2013": "16663.15"
  }];
var key = ["PurchasingPower2010","PurchasingPower2013"];
initStackedBarChart.draw({
  data: data,
  key: key,
  element: 'stacked-bar'
});