import mongoose from "mongoose";
const { Schema } = mongoose;
import recipientSchema from "./Recipient.js";

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [recipientSchema], //será um array contendo uma subcoleção
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date, //data que foi criada a pesquisa
  lastResponded: Date, //data mais recente que alguém respondeu.
});

mongoose.model("Survey", surveySchema);
