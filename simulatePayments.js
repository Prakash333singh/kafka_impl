const kafka = require("kafka-node");
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });

const producer = new Producer(client);

producer.on("ready", () => {
  const paymentEvent = JSON.stringify({
    orderId: "order-1",
    status: "success",
    price: 100,
    itemId: "item-1",
  });
});

const payloads = [{ topic: "payments", messages: paymentEvent }];

producer.send(payloads, (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});

producer.on("error", (err) => {
  console.log(err);
});
