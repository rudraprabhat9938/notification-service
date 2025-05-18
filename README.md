# 🚀 Notification Service (Node.js · Express · MongoDB)

Send email, SMS, or in‑app pings and fetch a user’s history— all through a lean REST API.

---

## ✨ Why you’ll vibe with it

* **Plug‑and‑play API**
  `POST /notifications` · `GET /users/:id/notifications`
* **Three channels out‑of‑the‑box**
  Email · SMS · In‑App (providers are swappable)
* **MongoDB Atlas persistence**
  Every ping is saved with userId, type, message, status, timestamp & recipient details.
* **Clean architecture**
  Models · Controllers · Routes · Services · Providers — ready for prod upgrades.
* **.env powered**
  Keep secrets out of source.

---

## 🗂️ Folder map

```
notification_system_node/
├─ .env               # your secrets (git‑ignored)
├─ server.js          # boots Express
├─ config/db.js       # MongoDB connect
├─ models/Notification.js
├─ routes/api.js      # REST endpoints
├─ controllers/notificationController.js
├─ services/
│  ├─ notificationDispatcher.js
│  └─ providers/
│     ├─ emailProvider.js  # mocked
│     ├─ smsProvider.js    # mocked
│     └─ inAppProvider.js  # mocked
└─ package.json
```

---

## ⚡ Quick start (VS Code friendly)

1. **Clone / open** the folder in VS Code.
2. **Add `.env`**

   ```env
   MONGO_URI=mongodb+srv://rudraprabhat2847:2847@cluster-1.glny3ls.mongodb.net/notificationDB?retryWrites=true&w=majority&appName=Cluster-1
   PORT=3000
   ```
3. **Install & run**

   ```bash
   npm i       # install deps
   npm run dev # hot‑reload dev server
   # or npm start
   ```

   You should see `MongoDB Connected…`.

---

## 🔥 Hitting the API

### Send notification

```bash
curl -X POST http://localhost:3000/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"user001",
    "type":"email",
    "message":"Your report is ready.",
    "recipientDetails":{ "emailAddress":"user001@example.com" }
  }'
```

Swap `type` & `recipientDetails` for `sms` or `in-app`.

### Get user notifications

```bash
curl http://localhost:3000/users/user001/notifications
```

Returns newest‑first JSON array.

---

## 🐛 Common gotchas

| Issue                     | Fix                                                         |
| ------------------------- | ----------------------------------------------------------- |
| **Mongo auth / IP error** | Whitelist your IP in Atlas or allow `0.0.0.0/0` (dev only). |
| **Port 3000 busy**        | Change `PORT` in `.env`.                                    |
| **No real emails/SMS**    | Providers are mocked—check server logs.                     |

---

## 🖥️ Run‑it cheat‑sheet

| Environment    | Start dev (auto‑reload) | Start prod  |
| -------------- | ----------------------- | ----------- |
| **bash / zsh** | `npm run dev`           | `npm start` |
| **PowerShell** | `npm run dev`           | `npm start` |

> **Note:** In PowerShell, `curl` is an alias for `Invoke-WebRequest`. Either use the full cmdlet or stick to the bash‑style examples inside Git Bash/WSL.

---

## 🛠️ Debug like a pro

Set breakpoints in VS Code → Run & Debug → fire a request → inspect variables in real time. Works out-of-the-box.

---

**Now ship it.** ✌️
