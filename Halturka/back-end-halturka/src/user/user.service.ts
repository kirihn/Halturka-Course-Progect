import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async ById(id: number){
        const UserTable = await this.prisma.user.findUnique({
            where: {
                Id : id
            },
            select: {
                Role: true,
                Id: true
            }
        });

        let anyUser;

        switch(UserTable.Role){
            case 1 :{
                // customer
                anyUser = await this.prisma.user.findUnique({
                    where: {
                        Id: UserTable.Id
                    },
                    select: {
                        Email: true,
                        CreatedAt: true,
                        customer: {
                            select: {
                                CustomerId: true,
                                Name: true,
                                PhoneNumber: true,
                                AvatarPath: true
                            }
                        }
                    }
                })
            }
            case 2 :{
                // handyMan
            }
            case 3 :{
                // admin
            }
            default : {
                console.log("UserRole Error in User.Service.ts");
            }
        }
        return anyUser;
    }
}
