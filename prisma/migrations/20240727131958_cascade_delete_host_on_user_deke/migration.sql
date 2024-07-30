-- DropForeignKey
ALTER TABLE "Host" DROP CONSTRAINT "Host_userId_fkey";

-- AddForeignKey
ALTER TABLE "Host" ADD CONSTRAINT "Host_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
