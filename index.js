const http = require('https');

exports.handler = (event, context, callback) => {
    var key = event['queryStringParameters']['key'];
    var url = "https://sugarmate.io/api/v1/" + key + "/latest.json";
    var chart = event['queryStringParameters']['chart'];
    if (!chart) {
        chart = "difference";
    }

    getUrl(url, function (result, error) {
      if (error) {
           console.log(error);
      } else {
          var data = "";
          switch(chart.toUpperCase()) {
              case "GAUGE":
                data = getGaugeData(result["result"]);
                break;
              default:
                data = getCountDifferenceData(result["result"]);
          }
          
          callback(null, { 
              statusCode: 200, 
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data) 
          });
      }
    });
};

var getUrl = function (url, callback) {
    var req = http.get(url, (res) => {
        var body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            var result = JSON.parse(body);
            callback({ result });
        });
    }).on("error", (error) => {
        console.log(error);
    });
};

function getCountDifferenceData(result) {
    var trend_symbol = result["trend_symbol"];
    var trend_words = result["trend_words"];
    var value = result["value"];
    var delta = result["delta"];
    var previousValue = (delta - (delta * 2)) + value;

    var data = {
        postfix: trend_symbol,
        color: getColor(trend_words),
        data: [{
            value: value
        },{
            value: previousValue
        }]
    }
    return data;
}

function getGaugeData(result) {
    var trend_symbol = result["trend_symbol"];
    var trend_words = result["trend_words"];
    var value = result["value"];

    var data = {
        postfix: trend_symbol,
        color: getColor(trend_words),
        data: {
            minValue: 80,
            value: value,
            maxValue: 120
        }
    }
    return data;
}

function getColor(value) {
    switch(value.toUpperCase()) {
        case "FORTY_FIVE_UP":
        case "FORTY_FIVE_DOWN":
            return "yellow";
        case "SINGLE_UP":
        case "SINGLE_DOWN":
            return "orange";
        case "DOUBLE_UP":
        case "DOUBLE_DOWN":
            return "red";  
        default:
            return "white";
    }
}
