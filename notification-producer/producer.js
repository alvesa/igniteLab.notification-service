import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['localhost:9092'],
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: 'notification.send-notification',
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

  await producer.disconnect();
}

bootstrap()
  .then((x) => {
    console.log(x);
    console.log('test');
  })
  .catch((err) => console.log(err));
