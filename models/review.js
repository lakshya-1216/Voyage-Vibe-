const mongoose=require("mongoose");
const schema=mongoose.Schema;
const listingschema=new schema({
    username:{
        type:String,
        required:true,
    },
    rating:String,
    description:String
});
const review=mongoose.model("review",listingschema);
module.exports=review;