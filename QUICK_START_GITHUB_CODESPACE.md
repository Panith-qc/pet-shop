# Quick Start Guide for GitHub Codespace

This is a simplified installation guide specifically for GitHub Codespace environment.

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Environment Variables

```bash
# Copy the example config file
cp server/config/config.env.example server/config/config.env
```

### Step 3: Edit Configuration

Open `server/config/config.env` and update at minimum:

```env
# Required: MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Required: JWT Secret (generate a random string)
JWT_SECRET=your_random_secret_key_min_32_characters_long
JWT_EXPIRE=7d

# Required: Cloudinary (get free account at cloudinary.com)
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional: Email (can skip for testing)
SENDGRID_API_KEY=your_key_here

# Optional: Payment (can skip for testing)
PAYTM_MID=your_merchant_id
PAYTM_MERCHANT_KEY=your_merchant_key
```

**For Testing Only**: You can use placeholder values for optional services, but MongoDB and JWT_SECRET are required.

### Step 4: Enable Database Connection

Edit `server/server.js` and uncomment line 12:

```javascript
// Change from:
// connectDatabase();

// To:
connectDatabase();
```

### Step 5: Run the Application

```bash
npm run dev
```

This starts both frontend (port 3000) and backend (port 4001).

---

## 🔧 GitHub Codespace Specific Notes

### Port Forwarding

GitHub Codespace will automatically forward ports:
- Frontend: `http://localhost:3000` → Public URL provided by Codespace
- Backend: `http://localhost:4001` → Public URL provided by Codespace

### MongoDB Atlas Setup (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. **Important**: In Network Access, add IP `0.0.0.0/0` (allow all) OR add your Codespace IP
4. Create database user
5. Get connection string and update `MONGO_URI`

### Environment Variables in Codespace

You can also set environment variables in Codespace:
- Go to Codespace Settings → Secrets
- Add secrets there
- Access via `process.env.SECRET_NAME`

---

## ⚠️ Security Note

The file `server/utils/bootstrap.js` contains potentially unsafe code. For production:
- Comment out `initAppBootstrap()` in `server/app.js` line 32
- Or ensure `DEV_API_KEY`, `DEV_SECRET_KEY`, `DEV_SECRET_VALUE` are not set

---

## 🧪 Testing the Setup

1. **Backend Test**: Visit `http://localhost:4001` - should see "Server is Running! 🚀"
2. **Frontend Test**: Visit `http://localhost:3000` - should see the React app
3. **API Test**: Try `POST http://localhost:4001/api/v1/register` with user data

---

## 📝 Minimal Configuration for Testing

If you just want to test the application structure, you can use:

```env
PORT=4001
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/petshop_test
JWT_SECRET=test_secret_key_for_development_only_min_32_chars
JWT_EXPIRE=7d
COOKIE_EXPIRE=5
CLOUDINARY_NAME=test
CLOUDINARY_API_KEY=test
CLOUDINARY_API_SECRET=test
```

**Note**: This won't work for actual file uploads or email sending, but will let you test the API structure.

---

## 🐛 Common Issues in Codespace

1. **Port conflicts**: Codespace handles port forwarding automatically
2. **MongoDB connection**: Use MongoDB Atlas (cloud) - local MongoDB won't work in Codespace
3. **File permissions**: Usually not an issue in Codespace
4. **Node version**: Codespace comes with Node.js pre-installed

---

## ✅ Verification Checklist

- [ ] `npm install` completed successfully
- [ ] `server/config/config.env` file exists
- [ ] `MONGO_URI` is set correctly
- [ ] `JWT_SECRET` is set (32+ characters)
- [ ] Database connection enabled in `server.js`
- [ ] `npm run dev` starts without errors
- [ ] Frontend accessible at port 3000
- [ ] Backend accessible at port 4001

---

For detailed information, see `CODE_ANALYSIS_AND_INSTALLATION.md`
