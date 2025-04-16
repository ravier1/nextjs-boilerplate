// app/api/upload/route.ts

import { createUploadthing, type FileRouter } from "uploadthing/server";
import { createRouteHandler } from "uploadthing/server";

// 1) Define your UploadThing router
const f = createUploadthing();
const fileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      console.log("✅ Upload complete:", file.url);
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

const handler = createRouteHandler({ router: fileRouter });

export { handler as POST };
