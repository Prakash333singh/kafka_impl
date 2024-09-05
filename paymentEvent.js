class PaymentEvent {
  constructor(orderId, status, amount, itemId) {
    this.orderId = orderId;
    this.status = status;
    this.amouht = amount;
    this.itemId = itemId;
  }
}

module.exports = PaymentEvent;
