-- DropForeignKey
ALTER TABLE "HostedUser" DROP CONSTRAINT "HostedUser_userId_fkey";

-- AddForeignKey
ALTER TABLE "HostedUser" ADD CONSTRAINT "HostedUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
