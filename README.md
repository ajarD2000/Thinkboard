# ThinkBoard

A full-stack web application for creating, managing, and organizing notes. Built with React, Express.js, and MongoDB, ThinkBoard provides a modern, responsive interface for note-taking with real-time capabilities.

## 🚀 Features

- **Create Notes**: Add new notes with titles and content
- **Read Notes**: View all notes with newest first sorting
- **Update Notes**: Edit existing notes seamlessly
- **Delete Notes**: Remove notes you no longer need
- **Rate Limiting**: Built-in API rate limiting using Upstash Redis
- **Production Ready**: Configured for deployment with static file serving
- **Modern UI**: Beautiful interface built with React, Tailwind CSS, and DaisyUI
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind component library
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Upstash Redis** - Rate limiting with Redis
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
THINKBOARD/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js           # MongoDB connection
│   │   │   └── upstash.js      # Rate limiting configuration
│   │   ├── controllers/
│   │   │   └── notesController.js  # Note CRUD operations
│   │   ├── middleware/
│   │   │   └── rateLimiter.js  # Rate limiting middleware
│   │   ├── models/
│   │   │   └── Note.js         # Note data model
│   │   ├── routes/
│   │   │   └── notesRoutes.js  # Note API routes
│   │   └── server.js           # Express server entry point
│   ├── package.json
│   └── .env                    # Environment variables (create this)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   ├── NotesNotFound.jsx
│   │   │   └── RateLimitedUI.jsx
│   │   ├── lib/
│   │   │   ├── axios.js        # Axios instance configuration
│   │   │   └── utils.js
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CreatePage.jsx
│   │   │   └── NoteDetailPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── dist/                   # Production build output
│   └── package.json
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- Upstash Redis account (for rate limiting)
- npm or yarn package manager

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the `backend` directory:**
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5001
   NODE_ENV=development
   
   # Upstash Redis Configuration
   UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
   ```

4. **Get MongoDB URI:**
   - If using MongoDB Atlas: Create a cluster and get your connection string
   - Replace `<password>` and `<dbname>` in the connection string
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/thinkboard?retryWrites=true&w=majority`

5. **Get Upstash Redis credentials:**
   - Sign up at [Upstash](https://upstash.com/)
   - Create a Redis database
   - Copy the REST URL and REST Token from the database dashboard

6. **Run the development server:**
   ```bash
   npm run dev
   ```
   
   The server will start on `http://localhost:5001` (or the PORT specified in your `.env` file)

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the API endpoint** (if needed):
   - Check `frontend/src/lib/axios.js` to ensure the base URL matches your backend server

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will start on `http://localhost:5173`

## 📚 API Endpoints

All API endpoints are prefixed with `/api/notes`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/notes` | Get all notes (newest first) | - |
| GET | `/api/notes/:id` | Get a specific note by ID | - |
| POST | `/api/notes` | Create a new note | `{ "title": string, "content": string }` |
| PUT | `/api/notes/:id` | Update an existing note | `{ "title": string, "content": string }` |
| DELETE | `/api/notes/:id` | Delete a note | - |

### Example API Requests

**Create a Note:**
```bash
curl -X POST http://localhost:5001/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "My Note", "content": "This is the note content"}'
```

**Get All Notes:**
```bash
curl http://localhost:5001/api/notes
```

**Update a Note:**
```bash
curl -X PUT http://localhost:5001/api/notes/:id \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title", "content": "Updated content"}'
```

**Delete a Note:**
```bash
curl -X DELETE http://localhost:5001/api/notes/:id
```

## 🚦 Rate Limiting

The application implements rate limiting using Upstash Redis:
- **Limit**: 10 requests per 20 seconds (sliding window)
- Returns HTTP 429 (Too Many Requests) when limit is exceeded
- Applied globally to all routes

## 🏗️ Development

### Backend Scripts

```bash
npm run dev    # Start development server with nodemon (auto-reload)
npm start      # Start production server
```

### Frontend Scripts

```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🚀 Production Deployment

### Build for Production

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```
   This creates a `dist` folder in the frontend directory.

2. **Set environment variables for production:**
   ```env
   NODE_ENV=production
   MONGO_URI=your_production_mongodb_uri
   PORT=5001
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
   ```

3. **Start the production server:**
   ```bash
   cd backend
   npm start
   ```

The server will:
- Serve the React app from the `frontend/dist` directory
- Handle API requests through `/api/notes` routes
- Route all other requests to the React app (for client-side routing)

### Deployment Platforms

This application can be deployed to:
- **Heroku**: Configure buildpacks and environment variables
- **Vercel**: Deploy backend as serverless functions, frontend separately
- **Railway**: Full-stack deployment
- **Render**: Separate services for frontend and backend
- **DigitalOcean App Platform**: Full-stack deployment
- **AWS/GCP/Azure**: Containerized deployment with Docker

## 🔒 Environment Variables

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `PORT` | Server port (default: 5001) | No |
| `NODE_ENV` | Environment mode (development/production) | No |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST API URL | Yes |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST API token | Yes |

## 📝 Notes Model

```javascript
{
  title: String (required),
  content: String (required),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

## 🎨 UI Features

- Dark theme with gradient background
- Responsive design for mobile and desktop
- Toast notifications for user feedback
- Loading states and error handling
- Rate limit UI feedback
- Smooth navigation with React Router

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [ISC License](https://opensource.org/licenses/ISC).

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify your `MONGO_URI` is correct in the `.env` file
- Check if your IP is whitelisted in MongoDB Atlas (if using Atlas)
- Ensure MongoDB service is running (if using local MongoDB)

### Rate Limiting Issues
- Verify Upstash Redis credentials are correct
- Check Upstash dashboard for any service issues
- Ensure the rate limiter middleware is properly configured

### Frontend Not Connecting to Backend
- Check that the backend server is running
- Verify CORS is properly configured for your frontend URL
- Check the axios base URL in `frontend/src/lib/axios.js`

### Environment Variables Not Loading
- Ensure `.env` file is in the `backend` directory (same level as `package.json`)
- Verify variable names match exactly (case-sensitive)
- Restart the server after changing `.env` file

## 👤 Author

**ajardahal**

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- Upstash for Redis rate limiting service
- All open-source contributors whose packages made this project possible

