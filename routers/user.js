const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const passport = require("passport");
const wrapasync = require("../utils/wrapasync.js");
const { saveRedirectURl } = require("../middleware.js");

//Signup Users
router.get("/Signup",(req,res)=>{
    res.render("../users/Signup.ejs");
})

router.post("/Signup",wrapasync(async(req,res)=>{
    try{
        let{username,email,password} = req.body;
        let newuser = new User({username,email});
        let registereduser = await User.register(newuser,password);
        console.log(registereduser);
        req.login(registereduser,(err)=>{
            next(err);
        })
        req.flash("success","Welcome to Airbnd!");
        res.redirect("/listings");
    }catch(e){
        req.flash("error",e.message);
        console.log(e);
        res.redirect("/Signup");
    }
}))

//login routers
router.get("/login",(req,res)=>{
    res.render("../users/login.ejs");
});

router.post(
    "/login",
    saveRedirectURl,
    passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash: true
}),
async(req,res)=>{
    req.flash("success","Welcome to Airbnd!");
    res.redirect(res.locals.redirectUrl);
});

//logout route
router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("Success","logged out!");
        res.redirect("/listings");
    });
})


module.exports = router;