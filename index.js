const maxApi = require("max-api");
const mqtt = require("mqtt");

let client;

maxApi.addHandler("connect", () => {
  console.log("Top of connect addHandler");
  // Works fine & we can hardcode it for now:
  client = mqtt.connect("mqtt://raspberrypi.local:1883");

  client.on("connect", () => {
    console.log("Top of client.on connect");
    maxApi.outlet("connected");
  });
});

maxApi.addHandler("subscribe", () => {
  console.log("Top of subscribe handler");
  client.subscribe("weather");

  client.on("message", (topic, message) => {
    // Parse the MQTT message:
    const parsedMessage = JSON.parse(message?.toString());

    // Temperature:
    const tempToString = parsedMessage?.temperature?.toString();
    const lastIdxOfTemp = parseInt(tempToString?.slice(-1));
    const secondToLastIdxofTemp = parseInt(
      tempToString?.[tempToString?.length - 2]
    );

    // Pressure:
    const pressureToString = parsedMessage?.pressure?.toString();
    const lastIdxOfPressue = parseInt(pressureToString?.slice(-1));
    const secondToLastIdxofPressure = parseInt(
      pressureToString?.[pressureToString?.length - 2]
    );

    // Humidity:
    const humidityToString = parsedMessage?.humidity?.toString();
    const lastIdxOfHumidity = parseInt(humidityToString?.slice(-1));
    const secondToLastIdxofHumidity = parseInt(
      humidityToString?.[humidityToString?.length - 2]
    );
    const thirdToLastIdxofHumidity = parseInt(
      humidityToString?.[humidityToString?.length - 3]
    );

    // console.log('In index.js, this is parsedMessage: ', parsedMessage);

    // Grab individual weather hat values:
    const temperature = parsedMessage?.temperature;
    const pressure = parsedMessage?.pressure;
    const humidity = parsedMessage?.humidity;
    const relativeHumidity = parsedMessage?.relative_humidity;
    const dewpoint = parsedMessage?.dewpoint;
    const light = parsedMessage?.light;
    const windspeed = parsedMessage?.wind_speed;
    const windDirection = parsedMessage?.wind_direction;

    // Send out to Max as a list of floating point numbers:
    maxApi.outlet(
      temperature,
      pressure,
      humidity,
      relativeHumidity,
      dewpoint,
      light,
      windspeed,
      lastIdxOfTemp,
      secondToLastIdxofTemp,
      lastIdxOfPressue,
      secondToLastIdxofPressure,
      lastIdxOfHumidity,
      secondToLastIdxofHumidity,
      thirdToLastIdxofHumidity
    );
  });
});
