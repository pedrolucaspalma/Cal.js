import { Prisma } from ".prisma/client";
import { sign } from "jsonwebtoken"

const { compare } = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const token = sign({
      email: user.email
    },
    "053591c1536caa4a50fc7fa3f6361c62",{
      subject: user.id.toString(),
      expiresIn: "1d"
    });

    const userWithToken = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      token: token
    }

    return userWithToken;
  }
}

export { AuthenticateUserService };
