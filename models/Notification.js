// notification_system_node/models/Notification.js
const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User ID is required"],
    index: true,
  },
  type: {
    type: String,
    required: [true, "Notification type is required"],
    enum: ["email", "sms", "in-app"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  recipientDetails: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  status: {
    type: String,
    enum: ["pending", "sent", "failed", "error"],
    default: "pending",
  },
  providerResponse: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", NotificationSchema);
