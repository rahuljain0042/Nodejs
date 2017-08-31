var data = [];
var data_one = [];
var data_two = []
var fs = require('fs');
//var count = 0

var lineReader = require('readline').createInterface({
    input: fs.createReadStream('Table_1.3.csv')
});
//createing stream for line by line data reading
var myWriteStream = fs.createWriteStream("bypurchasingpower.json")
var myWriteStream_one = fs.createWriteStream("byGDP.json")
var myWriteStream_two = fs.createWriteStream("bypopulation.json")
lineReader.on('line', function(line) {
    var jsonFromLine = {};

    // Get first row for column headers

    // this is my conditional. Set line 2
    var lineSplit = line.split(',');

    // select columns you want
    jsonFromLine.CountryName = lineSplit[0];
    jsonFromLine.PurchasingPower = lineSplit[23];
    // ...  
    //eliminating European Union and World
    if (jsonFromLine.CountryName == 'European Union' || jsonFromLine.CountryName == 'World') {

    } else {

        data.push(jsonFromLine);
        //sorting the data in ascending order
        data.sort(function(a, b) {
            return b.PurchasingPower - a.PurchasingPower;
        });
    }
});

lineReader.on('close', function(line) {
    //removing the header
    var header = data.shift();
    console.log(data); // list data
    myWriteStream.write(JSON.stringify(data, null, 2));//writing data from stream to a json file
});

//------------------------byGDP-----------------------


lineReader.on('line', function(line) {
    var jsonFromLine_one = {};

    // Get first row for column headers

    // this is my conditional. Set line 2
    var lineSplit = line.split(',');

    // select columns you want
    jsonFromLine_one.CountryName = lineSplit[0];
    jsonFromLine_one.GDP2013Billions = lineSplit[11];
    // ...  

    if (jsonFromLine_one.CountryName == 'European Union' || jsonFromLine_one.CountryName == 'World') {

    } else {

        data_one.push(jsonFromLine_one);

        data_one.sort(function(a, b) {
            return b.GDP2013Billions - a.GDP2013Billions;

        });
    }
});

lineReader.on('close', function(line) {
    //removing the header
    var header = data_one.shift();
    console.log(data_one); // list data
    myWriteStream_one.write(JSON.stringify(data_one, null, 2));
});

//---------------------------------------bypopulation-------

lineReader.on('line', function(line) {
    var jsonFromLine_two = {};

    // Get first row for column headers

    // this is my conditional. Set line 2
    var lineSplit = line.split(',');

    // select columns you want
    jsonFromLine_two.CountryName = lineSplit[0];
    jsonFromLine_two.Population2013 = lineSplit[5];
  
    if (jsonFromLine_two.CountryName == 'European Union' || jsonFromLine_two.CountryName == 'World') {

    } else {

        data_two.push(jsonFromLine_two);

        data_two.sort(function(a, b) {
            return b.Population2013 - a.Population2013;

        });
    }
});

lineReader.on('close', function(line) {
    //removing the header
    var header = data_two.shift();
    console.log(data_two); // list data
    myWriteStream_two.write(JSON.stringify(data_two, null, 2));
});