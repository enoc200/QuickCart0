import connectDB from "@/config/db";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ success: true, message: "DB connected" });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
