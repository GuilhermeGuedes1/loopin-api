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

  async createDemoAccount() {
    const demoId = crypto.randomUUID();

    const organization = await this.prisma.organization.create({
      data: {
        name: 'Loopin Demo',
        phone: '(11) 99999-0000',
        document: `DEMO-${demoId}`,
        isDemo: true,
      },
    });

    const user = await this.prisma.user.create({
      data: {
        name: 'Usuário Demo',
        email: `demo-${demoId}@loopin.demo`,
        password: 'demo-without-password',
        phone: '(11) 99999-0000',
        role: 'ADMIN',
        isDemo: true,
        demoExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        organizationId: organization.id,
      },
    });

    await this.prisma.customer.createMany({
      data: [
        {
          name: 'Ana',
          lastName: 'Souza',
          phone: '(11) 99999-1111',
          email: 'ana.demo@loopin.demo',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brasil',
          organizationId: organization.id,
        },
        {
          name: 'Carlos',
          lastName: 'Lima',
          phone: '(21) 98888-2222',
          email: 'carlos.demo@loopin.demo',
          city: 'Rio de Janeiro',
          state: 'RJ',
          country: 'Brasil',
          organizationId: organization.id,
        },
        {
          name: 'Marina',
          lastName: 'Costa',
          phone: '(31) 97777-3333',
          email: 'marina.demo@loopin.demo',
          city: 'Belo Horizonte',
          state: 'MG',
          country: 'Brasil',
          organizationId: organization.id,
        },
      ],
    });

    const payload = {
      sub: user.id,
      email: user.email,
      organizationId: organization.id,
      role: user.role,
      isDemo: user.isDemo,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: organization.id,
        isDemo: user.isDemo,
      },
    };
  }

  async deleteExpiredDemoAccounts() {
    const now = new Date();

    const expiredDemoUsers = await this.prisma.user.findMany({
      where: {
        isDemo: true,
        demoExpiresAt: {
          lte: now,
        },
      },
      select: {
        organizationId: true,
      },
    });

    const organizationIds = expiredDemoUsers.map((user) => user.organizationId);

    if (organizationIds.length === 0) {
      return {
        message: 'No expired demo accounts found.',
        deletedOrganizations: 0,
      };
    }

    const result = await this.prisma.organization.deleteMany({
      where: {
        id: {
          in: organizationIds,
        },
        isDemo: true,
      },
    });

    return {
      message: 'Expired demo accounts deleted successfully.',
      deletedOrganizations: result.count,
    };
  }
}
