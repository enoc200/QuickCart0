import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id:{ 
    type: String, required: true, unique: true 
  },
  name: { 
    type: String, required: true 
  },
  email: {
     type: String, required: true, unique: true
     },
   imageUrl:{ 
    type: String,required:true 
  },  
  cartItems:{
    type:Object,default:{}
  }
  
},{minimize:false});

// Prevent model overwrite error in Next.js hot reload
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;


