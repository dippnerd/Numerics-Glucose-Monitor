# Numerics Glucose Monitor
Apple Watch complication for monitoring your partner's glucose levels.

While Dexcom provides easy glucose monitoring for diabetics, wouldn't it be nice for your partner to be able to monitor your levels too? While apps like [Sugarmate](https://sugarmate.io) exist, support for Apple Watch can be lacking. This intends to fill that void.

This project is built using Node.JS and is intended to be run as an [AWS Lambda](https://aws.amazon.com/lambda/) service. Just follow the tutorial on setting up a free AWS Lambda service and paste this code in to get up and running. You will need your JSON feed from Sugarmate, which looks something like this: https://sugarmate.io/api/v1/XXXXXX/latest.json

In that URL, the section marked in XXXXXX contains a key unique to your instance. Provide this key to your Lambda URL to fetch the newly formatted JSON using the parameter "key" with the value of your key (like key=XXXXXX). 

If you're getting valid JSON data back, you're ready to enter this into the [Numerics app](https://cynapse.com/numerics/). Numerics lets you take JSON feeds such as this one (under the service "Custom JSON") and display the data in a fancy chart on your phone, tablet or watch. 

This particular script was built around the Numerics Advanced Widget "Gauge chart from JSON data" and will provide a range to monitor your glucose levels in. You can then use this widget as a complication on the Apple Watch, for instance, for a quick, glanceable look at your (or your partners) glucose levels. It will provide trend arrows for "double up", "single up", "forty five up", "flat", "forty five down", "single down" or "double down", as well as colors to coordinate with these values. 
