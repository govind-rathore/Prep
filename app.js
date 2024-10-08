const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routs/blogRoutes');
const quesRoutes = require('./routs/quesRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');
const authRouters = require('./routs/authRoutes');

const app = express();
//view engine
app.set('view engine', 'ejs');
app.set('views', 'project');

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

//database connection
const dbURI = "mongodb+srv://rathoregovind2000:Fd9IGJKEkyWPYXY5@cluster0.bojnw.mongodb.net/";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Database connected');
        
    })
    .catch((err) => console.log(err));


//routes
app.get('*', checkUser);
app.get('/', (req, res) => {
    res.render('pages/home', { title: 'home' });
});
app.use('/blogs', requireAuth, blogRoutes);
app.use('/ques', requireAuth, quesRoutes);
app.use(authRouters);
app.get('/about', (req, res) => {
    res.render('pages/about', { title: 'about' });
});
app.use((req, res) => {
    res.render('pages/404', { title: 'error' });
});
