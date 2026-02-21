import app from "./app.ts";
import "dotenv/config";

if (!process.env.API_KEY) {
  throw new Error("API_KEY is not defined in environment variables");
}

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
