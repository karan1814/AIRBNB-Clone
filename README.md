# Airbnd

A full-stack web application inspired by Airbnb, built with Node.js, Express, MongoDB, EJS, and Cloudinary for image uploads. Users can create, view, edit, and delete property listings, leave reviews, and manage authentication.

## Features

- User authentication (signup, login, logout) with Passport.js
- Create, edit, and delete property listings with image uploads (Cloudinary)
- Leave and delete reviews on listings
- Flash messages for user feedback
- Server-side validation with Joi
- Responsive UI with Bootstrap and custom CSS
- Error handling and custom error pages

## Folder Structure

```
.
├── app.js                  # Main Express app
├── cloudConfig.js          # Cloudinary config for image uploads
├── middleware.js           # Custom middleware (auth, validation, etc.)
├── package.json
├── schema.js               # Joi validation schemas
├── init/
│   ├── data.js             # Sample listings data
│   └── index.js            # DB seeding script
├── listings/               # (empty or for future expansion)
├── models/
│   ├── listings.js         # Mongoose Listing model
│   ├── reviews.js          # Mongoose Review model
│   └── users.js            # Mongoose User model
├── public/
│   ├── css/
│   │   ├── rating.css      # Star rating styles
│   │   └── style.css       # Main styles
│   └── js/
│       └── script.js       # Client-side validation
├── routers/
│   ├── listings.js         # Listings routes
│   ├── reviews.js          # Reviews routes
│   └── user.js             # User auth routes
├── utils/
│   ├── ExpressError.js     # Custom error class
│   └── wrapasync.js        # Async error wrapper
└── views/
    ├── error.ejs
    ├── includes/
    │   ├── alerts.ejs
    │   ├── footer.ejs
    │   └── navbar.ejs
    ├── layouts/
    │   └── boilerplate.ejs
    ├── listings/
    │   ├── edit.ejs
    │   ├── index.ejs
    │   ├── new.ejs
    │   └── show.ejs
    └── users/
        ├── login.ejs
        └── Signup.ejs
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository:
    ```sh
    git clone <repo-url>
    cd airbndproject
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory with your Cloudinary credentials:
    ```
    CLOUD_NAME=your_cloud_name
    CLOUD_API_KEY=your_api_key
    CLOUD_API_SECRET=your_api_secret
    ```

4. Seed the database (optional, for sample data):

    ```sh
    node init/index.js
    ```

5. Start the server:

    ```sh
    node app.js
    ```

6. Visit [http://localhost:8080/listings](http://localhost:8080/listings) in your browser.

## Usage

- Sign up for a new account or log in.
- Create new property listings with images.
- Edit or delete your own listings.
- Leave reviews and ratings on listings.
- Delete your own reviews.

## Technologies Used

- Node.js, Express.js
- MongoDB, Mongoose
- Passport.js (authentication)
- EJS & EJS-Mate (templating)
- Bootstrap 5, custom CSS
- Cloudinary (image hosting)
- Joi (validation)
- connect-flash (flash messages)

## License

This project is for educational purposes.
