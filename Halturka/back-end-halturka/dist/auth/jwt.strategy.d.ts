import { ConfigService } from "@nestjs/config";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate({ Id }: Pick<User, 'Id'>): Promise<{
        Id: number;
        Password: string;
        Email: string;
        Role: number;
        CreatedAt: Date;
    }>;
}
export {};
