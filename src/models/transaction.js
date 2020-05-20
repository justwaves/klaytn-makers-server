import mongoose from "mongoose";

const { Schema } = mongoose;

const TxSchema = new Schema({
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
  type: String,
  blockNumber: Number,
  blockHash: String,
  from: String,
  to: String,
  gas: String,
  gasPrice: String,
  gasUsed: Number,
  transactionHash: String,
  typeName: String,
  klay: Number,
  TxFee: Number,
  orderDate: Number,
});

const Tx = mongoose.model("Tx", TxSchema);
export default Tx;
