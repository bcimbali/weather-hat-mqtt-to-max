const maxApi = require('max-api');
const mqtt = require('mqtt');

let client;

maxApi.addHandler('connect', () => {
  console.log('Top of connect addHandler');
  // Works fine & we can hardcode it for now:
  client = mqtt.connect('mqtt://raspberrypi.local:1883');

  client.on('connect', () => {
    console.log('Top of client.on connect');
    maxApi.outlet('connected');
  })
});

maxApi.addHandler('subscribe', () => {
  console.log('Top of subscribe handler');
  client.subscribe('weather');

  client.on('message', (topic, message) => {
    // Parse the MQTT message:
    const parsedMessage = JSON.parse(message?.toString());

    // Grab individual weather hat values:
    const temperature = parsedMessage?.temperature;
    const pressure = parsedMessage?.pressure;
    const humidity = parsedMessage?.humidity;
    const relativeHumidity = parsedMessage?.relative_humidity;
    const dewpoint = parsedMessage?.dewpoint;
    const light = parsedMessage?.light;
    const windspeed = parsedMessage?.windspeed;
    const windDirection = parsedMessage?.windDirection;
    
    // Send out to Max as a list of floating point numbers:
    maxApi.outlet(temperature, pressure, humidity, relativeHumidity, dewpoint, light, windspeed, windDirection );
  })
})