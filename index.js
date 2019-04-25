const http = require('https');

exports.handler = (event, context, callback) => {
    var key = event['queryStringParameters']['key'];
    var url = "https://sugarmate.io/api/v1/" + key + "/latest.json";

    getUrl(url, function (result, error) {
      if (error) {
           console.log(error);
      } else {
          callback(null, { 
              statusCode: 200, 
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(result["data"]) 
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
            var data = getData(result);
            callback({ data });
        });
    }).on("error", (error) => {
        console.log(error);
    });
};

function getData(result) {
    var trend_symbol = result["trend_symbol"];
    var trend_words = result["trend_words"];
    var value = result["value"];

    var data = {
        postfix: trend_symbol,
        color: getColor(trend_words),
        data: {
            minValue: 55,
            value: value,
            maxValue: 145
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
