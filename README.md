# Ecomerce
Ecomerce mern app
# E-Commerce MERN App 🛒

Welcome to my **E-Commerce MERN App**! This is a full-stack e-commerce platform I built from scratch using the MERN stack (MongoDB, Express.js, React, Node.js). The app allows users to browse products, add them to a cart, and securely checkout using Stripe for payments. I’ve also added user authentication, product management, and order confirmation features to make it a complete shopping experience.

I created this project to learn and showcase my skills in full-stack development, and I’m excited to share it with the community! 🚀

---

##  Features

Here’s what you can do with this app:

- **User Authentication:** Sign up and log in securely using JWT and bcrypt for password hashing.
- **Product Browsing:** View a list of products with details like name, price, size, and color.
- **Shopping Cart:** Add products to your cart, update quantities, and remove items.
- **Secure Checkout:** Complete purchases using Stripe for payment processing (supports test cards for development).
- **Order Confirmation:** Get a confirmation page after a successful purchase.
- **Image Uploads:** Product images are stored and managed using Cloudinary.
- **Responsive Design:** The UI is mobile-friendly, thanks to Tailwind CSS.
- **State Management:** I used Redux Toolkit to manage the app’s state efficiently.

---

## 🛠️ Tech Stack

I used the following technologies to build this app:

### Backend
- **Node.js & Express.js:** For creating a RESTful API to handle requests.
- **MongoDB & Mongoose:** For storing user data, products, orders, and more.
- **Stripe:** For secure payment processing.
- **Cloudinary:** For uploading and managing product images.
- **JWT & bcryptjs:** For user authentication and password security.
- **Multer:** For handling file uploads (e.g., product images).
- **CORS & dotenv:** For enabling cross-origin requests and managing environment variables.

### Frontend
- **React:** For building a dynamic and interactive user interface.
- **React Router:** For handling navigation between pages.
- **Redux Toolkit:** For managing the app’s state (e.g., cart, user data).
- **Stripe React SDK:** For integrating Stripe payments on the frontend.
- **Axios:** For making API requests to the backend.
- **Tailwind CSS:** For styling the app with a clean, responsive design.
- **React Icons:** For adding icons to improve the UI.
- **Sonner:** For showing toast notifications (e.g., "Item added to cart").
- **Vite:** For a fast development server and build tool.

---

##  Project Structure

Here’s how I organized the project:
Ecommerce/
├── backend/
│   ├── models/              # MongoDB models (User, Product, Checkout, Order)
│   ├── routes/              # API routes (auth, products, checkout, stripe)
│   ├── controllers/         # Route handlers (authController, checkoutController)
│   ├── middleware/          # Custom middleware (e.g., protect for authentication)
│   ├── server.js            # Main server file
│   ├── seeder.js            # Script to seed sample data
│   ├── .env.example         # Example environment variables
│   └── package.json         # Backend dependencies
└── frontend/
├── src/
│   ├── components/      # React components (Checkout, PaymentReturn, etc.)
│   ├── redux/           # Redux slices and store
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point for React
│   └── index.css        # Global styles
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite configuration
├── .env.example         # Example environment variables
└── package.json         # Frontend dependencies


---

##  Prerequisites

Before running the app, make sure you have the following installed on your system:
- **Node.js** (v16 or higher)
- **MongoDB** (either locally or use MongoDB Atlas)
- **Stripe Account** (for payment integration)
- **Cloudinary Account** (for image uploads)

You’ll also need a GitHub account to clone the repository.

---
This project is licensed under the MIT License. See the  file for more details.

📧 Contact
If you have any questions or suggestions, feel free to reach out to me:

Email: hassanshehzad@example.com 
GitHub: hassanshehzad1
Thanks for checking out my project! I hope you find it useful. Happy coding! 


### **How to Add This README to Your Repository**


   cd Ecommerce
   touch README.md
## ⚙️ Installation

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository
First, clone the repository to your local machine:
``bash
git clone https://github.com/hassanshehzad1/Ecommerce.git
cd Ecommerce;
###


# Setup the Backend
cd backend
npm install
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
npm run dev

3. Setup the Frontend
Navigate to the frontend directory:
bash

Collapse

Wrap

Copy
cd ../frontend
Install the dependencies:
bash

Collapse

Wrap

Copy
npm install
Create a .env file in the frontend directory by copying the example file:
bash

Collapse

Wrap

Copy
cp .env.example .env
Open .env and fill in your environment variables:
text

Collapse

Wrap

Copy
VITE_BACKEND_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
Start the frontend development server:
bash

Collapse

Wrap

Copy
npm run dev
The frontend will run on http://localhost:5173.
4. Seed Sample Data (Optional)
If you want to populate the database with sample products, you can run the seeder script:



Copy
cd backend
npm run seed
🌐Usage
Once both the backend and frontend are running:

Open your browser and go to http://localhost:5173.
Sign up or log in to your account.
Browse the products, add items to your cart, and proceed to checkout.
Use a Stripe test card to complete the payment (e.g., 4242 4242 4242 4242, expiry: 12/25, CVC: 123).
After a successful payment, you’ll be redirected to the order confirmation page.

