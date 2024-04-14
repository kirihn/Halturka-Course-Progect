import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    ById(id: number, selectObject?: Prisma.UserSelect): Promise<any>;
}
