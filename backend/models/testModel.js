import mongoose from "mongoose";

const testSchema=mongoose.Schema({
    test:{
        required:true,
        type:String
    },
    postedBy: {
        required: true,
        type: 'ObjectId',
        ref: 'User'
    }
},{timestamps:true})

const Test=mongoose.model("Test",testSchema);

export default Test;