const mongoose = require("mongoose");
const reviews = require("./reviews");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type:String,
        requird: true,
    },
    description:  {
        type:String,
        requird: true,
    },
    image:{
        url:String,
        filename:String,
    },
    price: {
        type:Number,
        requird: true,
    },
    location: {
        type:String,
        requird: true,
    },
    country: {
        type:String,
        requird: true,
    },
    reviews: [
        {
            type:Schema.Types.ObjectId,
            ref:"reviews"
        }
    ],
    owner: {
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

listingSchema.post("findOneAndDelete", async function(listing){
    if(listing){
        await reviews.deleteMany({
            _id:{
                $in:listing.reviews
            }
        })
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;