import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  credits: { type: Number, default: 0 },
});

//cria o modelo dentro do moongose e no mongoDb, segundo argumento propriedades
mongoose.model("users", userSchema);
