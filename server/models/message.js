import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  text: String,
  timestamp: String,
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
