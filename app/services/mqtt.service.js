const mqtt = require('mqtt');
const adafruitConfig = require('../utils/adafruit.config')

class MQTTService {
    static init() {
        try {
            let client = mqtt.connect(`mqtts://${adafruitConfig.username}:${adafruitConfig.key}@io.adafruit.com`);
            client.on('connect', () => console.log('connected to adafruit'));
            this.client = client;
        } catch(err) {
            console.error(`error connection : ${err}`);
        }
    }
    static publishData(topic, data) {
        this.client.subscribe(topic, (err) => {
            if(!err) {
                this.client.publish(topic, JSON.stringify(data));
            } else {
                console.error(err);
            }
        })
    }
}

module.exports = MQTTService