const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listings");

const mongoose_url = "mongodb://127.0.0.1:27017/airbnd";

main()
.then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(mongoose_url);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({ 
        ...obj,owner: "67b9630e890bb61982fd4558"
    }))
    await Listing.insertMany(initData.data);
    console.log("data was intialized");
};

initDB();

