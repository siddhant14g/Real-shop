# 🚀 Vercel Deployment Checklist

## ✅ Frontend is Ready for Deployment!

Your frontend has been configured with:
- ✅ API URL updated to use your backend: `https://realshop-backend-z5v4.onrender.com/api`
- ✅ Vercel configuration file created (`vercel.json`)
- ✅ Build configuration verified
- ✅ No hardcoded localhost URLs found

---

## 📋 Step-by-Step Vercel Deployment

### Step 1: Go to Vercel
1. Visit: https://vercel.com
2. Sign up/Login with GitHub

### Step 2: Import Project
1. Click "Add New..." → "Project"
2. Find `siddhant14g/Real-shop` → Click "Import"

### Step 3: Configure Settings
**Important Settings:**
- **Framework Preset**: Vite (auto-detected) ✅
- **Root Directory**: `frontend` ⚠️ **MUST CHANGE THIS!**
  - Click "Edit" next to Root Directory
  - Change from `/` to `frontend`
  - Click "Continue"
- **Build Command**: `npm run build` (auto-filled) ✅
- **Output Directory**: `dist` (auto-filled) ✅
- **Install Command**: `npm install` (auto-filled) ✅

### Step 4: Add Environment Variable
**Before clicking Deploy**, add this environment variable:

1. Find "Environment Variables" section
2. Click "Add" or "Add Environment Variable"
3. Add:
   ```
   Key: VITE_API_BASE_URL
   Value: https://realshop-backend-z5v4.onrender.com/api
   ```
   ⚠️ **Important**: Include `/api` at the end!

### Step 5: Deploy
1. Click "Deploy" button
2. Wait 2-3 minutes
3. Watch build logs for any errors

### Step 6: Get Your Frontend URL
After deployment completes:
- You'll get a URL like: `https://real-shop-xxx.vercel.app`
- **Copy this URL** - you'll need it for the next step!

---

## 🔗 Step 7: Update Backend CORS

After frontend is deployed:

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Open your backend service**: `realshop-backend`
3. **Go to "Environment" tab**
4. **Find `FRONTEND_URL` variable**
5. **Update value** with your Vercel URL:
   ```
   https://your-frontend-url.vercel.app
   ```
   Example: `https://real-shop-abc123.vercel.app`
6. **Click "Save Changes"**
7. Render will auto-redeploy (takes 1-2 minutes)

---

## ✅ Testing Checklist

After both are deployed:

- [ ] **Backend**: Visit `https://realshop-backend-z5v4.onrender.com`
  - Should see: "🛒 RealShop E-commerce Backend Running"

- [ ] **Frontend**: Visit your Vercel URL
  - Should load homepage with advertisement carousel

- [ ] **Register**: Create a new account
  - Should work without errors

- [ ] **Login**: Sign in with your account
  - Should redirect to dashboard

- [ ] **Add Product** (as admin):
  - Login as admin
  - Go to Admin Dashboard
  - Add a product with image
  - Should upload to Cloudinary successfully

- [ ] **Place Order**:
  - Add items to cart
  - Place order
  - Should work without errors

---

## 🐛 Troubleshooting

### Frontend can't connect to backend?
- Check `VITE_API_BASE_URL` in Vercel environment variables
- Should be: `https://realshop-backend-z5v4.onrender.com/api`
- Make sure it ends with `/api`

### CORS errors?
- Make sure `FRONTEND_URL` in Render matches your Vercel URL exactly
- No trailing slash: `https://real-shop.vercel.app` ✅

### Build fails?
- Check Vercel build logs
- Make sure Root Directory is set to `frontend`
- Verify all dependencies are in `package.json`

### Images not loading?
- Cloudinary URLs should work automatically
- Check browser console for errors

---

## 📝 Quick Reference

**Backend URL**: `https://realshop-backend-z5v4.onrender.com`  
**Backend API**: `https://realshop-backend-z5v4.onrender.com/api`  
**Frontend URL**: `https://your-app.vercel.app` (after deployment)

**Environment Variables:**

**Vercel:**
```
VITE_API_BASE_URL=https://realshop-backend-z5v4.onrender.com/api
```

**Render (update after frontend deployment):**
```
FRONTEND_URL=https://your-frontend.vercel.app
```

---

## 🎉 You're Ready!

Your frontend is configured and ready to deploy. Follow the steps above and your app will be live!

