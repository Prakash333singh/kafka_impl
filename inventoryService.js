const consumer = require("./kafkaConsumer");
const PaymentEvent = require("./paymentEvent");

//simluate inventory storage

const inventory = {
  "item-1": 100,
  "item-2": 200,
};

const updateInventory = (paymentEvent) => {
  const quantityToReduce = 1;
  const item = paymentEvent.itemId;

  if (inventory[item] && PaymentEvent.status === "success") {
    inventory[item] -= quantityToReduce;
  } else if (inventory[item] && PaymentEvent.status !== "success") {
    console.log("payment failed.inventory not updated");
  }
};

consumer.on("message", (message) => {
  try {
    const paymentEvent = JSON.parse(message.value);
    updateInventory(paymentEvent);
  } catch (err) {
    console.log("error processing message", err);
  }
});

consumer.on("error", (err) => {
  console.log("error", err);
});
