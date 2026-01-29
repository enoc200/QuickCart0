import connectDB from "@/config/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    // Test user insert
    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
    });

    return Response.json({
      success: true,
      message: "User inserted successfully",
      user,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
