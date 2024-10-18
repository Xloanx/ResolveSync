import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const prisma = new PrismaClient();


async function fetchRandomUser() {
  const response = await fetch('https://randomuser.me/api/');
  const data = await response.json();
  return {
    name: `${data.results[0].name.first} ${data.results[0].name.last}`,
    email: data.results[0].email,
    passwordHash: 'password', // Replace with a proper hash function
    image: data.results[0].picture.thumbnail,
  };
}

async function fetchLoremIpsum() {
  const response = await fetch('https://baconipsum.com/api/?type=all-meat&paras=1&format=json');
  const data = await response.json();
  return data[0];
}


// Seed Users
async function main() {
  
  const user1 = await fetchRandomUser();
  const createdUser1 = await prisma.user.create({
    data: {
      ...user1,
      role: 'ADMIN',
    },
  });

  const user2 = await fetchRandomUser();
  const createdUser2 = await prisma.user.create({
    data: {
      ...user2,
      role: 'CUSTOMER',
    },
  });

  const user3 = await fetchRandomUser();
  const createdUser3 = await prisma.user.create({
    data: {
      ...user3,
      role: 'CUSTOMER',
    },
  });

  const user4 = await fetchRandomUser();
  const createdUser4 = await prisma.user.create({
    data: {
      ...user4,
      role: 'QAM',
    },
  });

  const user5 = await fetchRandomUser();
  const createdUser5 = await prisma.user.create({
    data: {
      ...user5,
      role: 'AGENT',
    },
  });

  const user6 = await fetchRandomUser();
  const createdUser6 = await prisma.user.create({
    data: {
      ...user6,
      role: 'AGENT',
    },
  });

  const user7 = await fetchRandomUser();
  const createdUser7 = await prisma.user.create({
    data: {
      ...user7,
      role: 'QAM',
    },
  });

  const user8 = await fetchRandomUser();
  const createdUser8 = await prisma.user.create({
    data: {
      ...user8,
      role: 'CUSTOMER',
    },
  });

  const user9 = await fetchRandomUser();
  const createdUser9 = await prisma.user.create({
    data: {
      ...user9,
      role: 'CUSTOMER',
    },
  });

  const user10 = await fetchRandomUser();
  const createdUser10 = await prisma.user.create({
    data: {
      ...user10,
      role: 'AGENT',
    },
  });

  const user11 = await fetchRandomUser();
  const createdUser11 = await prisma.user.create({
    data: {
      ...user11,
      role: 'AGENT',
    },
  });

  const user12 = await fetchRandomUser();
  const createdUser12 = await prisma.user.create({
    data: {
      ...user12,
      role: 'CUSTOMER',
    },
  });

  const user13 = await fetchRandomUser();
  const createdUser13 = await prisma.user.create({
    data: {
      ...user13,
      role: 'CUSTOMER',
    },
  });

  const user14 = await fetchRandomUser();
  const createdUser14 = await prisma.user.create({
    data: {
      ...user14,
      role: 'CUSTOMER',
    },
  });

  const user15 = await fetchRandomUser();
  const createdUser15 = await prisma.user.create({
    data: {
      ...user15,
      role: 'CUSTOMER',
    },
  });

  const user16 = await fetchRandomUser();
  const createdUser16 = await prisma.user.create({
    data: {
      ...user16,
      role: 'ADMIN',
    },
  });



  // Seed Issues
  const issue1Description = await fetchLoremIpsum();
  const issue2Description = await fetchLoremIpsum();
  const issue3Description = await fetchLoremIpsum();
  const issue4Description = await fetchLoremIpsum();
  const issue5Description = await fetchLoremIpsum();
  const issue6Description = await fetchLoremIpsum();
  const issue7Description = await fetchLoremIpsum();
  const issue8Description = await fetchLoremIpsum();
  const issue9Description = await fetchLoremIpsum();
  const issue10Description = await fetchLoremIpsum();
  const issue11Description = await fetchLoremIpsum();
  const issue12Description = await fetchLoremIpsum();
  const issue13Description = await fetchLoremIpsum();
  const issue14Description = await fetchLoremIpsum();
  const issue15Description = await fetchLoremIpsum();
  const issue16Description = await fetchLoremIpsum();
  const issue17Description = await fetchLoremIpsum();
  const issue18Description = await fetchLoremIpsum();
  const issue19Description = await fetchLoremIpsum();
  const issue20Description = await fetchLoremIpsum();

  await prisma.ticket.create({
    data: {
      title: 'First Issue',
      description: issue1Description,
      reporterId: createdUser2.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'Second Issue',
      description: issue2Description,
      reporterId: createdUser8.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'First Issue',
      description: issue3Description,
      reporterId: createdUser9.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'Second Issue',
      description: issue4Description,
      reporterId: createdUser2.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'First Issue',
      description: issue5Description,
      reporterId: createdUser12.id,
      status: 'RESOLVED',
      priority: 'MEDIUM',
      assignedToId: createdUser5.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'Second Issue',
      description: issue6Description,
      reporterId: createdUser8.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'First Issue',
      description: issue7Description,
      reporterId: createdUser15.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'Second Issue',
      description: issue8Description,
      reporterId: createdUser3.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'First Issue',
      description: issue9Description,
      reporterId: createdUser9.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'Faulty UI',
      description: issue10Description,
      status: 'OPEN',
      priority: 'MEDIUM',
      reporterId: createdUser13.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'Some Issue',
      description: issue11Description,
      reporterId: createdUser8.id,
      status: 'RESOLVED',
      priority: 'HIGH',
      assignedToId: createdUser11.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'Twelvth Issue',
      description: issue12Description,
      reporterId: createdUser14.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'First Issue',
      description: issue1Description,
      reporterId: createdUser15.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'Second Issue',
      description: issue2Description,
      reporterId: createdUser9.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'First Issue',
      description: issue1Description,
      reporterId: createdUser15.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'Second Issue',
      description: issue2Description,
      reporterId: createdUser12.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'First Issue',
      description: issue1Description,
      reporterId: createdUser14.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'Second Issue',
      description: issue2Description,
      reporterId: createdUser2.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'First Issue',
      description: issue1Description,
      reporterId: createdUser14.id,
    },
  });

  await prisma.ticket.create({
    data: {
      title: 'Second Issue',
      description: issue20Description,
      reporterId: createdUser3.id
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });