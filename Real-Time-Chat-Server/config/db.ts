import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    });
    await mongoose.connection.db?.admin().command({ ping: 1 });
    console.log(`mongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectDB };
