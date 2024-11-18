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

  const user17 = await fetchRandomUser();
  const createdUser17 = await prisma.user.create({
    data: {
      ...user17,
      role: 'AGENT',
    },
  });

  const user18 = await fetchRandomUser();
  const createdUser18 = await prisma.user.create({
    data: {
      ...user18,
      role: 'AGENT',
    },
  });

  const user19 = await fetchRandomUser();
  const createdUser19 = await prisma.user.create({
    data: {
      ...user19,
      role: 'AGENT',
    },
  });

  const user20 = await fetchRandomUser();
  const createdUser20 = await prisma.user.create({
    data: {
      ...user20,
      role: 'AGENT',
    },
  });

  console.log('Users created:', createdUser1, createdUser2, createdUser3, createdUser4, createdUser5, 
                                createdUser6, createdUser7, createdUser8, createdUser9, createdUser10,
                                createdUser11, createdUser12, createdUser13, createdUser14, createdUser15,
                                createdUser16, createdUser17, createdUser18, createdUser19, createdUser20,
                              );

  // Seed tickets
  const ticket1Description = await fetchLoremIpsum();
  const ticket2Description = await fetchLoremIpsum();
  const ticket3Description = await fetchLoremIpsum();
  const ticket4Description = await fetchLoremIpsum();
  const ticket5Description = await fetchLoremIpsum();
  const ticket6Description = await fetchLoremIpsum();
  const ticket7Description = await fetchLoremIpsum();
  const ticket8Description = await fetchLoremIpsum();
  const ticket9Description = await fetchLoremIpsum();
  const ticket10Description = await fetchLoremIpsum();
  const ticket11Description = await fetchLoremIpsum();
  const ticket12Description = await fetchLoremIpsum();
  const ticket13Description = await fetchLoremIpsum();
  const ticket14Description = await fetchLoremIpsum();
  const ticket15Description = await fetchLoremIpsum();
  const ticket16Description = await fetchLoremIpsum();
  const ticket17Description = await fetchLoremIpsum();
  const ticket18Description = await fetchLoremIpsum();
  const ticket19Description = await fetchLoremIpsum();
  const ticket20Description = await fetchLoremIpsum();

  const t1 = await prisma.ticket.create({
    data: {
      title: 'Faulty UI',
      description: ticket1Description,
      reporter: {
        connect: {
          id: createdUser2.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t2 = await prisma.ticket.create({
    data: {
      title: 'Broken DB',
      description: ticket2Description,
      reporter: {
        connect: {
          id: createdUser8.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t3 = await prisma.ticket.create({
    data: {
      title: 'Unresolved Feed Lines',
      description: ticket3Description,
      reporter: {
        connect: {
          id: createdUser9.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t4 = await prisma.ticket.create({
    data: {
      title: 'Comments cannot be Liked',
      description: ticket4Description,
      reporter: {
        connect: {
          id: createdUser2.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t5 = await prisma.ticket.create({
    data: {
      title: 'User Search Raises Error',
      description: ticket5Description,
      status: 'RESOLVED',
      priority: 'MEDIUM',
      reporter: {
        connect: {
          id: createdUser12.id, // Assuming user1 was created earlier
        },
      },
      assignedUsers: {
        create: [
          {
            user: {
              connect: {
                id: createdUser5.id, // ID of the assigned user
              },
            },
          },
          // You can assign more users by adding more objects in this array
        ],
      },
    },
  });

  const t6 = await prisma.ticket.create({
    data: {
      title: 'Comment Send Button disappears',
      description: ticket6Description,
      reporter: {
        connect: {
          id: createdUser8.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t7 = await prisma.ticket.create({
    data: {
      title: 'Links cannot be clicked in comments',
      description: ticket7Description,
      reporter: {
        connect: {
          id: createdUser15.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t8 = await prisma.ticket.create({
    data: {
      title: 'Unresolved DB discrepancies',
      description: ticket8Description,
      reporter: {
        connect: {
          id: createdUser3.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t9 = await prisma.ticket.create({
    data: {
      title: 'Texts too tiny on Listing UI',
      description: ticket9Description,
      reporter: {
        connect: {
          id: createdUser9.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t10 = await prisma.ticket.create({
    data: {
      title: 'Slow Deployments',
      description: ticket10Description,
      status: 'OPEN',
      priority: 'MEDIUM',
      reporter: {
        connect: {
          id: createdUser13.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t11 = await prisma.ticket.create({
    data: {
      title: 'Console Errors displaying',
      description: ticket11Description,
      status: 'RESOLVED',
      priority: 'HIGH',
      reporter: {
        connect: {
          id: createdUser8.id, // Assuming user1 was created earlier
        },
      },
      assignedUsers: {
        create: [
          {
            user: {
              connect: {
                id: createdUser11.id, // ID of the assigned user
              },
            },
          },
          // You can assign more users by adding more objects in this array
        ],
      },
    },
  });

  const t12 = await prisma.ticket.create({
    data: {
      title: 'Merge Requests Delayed',
      description: ticket12Description,
      reporter: {
        connect: {
          id: createdUser14.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t13 = await prisma.ticket.create({
    data: {
      title: 'OAuth not implemented',
      description: ticket13Description,
      reporter: {
        connect: {
          id: createdUser15.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t14 = await prisma.ticket.create({
    data: {
      title: 'Console logs not deleted',
      description: ticket14Description,
      reporter: {
        connect: {
          id: createdUser9.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t15 = await prisma.ticket.create({
    data: {
      title: 'No automated tests ceated',
      description: ticket15Description,
      reporter: {
        connect: {
          id: createdUser15.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t16 = await prisma.ticket.create({
    data: {
      title: 'App Crashes',
      description: ticket16Description,
      reporter: {
        connect: {
          id: createdUser12.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t17 = await prisma.ticket.create({
    data: {
      title: 'Ambiguous Error messages',
      description: ticket17Description,
      reporter: {
        connect: {
          id: createdUser14.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t18= await prisma.ticket.create({
    data: {
      title: 'Authentication Errors',
      description: ticket18Description,
      reporter: {
        connect: {
          id: createdUser2.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t19 = await prisma.ticket.create({
    data: {
      title: 'Sidebar too narrow',
      description: ticket19Description,
      reporter: {
        connect: {
          id: createdUser14.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  const t20 = await prisma.ticket.create({
    data: {
      title: 'Missing Dashboard',
      description: ticket20Description,
      reporter: {
        connect: {
          id: createdUser3.id, // Assuming user1 was created earlier
        },
      },
    },
  });

  console.log('Tickets created:', t1,  t2,  t3,  t4,  t5, 
                                  t6,  t7,  t8,  t9,  t10,
                                  t11, t12, t13, t14, t15,
                                  t16, t17, t18, t19, t20,
  );


// Create team with members
const team1 = await prisma.team.create({
  data: {
    name: 'Development Team',
    members: {
      connect: [{ id: createdUser5.id }, { id: createdUser18.id }],
    },
  },
});

const team2 = await prisma.team.create({
  data: {
    name: 'Design Team',
    members: {
      connect: [{ id: createdUser6.id },{id: createdUser20.id}],
    },
  },
});

const team3 = await prisma.team.create({
  data: {
    name: 'Marketing',
    members: {
      connect: [{ id: createdUser10.id },{id: createdUser19.id}, {id:createdUser17.id}],
    },
  },
});

const team4 = await prisma.team.create({
  data: {
    name: 'Business Development',
    members: {
      connect: [{ id: createdUser11.id }],
    },
  },
});

console.log('Tickets created:', team1,  team2,  team3,  team4);

// Assign users to tickets using TicketAssignment
await prisma.ticketAssignment.create({
  data: {
    ticketId: t11.id,
    userId: createdUser11.id, 
  },
});

await prisma.ticketAssignment.create({
  data: {
    ticketId: t5.id,
    userId: createdUser5.id,
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