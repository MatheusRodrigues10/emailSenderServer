import mongoose from "mongoose";
const { Schema } = mongoose;

//sub coleção do email e se respondeu ou não
const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});

export default recipientSchema;
