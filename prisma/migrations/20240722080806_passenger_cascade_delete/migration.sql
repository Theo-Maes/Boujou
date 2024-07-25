-- DropForeignKey
ALTER TABLE "DriverPassenger" DROP CONSTRAINT "DriverPassenger_driverId_fkey";

-- AddForeignKey
ALTER TABLE "DriverPassenger" ADD CONSTRAINT "DriverPassenger_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;
