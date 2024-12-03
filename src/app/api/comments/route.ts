import Comment from "@/Model/Comment";
import connectDB from "@/_lib/connectDB";

export async function GET() {
  try {
    await connectDB();
    const comments = await Comment.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, text, parentCommentId } = await req.json();
    const newComment = new Comment({ name, text, parentCommentId });
    await newComment.save();
    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { commentId } = await req.json();
    if (!commentId) {
      return new Response(JSON.stringify({ error: "Comment ID is required" }), {
        status: 400,
      });
    }

    const _id = commentId;
    const deletedComment = await Comment.findByIdAndDelete(_id);
    if (!deletedComment) {
      return new Response(JSON.stringify({ error: "Comment not found" }), {
        status: 404,
      });
    }
    return new Response(
      JSON.stringify({ message: "Comment deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
