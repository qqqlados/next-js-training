/*
  Warnings:

  - A unique constraint covering the columns `[likedPostId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likedPostId" TEXT;

-- CreateTable
CREATE TABLE "LikedPost" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LikedPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LikedPost_postId_key" ON "LikedPost"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "LikedPost_postId_userId_key" ON "LikedPost"("postId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_likedPostId_key" ON "Post"("likedPostId");

-- AddForeignKey
ALTER TABLE "LikedPost" ADD CONSTRAINT "LikedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedPost" ADD CONSTRAINT "LikedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
