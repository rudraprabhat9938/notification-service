// notification_system_node/services/providers/inAppProvider.js
class InAppProvider {
  async send(userId, message, recipientDetails) {
    // Simulate sending in-app notification
    // This might involve WebSockets, push notifications, or writing to a user-specific queue.
    console.log(
      `SIMULATING: Sending IN-APP notification to User ID: ${userId}`
    );
    console.log(`  Message: ${message}`);
    if (recipientDetails && Object.keys(recipientDetails).length > 0) {
      console.log(`  Recipient Details: ${JSON.stringify(recipientDetails)}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
    console.log(
      `SUCCESS (InAppProvider): In-app notification mock-sent for user ${userId}.`
    );
    return { success: true, details: `In-app notification for user ${userId}` };
  }
}

module.exports = new InAppProvider();
