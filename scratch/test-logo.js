import sharp from "sharp";
import path from "path";
import fs from "fs";

const inputPath = path.resolve("logo.png");
console.log("Input image path:", inputPath);

async function run() {
  const metadata = await sharp(inputPath).metadata();
  console.log("Metadata:", metadata);
}

run().catch(console.error);
