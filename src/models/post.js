import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
  tokenId: Number,
  description: String,
  photo: String,
  price: Number,
  targetCount: Number,
  dDay: String,
  buyers: [String],
  count: Number,
  status: Number,
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
