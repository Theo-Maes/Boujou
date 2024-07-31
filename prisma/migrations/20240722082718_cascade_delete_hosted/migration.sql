-- DropForeignKey
ALTER TABLE "Host" DROP CONSTRAINT "Host_groupId_fkey";

-- DropForeignKey
ALTER TABLE "HostedUser" DROP CONSTRAINT "HostedUser_hostId_fkey";

-- AddForeignKey
ALTER TABLE "HostedUser" ADD CONSTRAINT "HostedUser_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Host" ADD CONSTRAINT "Host_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
