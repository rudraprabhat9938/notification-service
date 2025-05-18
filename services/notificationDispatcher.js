// notification_system_node/services/notificationDispatcher.js
const Notification = require("../models/Notification");
const emailProvider = require("./providers/emailProvider");
const smsProvider = require("./providers/smsProvider");
const inAppProvider = require("./providers/inAppProvider");

const providers = {
  email: emailProvider,
  sms: smsProvider,
  "in-app": inAppProvider,
};

class NotificationDispatcher {
  async dispatch(notificationData) {
    const { userId, type, message, recipientDetails } = notificationData;

    const provider = providers[type.toLowerCase()];
    if (!provider) {
      console.error(`DISPATCHER: No provider found for type: ${type}`);
      // Optionally create a notification record with status 'failed' or 'error' here
      // For now, we'll let the controller handle the direct error if provider is unknown
      // before even creating a DB record for an invalid type.
      // However, if we save first, then this logic changes.
      // Let's assume the controller validates the type before calling dispatch
      // and that dispatch is called AFTER a 'pending' record is made.
      return {
        success: false,
        error: `Unsupported notification type: ${type}`,
        status: "error", // This status would be for the notification record
      };
    }

    // In a more robust system, you might save the notification to DB with 'pending' status first,
    // then attempt to send, then update status.
    // For this example, we'll do it slightly differently in the controller.

    try {
      console.log(
        `DISPATCHER: Attempting to send ${type} notification for user ${userId}`
      );
      const result = await provider.send(userId, message, recipientDetails);

      if (result.success) {
        console.log(
          `DISPATCHER: Provider ${type} reported success for user ${userId}.`
        );
        return {
          success: true,
          status: "sent",
          providerResponse: result.details || "Successfully sent",
        };
      } else {
        console.error(
          `DISPATCHER: Provider ${type} reported failure for user ${userId}: ${result.error}`
        );
        return {
          success: false,
          status: "failed",
          providerResponse: result.error || "Provider failed to send",
        };
      }
    } catch (error) {
      console.error(
        `DISPATCHER: Critical error sending ${type} notification for user ${userId}:`,
        error
      );
      return {
        success: false,
        status: "error",
        providerResponse: error.message || "Internal dispatcher error",
      };
    }
  }
}

module.exports = new NotificationDispatcher();
