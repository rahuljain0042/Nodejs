var data = [];
var fs = require('fs');
var continents =['Australia','SouthAmerica','Europe','Asia','Africa','NorthAmerica']
count=[0,0,0,0,0,0];
count_one=[0,0,0,0,0,0];
var lineReader = require('readline').createInterface({
    input:fs.createReadStream('Table_1.3.csv')
});
var myWriteStream = fs.createWriteStream("continents.json")
lineReader.on('line',function(line) {
    var lineByLine ={};
    var lineSplit = line.split(',');
     lineByLine.CountryName = lineSplit[0];
     if(lineByLine.CountryName == 'Australia'){
        count[0]+= parseFloat(lineSplit[5])
        count_one[0]+= parseFloat(lineSplit[11])
     }
     else if (lineByLine.CountryName=='Argentina' || lineByLine.CountryName=='Brazil'|| lineByLine.CountryName=='Mexico'){
        count[1]+=parseFloat(lineSplit[5])
        count_one[1]+= parseFloat(lineSplit[11])
    }
    else if (lineByLine.CountryName=='France' || lineByLine.CountryName=='Germany'|| lineByLine.CountryName=='Italy' || lineByLine.CountryName=='United Kingdom'){
     count[2]+= parseFloat(lineSplit[5])
     count_one[2]+= parseFloat(lineSplit[11])
    }

    else if (lineByLine.CountryName=='India' || lineByLine.CountryName=='China'|| lineByLine.CountryName=='Indonesia' || lineByLine.CountryName=='Japan' || lineByLine.CountryName=='Saudi Arabia' || lineByLine.CountryName=='Republic of Korea'|| lineByLine.CountryName=='Russia'){
     count[3]+= parseFloat(lineSplit[5])
     count_one[3]+= parseFloat(lineSplit[11])
    }
    else if (lineByLine.CountryName=='South Africa'){
     count[4]+= parseFloat(lineSplit[5])
     count_one[4]+= parseFloat(lineSplit[11])
    }
    else if (lineByLine.CountryName=='USA' || lineByLine.CountryName=='Canada'){
     count[5]+= parseFloat(lineSplit[5])
     count_one[5]+= parseFloat(lineSplit[11])
    }
    })

lineReader.on('close',(line) => {
    for(let i=0;i<6;i++)
    {
        var obj = {
            continent: continents[i],
            population: count[i],
            GDP       : count_one[i]
        }
        data.push(obj)
    }
    myWriteStream.write(JSON.stringify(data, null, 2));
})


