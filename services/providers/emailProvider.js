// notification_system_node/services/providers/emailProvider.js
class EmailProvider {
  async send(userId, message, recipientDetails) {
    if (!recipientDetails || !recipientDetails.emailAddress) {
      console.error(`EMAIL_PROVIDER: Missing emailAddress for user ${userId}`);
      return { success: false, error: "Missing emailAddress" };
    }
    const { emailAddress } = recipientDetails;
    // Simulate sending email
    console.log(
      `SIMULATING: Sending EMAIL to ${emailAddress} (User: ${userId})`
    );
    console.log(`  Subject: New Notification`);
    console.log(`  Body: ${message}`);
    // In a real app, integrate with an email service (Nodemailer, SendGrid, AWS SES)
    // For simulation, assume success
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
    console.log(
      `SUCCESS (EmailProvider): Email mock-sent to ${emailAddress} for user ${userId}.`
    );
    return { success: true, details: `Email sent to ${emailAddress}` };
  }
}

module.exports = new EmailProvider();
