import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String
});

//cria o modelo dentro do moongose e no mongoDb, segundo argumento propriedades
mongoose.model('users', userSchema);
