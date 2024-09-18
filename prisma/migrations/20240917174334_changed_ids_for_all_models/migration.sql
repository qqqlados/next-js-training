/*
  Warnings:

  - The primary key for the `Album` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Photo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_userId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "Album" DROP CONSTRAINT "Album_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Album_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Album_id_seq";

-- AlterTable
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "albumId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Photo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Photo_id_seq";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "tags" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "likes" SET DEFAULT 0,
ALTER COLUMN "dislikes" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
