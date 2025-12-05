# 🚀 Deployment Steps for RealShop

Your code is now on GitHub: https://github.com/siddhant14g/Real-shop

## Step 1: Deploy Backend to Render

1. **Go to Render**
   - Visit: https://render.com
   - Sign up/Login with GitHub

2. **Create New Web Service**
   - Click "New +" button (top right)
   - Select "Web Service"
   - Click "Connect GitHub"
   - Authorize Render to access your repositories
   - Select repository: `siddhant14g/Real-shop`

3. **Configure Service**
   - **Name**: `realshop-backend` (or any name you like)
   - **Region**: Choose closest to you (e.g., Singapore, US)
   - **Branch**: `main`
   - **Root Directory**: `backend` ⚠️ **IMPORTANT**
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add these:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
   ⚠️ **Note**: Leave `FRONTEND_URL` empty for now, we'll update it after frontend deployment

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - **Copy your backend URL** (e.g., `https://realshop-backend.onrender.com`)
   - ⚠️ **Save this URL** - you'll need it for frontend!

---

## Step 2: Deploy Frontend to Vercel

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign up/Login with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import Git Repository
   - Select: `siddhant14g/Real-shop`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `frontend` ⚠️ **IMPORTANT** - Click "Edit" and set to `frontend`
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add new variable:
     - **Key**: `VITE_API_BASE_URL`
     - **Value**: `https://your-backend-url.onrender.com/api`
     - ⚠️ Replace `your-backend-url` with your actual Render backend URL from Step 1
   - Click "Save"

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-3 minutes)
   - **Copy your frontend URL** (e.g., `https://real-shop.vercel.app`)

---

## Step 3: Update Backend CORS

1. **Go back to Render Dashboard**
   - Open your backend service
   - Go to "Environment" tab
   - Find `FRONTEND_URL` variable
   - Update value to your Vercel frontend URL (e.g., `https://real-shop.vercel.app`)
   - Click "Save Changes"
   - Render will auto-redeploy

---

## Step 4: Update Frontend API URL (if needed)

If your frontend still shows localhost, you may need to update the API file:

1. **In your local code**, edit `frontend/src/utils/api.js`
2. **Find this line**:
   ```javascript
   return "https://your-backend-url.onrender.com/api";
   ```
3. **Replace** `your-backend-url` with your actual Render backend URL
4. **Commit and push**:
   ```bash
   git add frontend/src/utils/api.js
   git commit -m "Update API URL for production"
   git push origin main
   ```
5. Vercel will auto-deploy the update

---

## ✅ Verify Deployment

1. **Test Backend**
   - Visit: `https://your-backend.onrender.com`
   - Should see: "🛒 RealShop E-commerce Backend Running"

2. **Test Frontend**
   - Visit: `https://your-frontend.vercel.app`
   - Try registering a new user
   - Try logging in

3. **Test Full Flow**
   - Login as admin
   - Add a product
   - Upload an image
   - Place an order

---

## 🐛 Troubleshooting

### Backend Issues

**"Application Error"**
- Check Render logs: Go to your service → "Logs" tab
- Verify all environment variables are set correctly
- Check MongoDB connection string is correct

**CORS Errors**
- Make sure `FRONTEND_URL` in Render matches your Vercel URL exactly
- No trailing slash: `https://real-shop.vercel.app` ✅ (not `https://real-shop.vercel.app/` ❌)

### Frontend Issues

**"Network Error" or "Cannot connect to API"**
- Check `VITE_API_BASE_URL` in Vercel environment variables
- Make sure it's: `https://your-backend.onrender.com/api` (with `/api` at the end)
- Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

**Images not loading**
- Cloudinary URLs should work automatically
- Check browser console for errors

### Common Fixes

1. **Wait a few minutes** - Render free tier spins down after inactivity
2. **Check environment variables** - Make sure all are set correctly
3. **Check logs** - Both Render and Vercel have logs in their dashboards
4. **Redeploy** - Sometimes a redeploy fixes issues

---

## 📝 Quick Reference

**Backend URL**: `https://your-backend.onrender.com`  
**Frontend URL**: `https://your-frontend.vercel.app`

**Backend Environment Variables** (Render):
- PORT, MONGO_URI, JWT_SECRET
- CLOUDINARY_* (3 variables)
- EMAIL_USER, EMAIL_PASS
- FRONTEND_URL

**Frontend Environment Variables** (Vercel):
- VITE_API_BASE_URL

---

## 🎉 You're Done!

Your app is now live! Share your Vercel URL with others.

**Note**: Render free tier spins down after 15 minutes of inactivity. First request after spin-down may take 30-60 seconds to wake up.

