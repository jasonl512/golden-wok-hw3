# Golden Wok HW3 Full-Stack Restaurant Website

This is Homework 3 for the restaurant website project. It extends the React restaurant website with:

- React frontend
- Bootstrap styling
- Node.js backend
- Express REST API
- MongoDB database using Mongoose
- Menu items loaded from MongoDB
- Cart updates saved to MongoDB
- Orders saved to MongoDB
- CRUD operations for menu items and orders

## Project Structure

```text
golden-wok-hw3-fullstack/
├── client/   React + Bootstrap frontend
└── server/   Node.js + Express + MongoDB backend
```

## 1. Install dependencies

From the project root:

```bash
npm run install-all
```

If PowerShell blocks npm, use:

```bash
npm.cmd run install-all
```

## 2. Set up MongoDB

Create a MongoDB Atlas database and copy the connection string.

Create this file:

```text
server/.env
```

Use this format:

```text
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/golden_wok?retryWrites=true&w=majority
PORT=5000
CLIENT_URL=http://localhost:5173
```

## 3. Seed the menu collection

From the project root:

```bash
npm run seed
```

This creates the 6 starting menu items in MongoDB.

## 4. Run the backend

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

## 5. Run the frontend

Open a second terminal and run:

```bash
npm run dev:client
```

Frontend runs at:

```text
http://localhost:5173
```

## REST API Endpoints

### Menu

```text
GET    /api/menu
POST   /api/menu
PUT    /api/menu/:id
DELETE /api/menu/:id
```

### Cart

```text
GET    /api/cart/:sessionId
PUT    /api/cart/:sessionId
DELETE /api/cart/:sessionId
```

### Orders

```text
GET    /api/orders
POST   /api/orders
PUT    /api/orders/:id
DELETE /api/orders/:id
```

## What to show in the demo video

Open the website and MongoDB side by side.

1. Show menu loading from MongoDB.
2. Add food to cart and show cart collection updates.
3. Click + and − to show cart updates.
4. Click Place Order and show order saved to MongoDB.
5. Add a new menu item in the Admin section and show MongoDB update.
6. Edit a menu item and show MongoDB update.
7. Delete a menu item and show MongoDB update.
8. Change order status and delete an order.

## Deployment

Suggested deployment:

- Frontend: Vercel
- Backend: Render or Railway
- Database: MongoDB Atlas

For frontend deployment, add environment variable:

```text
VITE_API_URL=https://your-backend-url.onrender.com
```

For backend deployment, add environment variables:

```text
MONGO_URI=your MongoDB Atlas connection string
CLIENT_URL=https://your-frontend-url.vercel.app
```
