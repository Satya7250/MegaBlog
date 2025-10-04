# 📝 MegaBlog

> A modern, full-stack blogging platform built with React, Redux Toolkit, and Appwrite backend services.

![React](https://img.shields.io/badge/React-18+-blue.svg)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.9-purple.svg)
![Appwrite](https://img.shields.io/badge/Appwrite-20.1-red.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-teal.svg)
![Vite](https://img.shields.io/badge/Vite-7.1-yellow.svg)

## ✨ Features

### 🔐 **Authentication & Authorization**
- **Secure user registration** and login system
- **Protected routes** with authentication middleware
- **Persistent sessions** with Redux state management
- **Logout functionality** with proper cleanup

### 📱 **User Interface**
- **Modern, responsive design** built with Tailwind CSS
- **Mobile-first approach** with optimized layouts
- **Professional header** with navigation and user controls
- **Image optimization** compatible with Appwrite free tier
- **Loading states** and error handling throughout

### 📝 **Content Management**
- **Rich text editor** powered by TinyMCE
- **Image upload** and management system
- **Post creation** with title, content, and featured images
- **Post editing** and deletion (author-only)
- **Content parsing** with HTML sanitization

### 🏗️ **Architecture & Performance**
- **React 19** with modern hooks and patterns
- **Redux Toolkit** for predictable state management
- **React Router** for client-side routing
- **React Hook Form** for efficient form handling
- **Component-based architecture** for maintainability

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Appwrite account** (free tier supported)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 12MegaBlog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.sample .env
   ```
   
   Update `.env` with your Appwrite credentials:
   ```env
   VITE_APPWRITE_URL="https://fra.cloud.appwrite.io/v1"
   VITE_APPWRITE_PROJECT_ID="your_project_id"
   VITE_APPWRITE_DATABASE_ID="your_database_id"
   VITE_APPWRITE_COLLECTION_ID="your_collection_id"
   VITE_APPWRITE_BUCKET_ID="your_bucket_id"
   VITE_TINYMCE_API_KEY="your_tinymce_api_key"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173`

## 🔧 Configuration

### Appwrite Setup

1. **Create an Appwrite project** at [appwrite.io](https://appwrite.io)

2. **Set up Database**
   - Create a database
   - Create a collection with these attributes:
     - `title` (string, required)
     - `content` (string, required)
     - `featuredImage` (string, required)
     - `status` (string, required, default: "active")
     - `userId` (string, required)

3. **Configure Storage**
   - Create a storage bucket
   - Set appropriate read/write permissions
   - **Note**: Free tier has limitations on image transformations

4. **Set up Authentication**
   - Enable email/password authentication
   - Configure session settings

### TinyMCE Setup

1. **Get API key** from [TinyMCE](https://www.tiny.cloud/)
2. **Add to environment variables**
3. **Configure in RTE component** if needed

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header/          # Navigation components
│   ├── Footer/          # Footer component
│   ├── post-form/       # Post creation/editing
│   └── container/       # Layout components
├── pages/               # Page components
│   ├── Home.jsx         # Landing page
│   ├── Login.jsx        # Authentication
│   ├── Signup.jsx       # User registration
│   ├── AddPost.jsx      # Post creation
│   ├── EditPost.jsx     # Post editing
│   ├── Post.jsx         # Post detail view
│   └── AllPosts.jsx     # Post listing
├── appwrite/            # Backend service configurations
│   ├── auth.js          # Authentication services
│   └── config.js        # Database and storage services
├── store/               # Redux store configuration
│   ├── store.js         # Store setup
│   └── authSlice.js     # Authentication state
├── hooks/               # Custom React hooks
│   └── useAppwriteImage.js # Image handling hook
└── conf/                # Configuration files
    └── conf.js          # Environment variables
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for actions and links
- **Secondary**: Gray scale for text and backgrounds
- **Success**: Green for positive actions
- **Error**: Red for warnings and errors

### Typography
- **Headings**: Bold, hierarchical sizing
- **Body**: Clean, readable fonts
- **Code**: Monospace for technical content

### Components
- **Buttons**: Consistent styling with hover states
- **Forms**: Clean inputs with validation feedback
- **Cards**: Shadow-based elevation system

## 🔒 Security Features

- **Input validation** on all forms
- **XSS protection** with HTML sanitization
- **Authentication checks** on protected routes
- **File upload validation** for images
- **Environment variable protection**

## 🐛 Troubleshooting

### Common Issues

**Images not loading?**
- Check Appwrite bucket permissions
- Verify file upload was successful
- Free tier blocks image transformations

**Authentication issues?**
- Verify Appwrite project settings
- Check environment variables
- Clear browser storage and retry

**Build errors?**
- Ensure all dependencies are installed
- Check Node.js version compatibility
- Verify environment variables are set

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy** automatically on push

### Netlify

1. **Build command**: `npm run build`
2. **Publish directory**: `dist`
3. **Add environment variables** in site settings

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Appwrite** for backend-as-a-service
- **Tailwind CSS** for utility-first styling
- **TinyMCE** for rich text editing
- **Vite** for fast development experience

## 📞 Support

If you encounter any issues or have questions:

- **Check the troubleshooting section** above
- **Open an issue** in the repository
- **Review Appwrite documentation** for backend issues

---

**Built with ❤️ using modern web technologies**
