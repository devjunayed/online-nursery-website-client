# 🌱 Online Nursery Website Documentation (Gach Lagao)

## Project Overview

Welcome to the Gach Lagao online nursery website! This platform is designed to provide users with a seamless experience in browsing, filtering, and searching for a variety of nursery products. The site enables effective category management and facilitates handling shopping carts with ease. Users can explore detailed information about each product, manage their cart efficiently, and proceed to checkout for cash-on-delivery orders.

## 🌟 Features

### 1. Public Routes 🚀

The website offers open access to all routes, allowing users to navigate freely without the need for authentication.

### 2. Product and Category Management 🛠️

#### 2.1 Product List Table

The product list is displayed in a user-friendly table format, featuring essential columns such as:
- 🖼️ **Image**: Visual representation of the product.
- 🏷️ **Title**: The name of the product.
- 💵 **Price**: Cost of the product.
- 🗂️ **Category**: Classification of the product.
- 🛠️ **Actions**: Options to update or delete the product.

#### 2.2 Action Buttons

Users can manage products with ease through action buttons:
- **Update**: This action opens a modal form, allowing users to modify existing product details.
- **Delete**: A confirmation modal appears, ensuring users can verify their intent to delete a product.

#### 2.3 Adding a Product

Creating new products is straightforward with a dedicated button. The form includes fields for:
- 🗂️ **Category**
- 🏷️ **Title**
- 💵 **Price**
- 📦 **Quantity**
- 📝 **Description**
- ⭐ **Rating**
- 🖼️ **Image**: Users can upload images via ImgBB or input direct links.

> All CRUD operations are reflected in real-time, providing users with an optimistic UI experience.

### 3. Product Browsing 🌿

Users can explore products with a variety of tools:
- **Filtering, Pagination, Sorting, and Searching**: The site supports efficient browsing by allowing users to filter through categories, navigate via pagination, sort products by various criteria (like price and relevance), and search for specific items.
- **Product Details**: When users select a product, they are directed to a detailed information page showcasing all relevant product details.

### 4. Shopping Cart 🛒

The shopping cart functionality enhances user experience:
- **Add to Cart**: Users can easily add products to their cart. However, if a product is out of stock, it cannot be added.
- **Quantity Management**: If a product is already in the cart, the quantity will increase rather than adding duplicates. Users are restricted from exceeding available stock.
- **Proceed to Checkout**: A clear pathway is provided for users to move to the checkout page.

### 5. Checkout and Payment 💳

During the checkout process:
- **Order Creation**: Orders are stored in the database with customer details such as name, phone number, and address. If a product is out of stock, the order cannot be completed. The system automatically updates stock levels upon order placement.
- **Cash on Delivery (COD)**: Users have the option to pay for their order upon delivery.

## 📋 Landing Page Components

The landing page serves as the primary interaction point, featuring:
- **Navbar**: A navigation bar with links to various sections and pages.
- **Hero Section**: This area highlights main features or current promotions.
- **Product Search, Filter, and Pagination**: Users can refine their product searches effectively.
- **Category Section**: Displays different product categories for easy browsing.
- **Product List**: Products are showcased in card format, featuring:
  - 🖼️ **Image**
  - 🏷️ **Title**
  - 💵 **Price**
  - ⭐ **Rating**
  - 🛒 **"Add to Cart" button**
- **Product Details**: A dedicated page for detailed information about each product.
- **Image Gallery**: A visually appealing mosaic view of product images.
- **Footer**: Contains additional links and information for users.

## 📑 Pages List

The site comprises several essential pages:
- **Landing Page**: The main hub for product search, filtering, pagination, and product lists.
- **Products Page**: A dedicated area for product filtering, sorting, and pagination.
- **Product Details Page**: Provides in-depth information about specific products.
- **Checkout/Cart Page**: Displays products added to the cart, facilitating the checkout process.
- **Product and Category Management Page**: An interface dedicated to managing products and categories.

## 🗂️ State Management

State management is handled efficiently through:
- **Redux**: This powerful tool manages the state for products, categories, cart, and other actions.
- **Actions and Reducers**: These are created to manage state changes throughout the application.

## 🎨 UI/UX

The design of the site emphasizes a clean and intuitive user interface. Thoughtful color choices and adherence to UI/UX principles ensure a pleasant user experience, enhancing both aesthetics and usability.

