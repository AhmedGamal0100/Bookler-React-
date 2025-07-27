# Bookler - Hotel Booking Application

A modern, responsive hotel booking web application built with React 19, Redux Toolkit, and Ant Design. Bookler provides a seamless experience for users to search, view, and book hotels with a beautiful UI and comprehensive booking management system.

## 🏨 Features

### Core Functionality
- **Hotel Browsing**: Browse and view detailed information about hotels
- **Advanced Search**: Search hotels by name and country with filtering capabilities
- **Hotel Details**: Comprehensive hotel information including images, amenities, ratings, and pricing
- **Booking System**: Complete booking flow with payment processing simulation
- **User Authentication**: Registration and login system with form validation
- **Booking Management**: View and manage your booking history

### User Experience
- **Modern UI**: Clean and intuitive interface using Ant Design components
- **Real-time Search**: Instant search results with loading states
- **Form Validation**: Comprehensive client-side validation using React Hook Form
- **Navigation Guards**: Protected routes for authenticated users
- **State Management**: Centralized state management with Redux Toolkit
- **Local Storage**: Persistent user data and booking information

## 🛠️ Technology Stack

### Frontend
- **React 19**: Latest React version with modern features
- **Redux Toolkit**: State management with RTK Query
- **React Router**: Client-side routing with protected routes
- **Ant Design**: UI component library for consistent design
- **React Hook Form**: Form handling and validation
- **React Icons**: Icon library for UI elements
- **Day.js**: Date manipulation library
- **Axios**: HTTP client for API requests

### Development Tools
- **Vite**: Fast build tool and development server
- **ESLint**: Code linting and formatting
- **React DevTools**: Development debugging tools

## 📁 Project Structure

```
src/
├── apis/                    # API configuration and endpoints
│   ├── hotels.js           # Hotel API configuration
│   ├── offer.js            # Offer API configuration
│   └── recommended.js      # Recommended hotels API
├── assets/                 # Static assets
│   └── imgs/              # Images and icons
├── components/             # Reusable UI components
│   ├── BookigForm/        # Booking form component
│   ├── BookingSummaryCard/ # Booking summary display
│   ├── Details/           # Hotel details component
│   ├── HotelsCard/        # Hotel card component
│   ├── MyBookingCard/     # User booking card
│   ├── NavHorizontal/     # Top navigation bar
│   ├── NavVertical/       # Side navigation
│   ├── Offer/             # Special offers component
│   ├── Recommended/       # Recommended hotels
│   └── SearchNotFound/    # No results component
├── hooks/                 # Custom React hooks
│   └── useBlocker.js      # Navigation blocking hook
├── layouts/               # Layout components
│   ├── AuthLayout.jsx     # Authentication layout
│   └── MainLayout.jsx     # Main application layout
├── pages/                 # Application pages
│   ├── Bookings/          # Booking page
│   ├── Details/           # Hotel details page
│   ├── Hotels/            # Hotels listing page
│   ├── Landing/           # Home page
│   ├── Login/             # Login page
│   ├── MyBooking/         # User bookings page
│   ├── Register/          # Registration page
│   ├── Search/            # Search results page
│   └── Notfound/          # 404 error page
├── routes/                # Route configuration
│   └── ProtectedRoute.jsx # Protected route wrapper
├── stores/                # Redux store configuration
│   ├── AccountSlicer.js   # User account state
│   ├── BookingSlicer.js   # Booking state management
│   ├── SearchSlicer.js    # Search state management
│   ├── VerticalNavSlicer.js # Navigation state
│   └── index.js           # Store configuration
└── App.jsx               # Main application component
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Bookler
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code linting

## 🎯 Key Features Explained

### Authentication System
- **Registration**: Users can create accounts with comprehensive form validation
- **Login**: Secure login with email/password authentication
- **Session Management**: Persistent login state using session storage
- **Protected Routes**: Automatic redirection for unauthenticated users

### Hotel Management
- **Hotel Listing**: Display all available hotels with key information
- **Search & Filter**: Advanced search by hotel name and country
- **Hotel Details**: Comprehensive hotel information with image galleries
- **Amenities Display**: Visual representation of hotel facilities

### Booking System
- **Booking Form**: Complete booking form with user details and payment
- **Form Validation**: Real-time validation with error messages
- **Payment Simulation**: Credit card payment processing simulation
- **Booking History**: View and manage all user bookings

### State Management
- **Redux Toolkit**: Centralized state management
- **Account State**: User authentication and profile data
- **Booking State**: Booking form data and history
- **Search State**: Search filters and results
- **Navigation State**: UI navigation state management

## 🔧 Configuration

### API Configuration
The application uses a REST API for hotel data. API configuration is located in `src/apis/`:

- **Base URL**: `https://booking-app-db.vercel.app/hotels`
- **Endpoints**: 
  - `GET /` - Get all hotels
  - `GET /:id` - Get specific hotel details

### Environment Variables
Create a `.env` file in the root directory for environment-specific configuration:

```env
VITE_API_BASE_URL=https://booking-app-db.vercel.app
```

## 🎨 UI/UX Features

### Design System
- **Ant Design**: Consistent component library
- **Custom Styling**: Tailored CSS for unique design elements
- **Loading States**: Smooth loading indicators throughout the app

### Navigation
- **Horizontal Navigation**: Top navigation with search functionality
- **Vertical Navigation**: Side navigation for main sections
- **Breadcrumb Navigation**: Clear path indication
- **Protected Routes**: Secure access to booking features

## 🔒 Security Features

- **Form Validation**: Comprehensive client-side validation
- **Protected Routes**: Authentication-based route protection
- **Input Sanitization**: Safe handling of user inputs
- **Session Management**: Secure session handling

## 🧪 Testing

The application includes:
- **ESLint**: Code quality and consistency
- **React DevTools**: Development debugging
- **Form Validation**: Comprehensive input validation
- **Error Handling**: Graceful error handling throughout

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Ant Design** for the comprehensive UI component library
- **React Team** for the amazing React framework
- **Redux Toolkit** for simplified state management
- **Vite** for the fast build tool

---

**Bookler** - Making hotel booking simple and enjoyable! 🏨✨
