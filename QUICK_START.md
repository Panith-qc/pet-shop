# Quick Start Guide for GitHub Codespaces

## ⚡ 5-Minute Setup

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Setup Environment File
```bash
cp server/config/config.env.example server/config/config.env
```

### 3️⃣ Edit Configuration (MINIMUM REQUIRED)
```bash
nano server/config/config.env
```

**Minimum configuration to get started:**
```env
PORT=4000
MONGO_URI=mongodb+srv://your-connection-string
JWT_SECRET=any-long-random-string-here-min-32-chars
JWT_EXPIRE=7d
COOKIE_EXPIRE=5
NODE_ENV=development
```

### 4️⃣ Enable Database Connection
```bash
nano server/server.js
```
Uncomment line 12: Change `// connectDatabase();` to `connectDatabase();`

### 5️⃣ Run the App
```bash
npm run dev
```

### 6️⃣ Make Ports Public
- Go to **PORTS** tab in Codespaces
- Right-click ports 3000 and 4000
- Select **Port Visibility** → **Public**

### 7️⃣ Open Application
Click the 🌐 icon next to port 3000 to view your app!

---

## 🔑 Getting MongoDB Connection String

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up/Login (free tier is fine)
3. Create New Cluster (M0 Free tier)
4. Wait 3-5 minutes for cluster creation
5. Click "Connect" → "Connect your application"
6. Copy connection string
7. Replace `<password>` with your database password
8. Replace `<dbname>` with `ecommerce`

Example:
```
mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/ecommerce
```

---

## 🎨 Getting Cloudinary Credentials (Optional for testing)

1. Go to https://cloudinary.com
2. Sign up (free tier)
3. Go to Dashboard
4. Copy Cloud Name, API Key, API Secret
5. Add to config.env

**Skip this for initial testing** - you can add it later when you need image uploads.

---

## 🧪 Test Your Setup

### Test Backend:
```bash
curl http://localhost:4000
```
Should see: "Server is Running! 🚀"

### Test Frontend:
Open the Codespaces URL for port 3000 in your browser

---

## ⚠️ Common Issues

**"Cannot find module"**
```bash
rm -rf node_modules && npm install
```

**"Connection to MongoDB failed"**
- Check your MongoDB Atlas IP whitelist (add 0.0.0.0/0)
- Verify connection string is correct
- Ensure database user has read/write permissions

**"Port already in use"**
```bash
pkill -f node
npm run dev
```

**Bootstrap errors**
Edit `server/app.js` line 32 and comment out:
```javascript
// initAppBootstrap();
```

---

## 📱 Accessing Your App

Once running, Codespaces will provide URLs like:
- Frontend: `https://[codespace-name]-3000.app.github.dev`
- Backend: `https://[codespace-name]-4000.app.github.dev`

You can find these in the PORTS tab.

---

## 🚀 You're Ready!

Your full-stack e-commerce app is now running. Next steps:
- Test API endpoints with the extension "Thunder Client" or "REST Client"
- Create your first user via `/api/v1/register`
- Add products via admin routes
- Customize the React frontend

Happy coding! 🎉
