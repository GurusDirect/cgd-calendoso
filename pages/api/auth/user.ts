import prisma from "@lib/prisma";
import slugify from "@lib/slugify";

export default async function firstOrCreateUser(providerUser) {
  const { email, given_name, family_name, email_verified } = providerUser;
  const username = slugify(`${given_name} ${family_name}`);
  const userEmail = email.toLowerCase();
  const emailVerified = email_verified ? new Date(Date.now()) : null;

  const existingUser = await prisma.user.findFirst({
    where: {
      AND: [
        {
          email: userEmail,
        },
        {
          emailVerified: {
            not: null,
          },
        },
      ],
    },
  });

  if (existingUser) {
    return existingUser;
  }

  const newUser = await prisma.user.upsert({
    where: { email: userEmail },
    update: {
      username,
      emailVerified,
    },
    create: {
      username,
      email: userEmail,
      emailVerified,
    },
  });

  return newUser;
}
