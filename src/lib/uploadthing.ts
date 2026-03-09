/**
 * File upload configuration using Uploadthing
 * For resume PDF/DOCX uploads
 */

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// Auth function - replace with your actual auth check
const auth = (req: Request) => ({ id: "user_id_placeholder" }); // TODO: Replace with real auth

// File router for resume uploads
export const ourFileRouter = {
  // Resume uploader - accepts PDF and DOCX
  resumeUploader: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      // Authenticate user
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Resume uploaded successfully:", file.url);
      console.log("Uploaded by user:", metadata.userId);
      
      // Return data to client
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
