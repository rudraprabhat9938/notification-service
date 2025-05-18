const Notification = require("../models/Notification");
const notificationDispatcher = require("../services/notificationDispatcher");

const allowedTypes = ["email", "sms", "in-app"];

// POST /notifications
exports.sendNotification = async (req, res) => {
  try {
    const { userId, type, message, recipientDetails } = req.body;

    if (!userId || !type || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: userId, type, message",
      });
    }

    if (!allowedTypes.includes(type.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: `Invalid notification type. Allowed types are: ${allowedTypes.join(
          ", "
        )}`,
      });
    }

    let notification = new Notification({
      userId,
      type: type.toLowerCase(),
      message,
      recipientDetails: recipientDetails || {},
      status: "pending",
    });
    await notification.save();
    console.log(
      `CONTROLLER: Saved pending notification ${notification._id} for user ${userId}`
    );

    const dispatchResult = await notificationDispatcher.dispatch({
      userId,
      type: type.toLowerCase(),
      message,
      recipientDetails,
    });

    notification.status = dispatchResult.status;
    notification.providerResponse = dispatchResult.providerResponse;
    await notification.save();
    console.log(
      `CONTROLLER: Updated notification ${notification._id} status to ${notification.status}`
    );

    if (dispatchResult.success) {
      return res.status(201).json({
        success: true,
        message: `Notification ${type} processed successfully.`,
        notification: {
          id: notification._id,
          userId: notification.userId,
          type: notification.type,
          message: notification.message,
          status: notification.status,
          timestamp: notification.timestamp,
          recipientDetails: notification.recipientDetails,
        },
      });
    } else {
      return res.status(500).json({
        success: false,
        error: `Notification ${type} processing failed.`,
        error_detail: dispatchResult.providerResponse,
        notification: {
          id: notification._id,
          userId: notification.userId,
          type: notification.type,
          status: notification.status,
          providerResponse: notification.providerResponse,
        },
      });
    }
  } catch (error) {
    console.error("CONTROLLER_ERROR SendNotification:", error);

    return res.status(500).json({
      success: false,
      error: "Server error while sending notification.",
      detail: error.message,
    });
  }
};

// GET /users/:id/notifications
exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "User ID is required in path." });
    }

    const notifications = await Notification.find({ userId: userId }).sort({
      timestamp: -1,
    });

    if (!notifications || notifications.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(
      notifications.map((n) => ({
        id: n._id,
        userId: n.userId,
        type: n.type,
        message: n.message,
        status: n.status,
        recipientDetails: n.recipientDetails,
        providerResponse: n.providerResponse,
        timestamp: n.timestamp,
      }))
    );
  } catch (error) {
    console.error("CONTROLLER_ERROR GetUserNotifications:", error);
    res.status(500).json({
      success: false,
      error: "Server error while fetching notifications.",
      detail: error.message,
    });
  }
};
