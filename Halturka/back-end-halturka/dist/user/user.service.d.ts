import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    ById(id: number): Promise<any>;
}
