require('dotenv').config();
const express = require('express');
const app = express();
const mongoose=require('mongoose');
const methodOverride = require('method-override');
app.use(methodOverride("_method"));
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
const session=require("express-session")
const MongoStore = require('connect-mongo');
const dbUrl=process.env.Atlas_db;

console.log("MongoDB URL:", dbUrl);

// Error Handling
main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=> {
    console.log(err)});
// main fxn to connect to DB
async function main() {
    await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
    mongoUrl : process.env.Atlas_db,
    crypto : {
        secret : process.env.variable, 
    },
    touchAfter : 24 * 60 * 60,
});

store.on("error",()=>{
    console.log("ERROR in MONGODB",err);
})
const sessionOptions={
    store,
    secret:process.env.variable,
    resave:false,
    saveUninitialized: true,
    Cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        
    },
};



app.use(session(sessionOptions));

const passport=require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const wrapAsync = require("./public/util/WrapAsync.js");
const review = require('./models/review.js');

// passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// signup
app.post("/signup",wrapAsync(async(req,res)=>{
    let { username,email,password}=req.body;
    const newuser=new User({username,email,password});
    const registereduser=await User.register(newuser,password);
    console.log(registereduser);
    res.redirect("/login");
}));

// login 
app.post("/login",passport.authenticate('local',
    { failureRedirect: '/login' }),async(req,res)=>{
        res.redirect("/");
})
app.get("/lander",(req,res)=>{
    res.render('../Home_page/lander.ejs');
})
app.get("/",(req,res)=>{
    if(!req.isAuthenticated()){
        console.log("Log in first");
        return res.render("../Home_page/login/login.ejs");
    }
    res.render('../Home_page/index.ejs');
})
app.get("/destination",(req,res)=>{
    res.render('../Destinations/destinations.ejs');
})
app.get("/about",(req,res)=>{
    res.render('../about/about.ejs');
})
app.get("/contact",(req,res)=>{
    res.render('../contact/contact.ejs');
})
app.get("/package",(req,res)=>{
    res.render('../packages/packages.ejs');
})
app.get("/reviews",async (req,res)=>{
    const allreview=await review.find({})
    res.render("../Home_page/reviews/reviews.ejs",{allreview});
})
app.post("/reviews",async(req,res)=>{
    let{username,rating,description}=req.body;
    const newactivity = new review({username,rating,description});
    await newactivity.save();
    console.log("review saved");
    res.redirect("/reviews")
})
app.delete('/reviews/:id',async (req,res)=>{
    let {id}=req.params;
    let deleted=await review.findByIdAndDelete(id);
    console.log("Deleted");
    res.redirect('/reviews');
})
app.get("/login",(req,res)=>{
    res.render("../Home_page/login/login.ejs");
})
app.get("/signup",(req,res)=>{
    res.render("../Home_page/login/signup/signup.ejs");
})
app.get('/logout',(req, res, next)=>{
    req.logout((err)=> {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });
app.get("/paris",(req,res)=>{
    res.render("../destPages/paris.ejs");
})
app.get("/newyork",(req,res)=>{
    res.render("../destPages/new-york.ejs");
})
app.get("/tokyo",(req,res)=>{
    res.render("../destPages/tokyo.ejs");
})
app.listen(8080, () => {
    console.log(`Server running`);
});

