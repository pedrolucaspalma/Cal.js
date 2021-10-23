const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: IUserRequest) {
    if (!email) {
      throw new Error("Email empty");
    }

    if (!name) {
      throw new Error("Name empty");
    }

    if (!password) {
      throw new Error("Password empty");
    }

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        password: passwordHash,
        email: email,
      },
    });
    return newUser;
  }
}

export { CreateUserService };
