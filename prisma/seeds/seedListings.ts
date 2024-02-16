import { prisma } from "@/lib/database/client";

async function seedListings() {
  await prisma.listing.create({
    data: {
      address: '123 Pinecrest Drive, Cinco Ranch, TX 77001',
      description: 'A stunning home with a great view.',
      beds: 5,
      baths: 3,
      area: 3500,
      price: 3000000,
      pictures: ['public/home1.webp'], 
    },
  });

  await prisma.listing.create({
    data: {
      address: '456 Oakridge Lane, Houston, TX 77002',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
       exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse`,
      beds: 4,
      baths: 2,
      area: 5000,
      price: 1800000,
      pictures: ['public/home2.jpeg'], 

    },
  });

  await prisma.listing.create({
    data: {
      address: '789 Meadowbrook Avenue, Houston, TX 77003',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse`,      
      beds: 6,
      baths: 4,
      area: 2000,
      price: 1600000,
      pictures: ['public/home3.jpeg'], 

    },
  });

  await prisma.listing.create({
    data: {
      address: '101 Riverbend Road, Missouri City, TX 77004',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse`,     
      beds: 3,
      baths: 2,
      area: 7500,
      price: 350000,
      pictures: ['public/home4.jpg'], 

    },
  });

  await prisma.listing.create({
    data: {
      address: '202 Sunset Boulevard, Pearland, TX 77005',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse`,     
      beds: 4,
      baths: 3,
      area: 4000,
      price: 1500000,
      pictures: ['public/home5.jpeg'], 

    },
  });

  await prisma.listing.create({
    data: {
      address: '303 Lakeside Drive, Richmond, TX 77006',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse`,     
      beds: 5,
      baths: 2,
      area: 3000,
      price: 2000000,
      pictures: ['public/home6.jpeg'], 

    },
  });

}


seedListings()
 