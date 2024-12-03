import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const CommentSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, default: uuidv4() },
        name: { type: String, required: true },
        text: { type: String, required: true },
        parentCommentId: { type: String, default: null },
        createdAt: { type: Date, default: Date.now },
    },
);

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);