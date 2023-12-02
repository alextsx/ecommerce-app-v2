import { faker } from '@faker-js/faker';
import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const getRandomUserRole = () => {
  const roles = Object.values(UserRole);
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
};
const getRandomId = async (model: any) => {
  const records = await model.findMany();
  const randomIndex = Math.floor(Math.random() * records.length);
  return records[randomIndex].id;
};

const generateDataForAddress = () => ({
  line1: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
  country: faker.location.country(),
  zipcode: faker.location.zipCode()
});

const seedCategories = async () => {
  const categories = Array.from({ length: 10 }, () => ({
    name: faker.commerce.department()
  }));

  for (const category of categories) {
    await prisma.category.create({ data: category });
  }
};

const seedProductsAndRelated = async () => {
  const products = await Promise.all(
    Array.from({ length: 50 }).map(async () => {
      const randomCategoryId = await getRandomId(prisma.category);
      return {
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        inventory: faker.number.int({ min: 5, max: 100 }),
        category: { connect: { id: randomCategoryId } }
      };
    })
  );

  for (const product of products) {
    const createdProduct = await prisma.product.create({ data: product });

    await prisma.productImage.create({
      data: { url: faker.image.urlPicsumPhotos(), productId: createdProduct.id }
    });

    const randomUserId = await getRandomId(prisma.user);
    await prisma.review.create({
      data: {
        rating: faker.number.int({ min: 1, max: 5 }),
        user: { connect: { id: randomUserId } },
        body: faker.lorem.paragraph(),
        product: { connect: { id: createdProduct.id } }
      }
    });
  }
};

const seedUsersAndRelated = async () => {
  const users = Array.from({ length: 20 }, () => ({
    email: faker.internet.email(),
    password: bcrypt.hashSync(faker.internet.password(), 10),
    role: getRandomUserRole()
  }));

  for (const user of users) {
    const createdUser = await prisma.user.create({ data: user });

    await prisma.userDetails.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: faker.phone.number(),
        billingAddress: { create: generateDataForAddress() },
        shippingAddress: { create: generateDataForAddress() },
        user: { connect: { id: createdUser.id } }
      }
    });
  }
};

const seedCustomersAndRelated = async () =>
  Promise.all(
    Array.from({ length: 20 }).map(async () => {
      const shippingAddress = await prisma.address.create({
        data: {
          ...generateDataForAddress()
        }
      });

      const billingAddress = await prisma.address.create({
        data: {
          ...generateDataForAddress()
        }
      });
      const randomUserId = await getRandomId(prisma.user);

      return await prisma.customer.create({
        data: {
          shippingAddress: { connect: { id: shippingAddress.id } },
          billingAddress: { connect: { id: billingAddress.id } },
          user: { connect: { id: randomUserId } }
        }
      });
    })
  );
const seedOrdersAndRelated = async () => {
  const randomCustomerId = await getRandomId(prisma.customer);
  const randomProductId = await getRandomId(prisma.product);
  const orders = Array.from({ length: 40 }, () => ({
    total: parseFloat(faker.commerce.price()),
    customer: { connect: { id: randomCustomerId } }
  }));

  for (const order of orders) {
    const createdOrder = await prisma.order.create({ data: order });

    await prisma.orderItem.create({
      data: {
        quantity: faker.number.int({ min: 1, max: 5 }),
        order: { connect: { id: createdOrder.id } },
        product: { connect: { id: randomProductId } }
      }
    });
  }
};

const main = async () => {
  await seedCategories();
  await seedUsersAndRelated();
  await seedProductsAndRelated();
  await seedCustomersAndRelated();
  await seedOrdersAndRelated();
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
