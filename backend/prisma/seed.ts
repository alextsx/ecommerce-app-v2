import { faker } from '@faker-js/faker';
import {
  FulfillmentStatus,
  PaymentMethod,
  PaymentStatus,
  PrismaClient,
  UserRole
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

//number of records to generate
const ORDER_COUNT = 40;
const CUSTOMER_COUNT = ORDER_COUNT;
const PRODUCT_COUNT = faker.number.int({ min: 20, max: 50 });
const USER_COUNT = faker.number.int({ min: 20, max: 50 });
const CATEGORY_COUNT = faker.number.int({ min: 5, max: 10 });

const getRandomEnumValue = <T>(prismaEnum: T) => {
  const statuses = Object.values(prismaEnum);
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};
const getRandomId = async (model: any) => {
  const records = await model.findMany();
  const randomIndex = Math.floor(Math.random() * records.length);
  return records[randomIndex].id;
};

//todo factory pattern
const generateDataForAddress = () => ({
  line1: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
  country: faker.location.country(),
  zipcode: faker.location.zipCode()
});

const seedCategories = async () => {
  for (let i = 0; i < CATEGORY_COUNT; i++) {
    const existingCategories = await prisma.category.findMany();
    let categoryName: string;
    let maxTries = 20;
    do {
      maxTries--;
      categoryName = faker.commerce.department();
    } while (existingCategories.some((category) => category.name === categoryName) && maxTries > 0);
    if (maxTries === 0) {
      console.error('could not generate unique category name');
      return;
    }
    const slug = faker.helpers.slugify(categoryName);
    await prisma.category.create({ data: { name: categoryName, slug } });
  }
};

const seedProductsAndRelated = async () => {
  const products = await Promise.all(
    Array.from({ length: PRODUCT_COUNT }).map(async () => {
      const randomCategoryId = await getRandomId(prisma.category);
      const productName = faker.commerce.productName();
      const slug = faker.helpers.slugify(productName) + '-' + faker.string.uuid().slice(0, 4);
      const price = faker.number.float({ min: 5, max: 50 });
      const discountedPrice = faker.datatype.boolean()
        ? faker.number.float({ min: price * 0.5, max: price * 0.9 })
        : null;
      return {
        name: productName,
        price,
        discountedPrice,
        inventory: faker.number.int({ min: 5, max: 100 }),
        category: { connect: { id: randomCategoryId } },
        isFeatured: faker.datatype.boolean(),
        slug,
        //only add description with 70%chance
        description: faker.datatype.boolean() ? faker.commerce.productDescription() : null
      };
    })
  );

  for (const product of products) {
    const createdProduct = await prisma.product.create({ data: product });

    await prisma.productImage.create({
      data: { url: faker.image.urlPicsumPhotos(), productId: createdProduct.id }
    });

    for (let i = 0; i < faker.number.int({ min: 5, max: 20 }); i++) {
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
  }
};

const seedUsersAndRelated = async () => {
  const users = Array.from({ length: USER_COUNT }, () => ({
    email: faker.internet.email(),
    password: bcrypt.hashSync(faker.internet.password(), 10),
    role: getRandomEnumValue(UserRole)
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

const _seedCustomersAndRelated = async () =>
  Promise.all(
    Array.from({ length: CUSTOMER_COUNT }).map(async () => {
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

      const data = {
        shippingAddress: { connect: { id: shippingAddress.id } },
        billingAddress: { connect: { id: billingAddress.id } },
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: faker.phone.number(),
        email: faker.internet.email()
      };

      if (faker.datatype.boolean()) {
        data['user'] = { connect: { id: randomUserId } };
      }

      return await prisma.customer.create({ data });
    })
  );

/*
! customerId is unique so we cant use map and Promise.all, we must
! execute them in sequence

this also seeds orderitems & customers
*/
const seedOrdersAndRelated = async () => {
  const newCustomerRecords = await _seedCustomersAndRelated();
  const newCustomerIds = newCustomerRecords.map((record) => record.id);
  for (let i = 0; i < ORDER_COUNT; i++) {
    const orderData = {
      total: faker.number.float({ min: 10, max: 1000 }),
      customerId: newCustomerIds[i],
      fulfillmentStatus: getRandomEnumValue(FulfillmentStatus),
      paymentStatus: getRandomEnumValue(PaymentStatus),
      paymentMethod: getRandomEnumValue(PaymentMethod)
    };

    const createdOrder = await prisma.order.create({ data: orderData });
    const randomProductId = await getRandomId(prisma.product);
    const productInDb = await prisma.product.findUnique({ where: { id: randomProductId } });

    await prisma.orderItem.create({
      data: {
        quantity: faker.number.int({ min: 1, max: 5 }),
        order: { connect: { id: createdOrder.id } },
        product: { connect: { id: randomProductId } },
        total: productInDb.price * orderData.total,
        unitPrice: productInDb.price
      }
    });
  }
};

const main = async () => {
  await seedCategories();
  await seedUsersAndRelated();
  await seedProductsAndRelated();
  await seedOrdersAndRelated();
};

main()
  .catch((e) => {
    console.log(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
