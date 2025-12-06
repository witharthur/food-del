# 🍔 Food Delivery Application

A full-stack food delivery platform that enables users to browse menus, place orders, and make secure payments online. The application includes both a customer-facing interface and an admin panel for order management.

## 🌐 Live Demo

- **User Interface**: [https://food-del-frontend-qaqz.onrender.com/](https://food-del-frontend-qaqz.onrender.com/)
- **Admin Panel**: [https://food-del-admin-7bek.onrender.com/](https://food-del-admin-7bek.onrender.com/)

## ✨ Features

### Customer Features
- **User Authentication**: Secure login and registration system
- **Browse Menu**: Explore various food categories and items
- **Shopping Cart**: Add, remove, and manage items in your cart
- **Order Placement**: Easy checkout process with delivery details
- **Secure Payments**: Integrated Stripe payment gateway
- **Order Tracking**: View order history and current order status
- **Responsive Design**: Seamless experience across all devices

### Admin Features
- **Order Management**: View and manage incoming orders
- **Menu Management**: Add, edit, or remove food items
- **Category Management**: Organize food items by categories
- **Order Status Updates**: Track and update order fulfillment status

## 🛠️ Built With

### Frontend
- **React JS** - Dynamic and interactive user interface
- **React Router** - Client-side routing
- **CSS3** - Custom styling and responsive design
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast and minimalist web framework
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modeling

### Payment Integration
- **Stripe API** - Secure payment processing

### Additional Tools
- **Axios** - HTTP client for API requests
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing for security

## 📁 Project Structure

```
food-delivery-app/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/          # Images and media files
│   │   ├── components/      # Reusable React components
│   │   │   ├── Navbar/
│   │   │   ├── Header/
│   │   │   ├── ExploreMenu/
│   │   │   ├── FoodDisplay/
│   │   │   ├── FoodItem/
│   │   │   ├── Footer/
│   │   │   ├── LoginPopup/
│   │   │   └── AppDownload/
│   │   ├── pages/           # Page components
│   │   │   ├── Home/
│   │   │   ├── Cart/
│   │   │   ├── PlaceOrder/
│   │   │   ├── Verify/
│   │   │   └── MyOrders/
│   │   ├── context/         # React Context for state management
│   │   └── App.jsx          # Main application component
│   └── package.json
│
├── backend/                 # Node.js backend application
│   ├── controllers/         # Request handlers
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── server.js           # Entry point
│
└── admin/                  # Admin panel application
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.jsx
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Stripe account for payment processing

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food-delivery-app
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Install Admin Panel Dependencies**
   ```bash
   cd ../admin
   npm install
   ```

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```

3. **Start Frontend Application**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Start Admin Panel**
   ```bash
   cd admin
   npm run dev
   ```

The applications will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Admin Panel: `http://localhost:5174`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/user/:userId` - Get user orders
- `PUT /api/orders/:id` - Update order status

### Payment
- `POST /api/payment/create-checkout-session` - Create Stripe checkout session
- `POST /api/payment/verify` - Verify payment

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Secure payment processing with Stripe
- Input validation and sanitization
- Protected API routes

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

Your Name - Initial work

## 🙏 Acknowledgments

- Stripe for payment integration
- MongoDB for database solutions
- React community for excellent tools and libraries
