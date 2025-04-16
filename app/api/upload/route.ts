import { createRouteHandler } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/server";
import type { NextRequest } from "next/server";

const f = createUploadthing();

const fileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      console.log("✅ Upload complete:", file.url);
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export const { POST }: { POST: (req: NextRequest) => Promise<Response> } = createRouteHandler({
  router: fileRouter,
});
