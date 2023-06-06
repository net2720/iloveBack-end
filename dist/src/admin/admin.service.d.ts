import { HttpException } from '@nestjs/common';
import { UserType, Id } from './dto/admin.dtos';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    isAdmin(User: any): boolean;
    getAllUserInfo(param: UserType, User: any): Promise<HttpException | {
        name: string;
        email: string;
        phoneNumber: string;
        createdAt: Date;
        id: number;
    }[]>;
    adminDeleteUser(param: Id, User: any): Promise<User>;
    adminVerifyManager(param: Id, User: any): Promise<{
        adminVerified: boolean;
        id: number;
    }>;
}
