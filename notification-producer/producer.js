import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: [''],
    sasl: {
      mechanism: 'scram-sha-256',
      username: '',
      password: '',
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: 'notifcations.send-notifcation',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitacao de amizade',
          category: 'social',
          recipientId: randomUUID(),
        }),
      },
    ],
  });
}
