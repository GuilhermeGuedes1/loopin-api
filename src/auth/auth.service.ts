import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDTO, SignUpDTO } from './dtos/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { MeResponseDTO } from './dtos/auth';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(data: SignUpDTO) {
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userAlreadyExists) {
      throw new UnauthorizedException('User already exists');
    }

    const organization = await this.prisma.organization.create({
      data: {
        name: data.organizationName,
        document: data.organizationDocument,
        phone: data.organizationPhone,
      },
    });

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,

        role: 'ADMIN',

        organizationId: organization.id,
      },
    });

    const { password: _, ...userWhitoutPassword } = user;

    return userWhitoutPassword;
  }

  async signin(data: SigninDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      organizationId: user.organizationId,
      role: user.role,
      name: user.name,
      email: user.email,
    });
    return { access_token: accessToken };
  }

  async me(userId: string): Promise<MeResponseDTO> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      organizationName: user.organization.name,
    };
  }
}
