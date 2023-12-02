-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `model` VARCHAR(191) NOT NULL,
    `make` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `history` BOOLEAN NOT NULL,
    `milage` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `deal` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reviews` (
    `reviewID` INTEGER NOT NULL AUTO_INCREMENT,
    `review` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `carID` INTEGER NOT NULL,
    `userID` INTEGER NOT NULL,
    `time` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Reviews_review_key`(`review`),
    PRIMARY KEY (`reviewID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_carID_fkey` FOREIGN KEY (`carID`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;


INSERT INTO `Car` VALUES (1,'eVToL','XPeng','Driven by our vision of \'tech for the greater good\' and customers\' evolving demands, we continue to reach technical breakthroughs and set new industry benchmarks,','Sedan',1000000,'https://media.npr.org/assets/img/2022/11/02/3_custom-71a63a232a91d5339ea937a57e32bee6c06fa9ee.jpg',2024,0,0,1,0),(4,'Cybertruck','Tesla','BETTER UTILITY THAN A TRUCK WITH MORE PERFORMANCE THAN A SPORTS CAR','Truck',60000,'https://www.teslarati.com/wp-content/uploads/2023/09/tesla-cybertruck-residential-e1694691271816.jpeg',2024,0,0,2,0),(6,'Model X','Tesla','Model X is built for utility and performance, with standard AWD, best in class storage and the highest towing capacity of any electric SUV','SUV',50000,'https://i.vimeocdn.com/video/1533953944-2bdd92c230dc32770ceda32de016cf7e51511ceb1aae4b5f271e437178ccb550-d_640?f=webp',2023,0,4000,2,0),(7,'I8','BMW','The BMW i8 is a plug-in hybrid sports car developed by BMW. The i8 was part of BMW\'s electrified fleet and was marketed under the BMW','Sedan',90000,'https://editorials.autotrader.ca/media/161535/2019-bmw-i8-roadster-04-jp.jpg?center=0.5,0.46636771300448432&mode=crop&width=1920&height=1080&rnd=131859718387200000',2020,0,5000,7,0),(8,'F-150','Ford','All-In-One, The Perfect Mix Of Sophistication Intelligence & Strength. Find Perfect Truck.','Truck',80000,'https://www.topgear.com/sites/default/files/images/news-listicle/items2/2021/06/5e939f917cba8e7ca7c5981449a1166f/2_16x9.jpg?w=1654&h=930',2020,0,800,9,0),(9,'Endurance','Lordstown','The Endurance itself is supposed to be a proper work truck, more like the F-150 than the Rivian, with four in-wheel hub motors and a 109kWh battery for a claimed 250+ miles of range.','Truck',100000,'https://www.topgear.com/sites/default/files/images/news-listicle/items2/2021/06/5e939f917cba8e7ca7c5981449a1166f/120388852_957305744792768_442606673607798531_n.jpg?w=1654&h=930',2019,1,10000,6,0),(10,'Hummer','GMC','Known for its status as a heavy-duty vehicle by the EPA','Truck',112595,'https://cdn.motor1.com/images/mgl/KbmkX0/s1/2024-gmc-hummer-ev-suv.webp',2022,0,100,50,1),(11,'R1S','Rivian','Drive through 3+ feet of water. Rock crawl a 100% grade. Traverse just about any terrain','Truck',79000,'https://media.cnn.com/api/v1/images/stellar/prod/220705112819-embargoed-01-rivian-r1s-suv-review.jpg?c=original',2021,0,2000,25,0),(12,'E-Tron','Audi','A sizable 95.0-kWh lithium-ion battery pack and two electric motors (one at each axle) generate a peak of 402 horsepower and 490 pound-feet of torque.','SUV',71995,'https://www.audi-mediacenter.com/system/production/media/71164/images/a41672e1a01de586f023e4491da3f88548b52984/A1814539_web_2880.jpg?1698345785',2023,0,1853,33,0),(13,'Taycan','Porsche','Porsche\'s Taycan EV line now includes a wagon body style with an off-tarmac twist. Dubbed the Taycan Cross Turismo, the off-road-oriented wagon benefits from a raised ride height','Sedan',99150,'https://ev-database.org/img/auto/Porsche_Taycan_4S_Cross_Turismo/Porsche_Taycan_4S_Cross_Turismo-01.jpg',2019,0,10,21,0),(14,'EQS','Mercedes','The blob-shaped EQS SUV is based on the EQS sedan and features many of the same futuristic features as that luxury car, including the massive Hyperscreen infotainment setup','SUV',105550,'https://www.motortrend.com/uploads/sites/5/2021/07/2022-Mercedes-Benz-EQS15.jpg',2022,0,1250,12,1),(15,'Lyriq','Cadillac','Cadillac’s first entry into the luxury electric SUV category is the slick-looking Lyriq','SUV',60000,'https://media.cadillac.com/dld/content/dam/Media/images/US/Vehicles/Cadillac/LYRIQ/Product/Cadillac-LYRIQ-026.jpg',2024,0,0,15,1),(16,'Ford','Mustang','Just because it doesn\'t have the growl of Mustangs before it, doesn\'t mean the Ford Mustang Mach-E can\'t run wild','Sedan',44795,'https://i.gaw.to/content/photos/45/32/453218-ford-mustang-mach-e-2021.jpeg?1024x640',2023,0,353,22,0),(17,'I4','BMW','The BMW i4 is an electric sedan available in three distinct flavors: the sensible eDrive35, the mid-level eDrive40, and the racier M50.','Sedan',52995,'https://www.bmw.ca/content/dam/bmw/common/all-models/i-series/i4/onepager-new/bmw-i4-edrive-40-onepager-ms-sustainability.jpg',2019,0,685,75,0);
