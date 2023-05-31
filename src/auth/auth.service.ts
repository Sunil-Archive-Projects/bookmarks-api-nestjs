import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

import * as argon from "argon2";

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signin() {
    return "Sign In";
  }

  signup(dto: AuthDto) {
    // generate the password hash
    // save user in db
    // return saved user
    return "Sign Up";
  }
}
