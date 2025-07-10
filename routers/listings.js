const express = require("express");
const router = express.Router();
const Listing =  require("../models/listings.js");
const wrapAsync = require("../utils/wrapasync.js");
const {isloggedIn, isOwner , validateListing} = require("../middleware.js");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage }); 



//index route
router.get("/",wrapAsync(async (req,res)=>{
    let allListings = await Listing.find();
    res.render("index.ejs",{allListings});
}))


//new route
router.get("/new",isloggedIn, (req,res)=>{
    res.render("new.ejs");
})


//show route
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({
        path:"reviews",
            populate:{
                path:"author"
            }
        }).populate("owner");
    if(!listing){
        req.flash("error","The Listing you are searching for is not available!");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("show.ejs",{listing});
}))

//create route
router.post(
    "/",
    isloggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(async (req, res, next) => {
      console.log("File upload middleware executed");
      if (!req.file) {
        console.error("File upload failed: req.file is undefined");
        req.flash("error", "File upload failed!");
        return res.redirect("/listings/new");
      }
      console.log("File uploaded successfully:", req.file);
      let url = req.file.path;
      let filename = req.file.filename;
      const newListing = new Listing(req.body.listing);
      newListing.image = { url, filename };
      newListing.owner = req.user._id;
      await newListing.save();
      req.flash("success", "New Listing Created!");
      res.redirect("/listings");
    })
  );

//edit route
router.get("/:id/edit",
    isloggedIn,
    isOwner,
    wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    let originalimageurl = listing.image.url;
    originalimageurl.replace("upload/","upload/w_200,h_200,c_thumb/");
    res.render("edit.ejs", {listing , originalimageurl});
}))

//update route
router.put("/:id",
    isloggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url , filename};
    listing.save();
    req.flash("success","listing updated successfully!");
    res.redirect(`/listings/${id}`);
}))

//delete route
router.delete("/:id",
    isloggedIn,
    isOwner,
    wrapAsync(async (req,res)=>{
    let {id} =req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    req.flash("success","listing Deleted successfully!");
    res.redirect("/listings");
}))

module.exports = router;
