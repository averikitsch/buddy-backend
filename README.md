# Buddy - Node JS + Express + MongoDB

Buddy-backend is a Node JS + Express + MongoDB API used with the react native app [Buddy](https://github.com/averikitsch/buddy-capstone) to save profile information.

Find this API on [Heroku](https://buddy-backend.herokuapp.com/)

## Installation
1. First clone this repo: `git clone https://github.com/averikitsch/buddy-backend.git`
```
cd ../buddy-backend
npm install
```

2. The easiest way to set up a Mongo database is through [mLab](https://mlab.com/).
Initialize a new database, then copy the url and add your username and password (the ones from the database user, not your mLab account) into the URL. Set this url as your *MONGO_URI* environment variable.

3. Add localhost as your server in your react-native app.
Then start your server:
```
npm start
```
## Routes

- **Retrieve all data**
  - GET
  - `'/users'`
- **Create User'**
  - POST
  - `'/users'`
- **Get a User**
  - GET
  - `'/users/:userId'`
- **Update a User**
  - PUT
  - `'/users/:userId'`
  - params: `{LogList: [], WishList: []}`
- **Find User**
  - POST
  - `'/users/provider/:provider'`
  - params: `{userId: XXXX }`
