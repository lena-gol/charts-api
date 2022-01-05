const sensorsByTypes = [
    {
        code: 'temp',
        name: 'Temperature',
        suffix: '°C',
        sensors: [
            {
                code: 'temp_sensor_1',
                name: 'Temperature Sensor 1'
            },
            {
                code: 'temp_sensor_2',
                name: 'Temperature Sensor 2'
            },
            {
                code: 'temp_sensor_3',
                name: 'Temperature Sensor 3'
            }
        ]
    },
    {
        code: 'humidity',
        name: 'Humidity',
        suffix: '%',
        sensors: [
            {
                code: 'humidity_sensor_1',
                name: 'Humidity Sensor 1'
            }
        ]
    },
    {
        code: 'light',
        name: 'Light',
        suffix: ' lux',
        sensors: [
            {
                code: 'light_sensor_1',
                name: 'Light Sensor 1'
            }
        ]
    }
];

const sensorsWithType = [];
sensorsByTypes.forEach(type => {
    type.sensors.forEach(sensor => {
        sensorsWithType.push({
            code: sensor.code,
            name: sensor.name,
            type: type.code
        })
    })
});

const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const getMinMax = (type) => {
    switch (type) {
        case 'light':
            return {
                min: 10,
                max: 300
            };
        case 'temp':
            return {
                min: 18,
                max: 25
            };
        case 'humidity':
            return {
                min: 30,
                max: 50
            };
        default:
            return {
                min: 0,
                max: 0
            };
    }
};

module.exports.getSensors = async (req, res) => {
    res.status(200).json(sensorsByTypes);
};

module.exports.getValues = async (req, res) => {
    const querySensors = req.query.sensors;

    if (querySensors) {
        const values = [];
        const dateTimeArray = [];
        const startDate = Date.parse(new Date(2021, 11, 20, 0));
        const endDate = Date.now();

        for (let dateTime = startDate; dateTime <= endDate; dateTime += 3600000) {
            dateTimeArray.push(dateTime);
        }

        querySensors.forEach((sensorCode) => {
            const sensor = sensorsWithType.find(sensor => sensor.code === sensorCode);

            if (!sensor) {
                return;
            }

            const minMax = getMinMax(sensor.type);

            values.push({
                code: sensorCode,
                values: dateTimeArray.map(dateTime => {
                    return [dateTime, getRandomValue(minMax.min, minMax.max)]
                })
            });
        });

        if (values.length > 0) {
            res.status(200).json({
                sensorsValues: values
            });
            return;
        }
    }
    res.status(404).send('Not found');
};
