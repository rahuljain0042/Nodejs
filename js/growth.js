var data = [];

var fs = require('fs');
//var count = 0

var lineReader = require('readline').createInterface({
    input: fs.createReadStream('Table_1.3.csv')
});

var myWriteStream = fs.createWriteStream("growth_purchasing.json")
// var myWriteStream_one = fs.createWriteStream("byGDP.json")
// var myWriteStream_two = fs.createWriteStream("bypopulation.json")
lineReader.on('line', function(line) {
    var lineByLine = {};

    // Get first row for column headers

    // this is my conditional. Set line 2
    var lineSplit = line.split(',');

    // select columns you want
    lineByLine.CountryName = lineSplit[0];
    //lineByLine.Population2010 = lineSplit[2];
    //lineByLine.Population2013 = lineSplit[5];
    // lineByLine.Population2011 = lineSplit[3];
    // lineByLine.Population2012 = lineSplit[4];
    // lineByLine.Population2013 = lineSplit[5];
     lineByLine.PurchasingPower2010 =lineSplit[20];
    lineByLine.PurchasingPower2013 = lineSplit[23];
    // lineByLine.PurchasingPower2012 = lineSplit[22];
    //lineByLine.PurchasingPower2013 = lineSplit[23];
    // ...  



    if (lineByLine.CountryName == 'European Union' || lineByLine.CountryName == 'World') {

    } else {

        data.push(lineByLine);

        // data.sort(function(a, b) {
        //     return b.PurchasingPower - a.PurchasingPower;

        //});


    }
});



lineReader.on('close', function(line) {
    //removing the header
    var header = data.shift();
    console.log(data); // list data
    myWriteStream.write(JSON.stringify(data, null, 2));
});