if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const moongose = require("mongoose");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const {listingschema , reviewschema} = require("./schema.js");
const session = require("express-session");
const path = require("path");
const reviews = require("./models/reviews.js");
const flash = require("connect-flash");
const passport = require("passport");
const Localstrategy = require("passport-local");
const User = require("./models/users.js");

const listingsRouter = require("./routers/listings.js");
const reviewRouter = require("./routers/reviews.js");
const userRouter = require("./routers/user.js");

const mongoose_url = "mongodb://127.0.0.1:27017/airbnd";

app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views/listings"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine("ejs",ejsmate);

main()
.then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(mongoose_url);
}

const sessionOptions = {
    secret:"mysecreatestring",
    resave:false,
    saveUninitialized : true,
    cookie : {
        expires:Date.now() +7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.successmsg = req.flash("success");
    res.locals.errormsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

//listings routers
app.use("/listings",listingsRouter);  //this is the main router

//reviews routers
app.use("/listings/:id/review",reviewRouter); //this is the review Router

//users routers
app.use("/" , userRouter); //this is the users router

app.all("*",(req,res,next)=>{
    next(new ExpressError("Page not found",404));
})

app.use((err,req,res,next)=>{
   let {StatusCode=500, message="something went Wrong!"} = err;//these are default values
//    res.status(StatusCode).send(message);
    res.render("../error.ejs",{err});
})

app.get("/",(req,res)=>{
    res.send("serverworking well!");
})

app.listen(8080,()=>{
    console.log("app listening port 8080");
})