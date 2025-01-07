# WeatherHat MQTT to Max

This is a small repo to gather weather data that's transmitted over MQTT. Once we have the data, we send it to a Max for Live (Max/Msp) outlet as an array of floating point numbers.

### To use:
1. Clone the repo.
2. Run an `npm install`.
3. Copy the filepath that routes to your `weather-hat-mqtt-to-max/index.js`.
4. Open Max for Max for Live (Max/Msp) and create a `node.script` object.
5. Paste the filepath right after the "node.script" line on your object.
6. Run a message box into the `node.script` object inlet that says `script start`.
7. Run a message box into the `node.script` object inlet that says `connect`.
8. Run a message box into the `node.script` object inlet that says `subscribe`.
9. Now, press each of the message boxes in the order we just created them 
- "script start"
- "connect"
- "subscribe"
10. You should now see data coming thru from the bottom-left outlet on your `node.script` object. 
11. If you want to clean up how the data looks, add an `unpack f f f f f f f f` Max object and connect individual message boxes to separate out the individual values (e.g. "temperature", "Humidity", etc.).
