import app from "./src/app.js";
import connectDB from "./config/db.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${process.env.PORT}`);
});
