import mongoose from "mongoose";
import User from "./users.js"

const { Schema } = mongoose

const adminSchema = new Schema({
 user: { type: Schema.Types.ObjectId, ref: 'User' } ,
  });

export default mongoose.model('Admin', adminSchema);
