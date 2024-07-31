-- DropForeignKey
ALTER TABLE "DriverPassenger" DROP CONSTRAINT "DriverPassenger_userId_fkey";

-- AddForeignKey
ALTER TABLE "DriverPassenger" ADD CONSTRAINT "DriverPassenger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
