# Memendar Backend

Backend API for the Memendar application - a meme calendar app that allows users to share and vote on memes organized by month and year.

## 📋 Description

Memendar Backend is a REST API developed with Node.js and Express that handles user authentication, room management, and the publishing and voting of memes through a monthly calendar.

## 🚀 Technologies Used

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Passport.js** - Authentication
- **Express Session** - Session management
- **Connect-Mongo** - MongoDB session store
- **Express Validator** - Data validation
- **bcrypt** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
memendar-backend/
├── index.mjs                 # Application entry point
├── package.json              # Dependencies and scripts
├── mongoose/
│   └── schemas/             # Mongoose schemas
│       ├── Calendar.mjs     # Calendar schema
│       ├── Meme.mjs         # Meme schema
│       ├── Room.mjs         # Room schema
│       └── User.mjs         # User schema
├── routes/
│   ├── index.mjs           # Main router
│   └── users.mjs           # User routes
├── strategies/             # Passport.js strategies
└── utils/
    ├── helpers.mjs         # Utility functions
    └── validationSchema.mjs # Validation schemas
```

## 🔧 Prerequisites

- **Node.js** (version 18 or higher)
- **pnpm** (version 10.8.1 or higher)
- **MongoDB** (running on localhost:27017)

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/unasites/memendar-backend.git
cd memendar-backend
```

2. Install dependencies with pnpm:

```bash
pnpm install
```

3. Make sure MongoDB is running:

```bash
# On Windows (if installed as a service)
net start MongoDB

# Or start manually
mongod
```

## 🏃 Running the Application

### Development Mode (with nodemon)

```bash
pnpm start
```

### Production Mode

```bash
node index.mjs
```

The server will be available at `http://localhost:3000`

## 🗄️ Data Models

### User

- `username`: String (required, unique)
- `password`: String (required, hashed)
- `createdAt`: Date
- `avatarUrl`: String
- `roomIds`: Array di ObjectId (riferimento a Room)
- `role`: String (enum: 'user', 'owner', 'admin')

### Meme

- `imageUrl`: String (required)
- `title`: String (required)
- `createdAt`: Date
- `roomId`: ObjectId (riferimento a Room, required)
- `voteCount`: Number
- `month`: Number
- `year`: Number

### Room

Schema for room/group management

### Calendar

Schema for calendar organization

## 🔐 Authentication

The application uses:

- **Passport.js** for authentication management
- **Express Session** to maintain user sessions
- **bcrypt** for secure password hashing
- **MongoDB** as session store

## 🌐 CORS

The server is configured to accept requests from any origin (`*`) with the following methods:

- GET
- POST
- PUT
- DELETE

**Note**: In production, it is recommended to limit allowed origins.

## 🔒 Session Configuration

- **Secret**: Configured (should be changed in production)
- **Cookie maxAge**: 24 hours
- **Secure**: false (should be set to true in production with HTTPS)
- **HttpOnly**: true
- **SameSite**: lax

## 📝 API Endpoints

Routes are organized in the `routes/` module:

- `/users` - User management and authentication
- Other routes defined in `routes/index.mjs`

## 🛠️ Development

The project uses **nodemon** for automatic reload during development.

```bash
pnpm start
```

## 📜 License

This project is released under the Apache License 2.0. See the [LICENSE](LICENSE) file for more details.

Copyright 2025 UnaSites

## 👤 Author

Project developed by [UnaSites](https://github.com/unasites)

## 🤝 Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚠️ Security Notes

Before going to production:

- [ ] Change the session secret to a secure key
- [ ] Set `secure: true` in cookies if using HTTPS
- [ ] Configure CORS to accept only specific origins
- [ ] Use environment variables for sensitive configurations
- [ ] Implement rate limiting
- [ ] Add appropriate logging

## 🐛 Bugs and Issues

To report bugs or issues, open an issue on GitHub.

---

**Made with ❤️ by UnaSites**
