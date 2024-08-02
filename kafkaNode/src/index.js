const Kafka = require('node-rdkafka');
const Producersvc = require('./servicios');

// manejo  local 
// const produceObj = {
//   'bootstrap.servers': 'localhost:9092',
//   'acks': 'all',
//   'dr_msg_cb': true,
// };

// con la conexion pedida
const produceObj = {
  'bootstrap.servers': 'pkc-56d1g.eastus.azure.confluent.cloud:9092',
  'sasl.username': 'HENE2IJFQHNPTFX3',
  'sasl.password': 'roP7W1nBpUDbuzY84bze031i603Vcy1TvnXZADssjxE905Y35YfDxEvnHSmO38mg',
  'security.protocol': 'SASL_SSL',
  'sasl.mechanisms': 'PLAIN',
  'acks': 'all',
  'dr_msg_cb': true
};

const users = Producersvc.generateRandomUsers(6);
const items = Producersvc.generateRandomItems(6);

class ProducerService {
  constructor(config) {
    this.config = config;
    this.producer = new Kafka.Producer(this.config);
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.producer.connect();
      this.producer.on('ready', () => {
        resolve();
      });
      this.producer.on('event.error', (err) => {
        console.error('Error de producer', err);
        reject(err);
      });
    });
  }

  produce(topic, key, value) {
    return new Promise(() => {
      this.producer.produce(
        topic,
        null, 
        Buffer.from(value),
        Buffer.from(key),
        Date.now(),
      );
      console.log(`se produjo el  mensaje: topic = ${topic}, key = ${key}, value = ${value}`);

    });
  }

  disconnect() {
    return new Promise((resolve) => {
      this.producer.disconnect(() => {
        console.log('Producer desconectado');
        resolve();
      });
    });
  }
}

async function produceMessages() {
  const generadorkry = new Producersvc();
  const producerService = new ProducerService(produceObj);

  try {
    await producerService.connect();
    for (let i = 0; i < 10; i++) {
      const key = String(generadorkry.generarKey());
      const value = Producersvc.generateRandomValue(users, items);
      await producerService.produce('Purchases', key, value);
    }
  } catch (err) {
    console.error('Error inicializando producer', err);
  } finally {
    await producerService.disconnect();
  }
}

for (let index = 0; index < 10; index++) {
  produceMessages();
}