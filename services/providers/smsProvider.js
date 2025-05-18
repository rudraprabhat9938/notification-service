// notification_system_node/services/providers/smsProvider.js
class SMSProvider {
  async send(userId, message, recipientDetails) {
    if (!recipientDetails || !recipientDetails.phoneNumber) {
      console.error(`SMS_PROVIDER: Missing phoneNumber for user ${userId}`);
      return { success: false, error: "Missing phoneNumber" };
    }
    const { phoneNumber } = recipientDetails;
    // Simulate sending SMS
    console.log(`SIMULATING: Sending SMS to ${phoneNumber} (User: ${userId})`);
    console.log(`  Message: ${message}`);
    // In a real app, integrate with an SMS gateway (Twilio, Vonage)
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
    console.log(
      `SUCCESS (SMSProvider): SMS mock-sent to ${phoneNumber} for user ${userId}.`
    );
    return { success: true, details: `SMS sent to ${phoneNumber}` };
  }
}

module.exports = new SMSProvider();
