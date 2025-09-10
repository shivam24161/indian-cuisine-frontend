# 🍛 Indian Food Explorer - Frontend

A modern React-based web application for exploring Indian cuisine with advanced search, filtering, and recommendation features.
To run this app , click on this url - https://react-indian-cuisine.netlify.app/
FIrst register yourself and then signin .
When you signin with the correct details then you will be redirected to main list page .
Where ypu can do different - different actions .
And when you click on any dish name then details of that list will get opens.


## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Authentication](#-authentication)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Troubleshooting](#-troubleshooting)

## ✨ Features

### 🔍 **Search & Discovery**
- **Real-time Search**: Autocomplete suggestions for dish names, ingredients, and origins
- **Advanced Filtering**: Filter by origin, ingredients, and other attributes
- **Smart Sorting**: Sort dishes by name, prep time, cook time, and ingredients
- **Pagination**: Efficient browsing through large datasets

### 🍽️ **Dish Management**
- **Comprehensive Dish Details**: View complete information including ingredients, cooking times, and cultural context
- **Ingredient-based Recommendations**: Find dishes based on available ingredients
- **Flexible Matching**: Choose between "all ingredients" or "some ingredients" matching

### 🔐 **User Authentication**
- **User Registration**: Create new accounts with email and password
- **Secure Login**: Authenticated access to protected features
- **Session Management**: Persistent login state across browser sessions

### 📱 **User Experience**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Built with Microsoft Fluent UI components
- **Intuitive Navigation**: Easy-to-use interface with clear visual hierarchy
- **Loading States**: Smooth user experience with proper loading indicators

## 🛠️ Tech Stack

### **Frontend Technologies**
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with enhanced IDE support
- **Vite** - Fast build tool and development server
- **React Router v6** - Client-side routing and navigation

### **UI Framework**
- **Microsoft Fluent UI** - Modern, accessible component library
- **CSS3** - Custom styling with responsive design patterns

### **Development Tools**
- **Axios** - HTTP client for API communication
- **ESLint** - Code linting and quality assurance
- **TypeScript Compiler** - Type checking and compilation

## 🚀 Installation

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd indian-cuisine-frontend
```

### **2. Install Dependencies**
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

## ⚙️ Configuration

### **Environment Variables**
Create a `.env` file in the root directory (optional):

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
```

## 🏃‍♂️ Running the Application

### **Development Mode**
```bash
# Start the development server
npm run dev

# Or using yarn
yarn dev
```

The application will be available at:
- **Local**: http://localhost:5173
- **Network**: http://[your-ip]:5173

### **Production Mode**
```bash
# Build the application
npm run build

# If you want to start the production server with production backend URL
npm run preview
or
npm start
# This will start production environment on your local without running the backend app
# When running app in production mode on local then first data loading will take time , as this is a feature of render , they stop the service of the app in their is no activity and for starting it require approx 50s time 
```

### **Available Scripts**
```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   └── Header.tsx       # Global navigation header
├── pages/               # Page components
│   ├── Auth/           # Authentication pages
│   │   ├── AuthForm.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── useAuth.tsx
│   ├── ListPage.tsx    # Dish listing page
│   └── DetailPage.tsx  # Individual dish details
├── services/           # API and external services
│   └── api.ts         # Backend API client
├── types/             # TypeScript type definitions
│   └── dish.ts       # Dish data types
├── widgets/           # Complex UI widgets
│   └── DishSuggester.tsx
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── styles.css        # Global styles
```

## 🔌 API Endpoints

The frontend communicates with these backend endpoints:

### **Dish Management**
- `GET /api/dishes` - List dishes with pagination and filtering
- `GET /api/dishes/:id` - Get specific dish details
- `GET /api/dishes/search` - Search dishes by query
- `GET /api/dishes/autosuggest` - Get search suggestions

### **Ingredients & Recommendations**
- `GET /api/dishes/ingredients` - Get all available ingredients
- `POST /api/dishes/from-ingredients` - Get dishes by ingredients

### **Query Parameters**
- `page` - Page number for pagination
- `limit` - Number of items per page
- `origin` - Filter by dish origin
- `ingredient` - Filter by ingredient
- `q` - Search query
- `sortBy` - Sort field
- `sortOrder` - Sort direction (asc/desc)

## 🔐 Authentication

### **Authentication Flow**
1. **Registration**: Users create accounts with email/password
2. **Login**: Authenticated access to protected features
3. **Session**: Login state persisted in localStorage
4. **Logout**: Clear session and redirect to login

### **Protected Routes**
- `/dishes` - Main dish listing page
- `/dishes/:id` - Individual dish details

### **Public Routes**
- `/` - User login page
- `/register` - User registration page
- `/` - Redirects to login

## 🛠️ Development

### **Code Structure**
- **Components**: Functional components with hooks
- **State Management**: React hooks (useState, useEffect)
- **Routing**: React Router v6 with protected routes
- **Styling**: External CSS with BEM methodology
- **Type Safety**: Full TypeScript implementation

### **Best Practices**
- **Component Documentation**: JSDoc comments for all components
- **Type Safety**: Strict TypeScript configuration
- **Performance**: Optimized re-renders and API calls
- **Accessibility**: ARIA labels and keyboard navigation

### **Development Workflow**
1. **Feature Development**: Create feature branches### **Development Workflow**
1. **Feature Development**: Create feature branches
2. **Code Review**: Ensure code quality and documentation
3. **Testing**: Manual testing of all features
4. **Build Verification**: Ensure production build works
5. **Deployment**: Deploy to production environment
2. **Code Review**: Ensure code quality and documentation
3. **Testing**: Manual testing of all features
4. **Build Verification**: Ensure production build works
5. **Deployment**: Deploy to production environment


## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add comprehensive tests
5. Submit a pull request

---

**Happy Cooking! 🍛✨**
