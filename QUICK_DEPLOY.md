# ⚡ Quick Deployment Guide

## 🎯 Step-by-Step Deployment

### 📦 Step 1: Deploy Backend to Render

1. **Go to Render**: https://render.com
   - Sign up/Login with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Click "Connect GitHub" (if not connected)
   - Select repository: `siddhant14g/Real-shop`
   - Click "Connect"

3. **Configure Service Settings**
   ```
   Name: realshop-backend
   Region: Choose closest (Singapore/US)
   Branch: main
   Root Directory: backend ⚠️ IMPORTANT!
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   - Click "Advanced" → "Add Environment Variable"
   - Add each variable from your `backend/.env` file:
     - `PORT=5000`
     - `MONGO_URI` (your MongoDB connection string)
     - `JWT_SECRET` (your secret)
     - `CLOUDINARY_CLOUD_NAME`
     - `CLOUDINARY_API_KEY`
     - `CLOUDINARY_API_SECRET`
     - `EMAIL_USER`
     - `EMAIL_PASS`
     - `FRONTEND_URL` (leave empty for now)

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - **Copy your backend URL** (e.g., `https://realshop-backend.onrender.com`)
   - ⚠️ **SAVE THIS URL** - you'll need it!

---

### 🎨 Step 2: Deploy Frontend to Vercel

1. **Go to Vercel**: https://vercel.com
   - Sign up/Login with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Find `siddhant14g/Real-shop` → Click "Import"

3. **Configure Project**
   ```
   Framework Preset: Vite (auto-detected)
   Root Directory: frontend ⚠️ IMPORTANT! Click "Edit" and change to "frontend"
   Build Command: npm run build (auto)
   Output Directory: dist (auto)
   Install Command: npm install (auto)
   ```

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add:
     ```
     Key: VITE_API_BASE_URL
     Value: https://your-backend-url.onrender.com/api
     ```
   - ⚠️ Replace `your-backend-url` with your actual Render URL from Step 1
   - Make sure to include `/api` at the end!

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - **Copy your frontend URL** (e.g., `https://real-shop.vercel.app`)

---

### 🔗 Step 3: Connect Frontend to Backend

1. **Update Backend CORS**
   - Go back to Render dashboard
   - Open your backend service
   - Go to "Environment" tab
   - Find `FRONTEND_URL`
   - Update value: `https://your-frontend.vercel.app`
   - Click "Save Changes"
   - Render will auto-redeploy

---

### ✅ Step 4: Test Your Deployment

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

### Backend not working?
- Check Render logs: Service → "Logs" tab
- Verify all environment variables are set
- Check MongoDB connection string is correct

### Frontend can't connect to backend?
- Check `VITE_API_BASE_URL` in Vercel matches your Render URL
- Format: `https://your-backend.onrender.com/api` (with `/api`)
- Clear browser cache (Ctrl+Shift+R)

### CORS errors?
- Make sure `FRONTEND_URL` in Render matches Vercel URL exactly
- No trailing slash: `https://real-shop.vercel.app` ✅

---

## 📝 Quick Checklist

- [ ] Backend deployed on Render
- [ ] Backend URL copied
- [ ] Frontend deployed on Vercel  
- [ ] `VITE_API_BASE_URL` set in Vercel
- [ ] `FRONTEND_URL` updated in Render
- [ ] Tested registration/login
- [ ] Everything working! 🎉

---

## 💡 Pro Tips

- **Render free tier**: Spins down after 15 min inactivity (first request may be slow)
- **Auto-deploy**: Both platforms auto-deploy on git push
- **Environment variables**: Never commit `.env` files (already in `.gitignore`)
- **Logs**: Check Render/Vercel dashboards for detailed error logs

---

## 🎉 You're Done!

Your app is live! Share your Vercel URL: `https://your-app.vercel.app`

