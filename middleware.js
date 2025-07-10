const Listing =  require("./models/listings");
const Review = require("./models/reviews.js");
const ExpressError = require("./utils/ExpressError");
const {listingschema , reviewschema} = require("./schema.js");


module.exports.isloggedIn = (req ,res , next) =>{
    // console.log(req.path,"..", req.originalUrl)
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be loggedIN to create a Listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectURl  = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "you are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
}

module.exports.validateListing = (req,res,next)=>{
    let {error} = listingschema.validate(req.body);
    if(error){
        let msg = error.details.map(el=>el.message).join(",");
        throw new ExpressError(msg,400);
    }else{
        next();
    }
}

module.exports.validatereview = (req,res,next)=>{
    const {error} = reviewschema.validate(req.body);
    if(error){
        const msg = error.details.map(el=>el.message).join(",");
        throw new ExpressError(msg,400);
    }else{
        next();
    }
}

module.exports.isreviewauthor = async (req,res,next) =>{
    let {id , reviewid} = req.params;
    let review = await Review.findById(reviewid);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "you are not the author of this Review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
