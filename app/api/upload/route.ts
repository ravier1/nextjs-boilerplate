import { createUploadthing, type FileRouter } from "uploadthing/server";
import { utapi } from "uploadthing/server";
import { NextResponse } from "next/server";

const f = createUploadthing();

const fileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Upload complete:", file.url);
    return { fileUrl: file.url };
  }),
} satisfies FileRouter;

export const POST = async (req: Request) => {
  try {
    const result = await fileRouter.imageUploader.handler(req);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Upload failed", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
};
