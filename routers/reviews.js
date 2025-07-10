const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listings.js");
const Review = require("../models/reviews.js");
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewschema} = require("../schema.js");
const {validatereview, isloggedIn, isreviewauthor} = require("../middleware.js");

//reviews
//post route for reviews
router.post("/",
    validatereview,
    isloggedIn,
    wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);

    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    console.log(newReview);

    await newReview.save();
    await listing.save();
    console.log("review added");
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
}))

//delete route for reviews
router.delete("/:reviewid",
    isloggedIn,
    isreviewauthor,
    wrapAsync(async(req,res)=>{
    let{id, reviewid} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await Review.findByIdAndDelete(reviewid);
    res.redirect(`/listings/${id}`);
}))

module.exports = router;
