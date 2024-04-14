import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async ById(id: number, selectObject: Prisma.UserSelect = {}){
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
                        },
                        ...selectObject
                    }
                })
            }
            case 2 :{
                // handyMan
                anyUser = await this.prisma.user.findUnique({
                    where: {
                        Id: UserTable.Id
                    },
                    select: {
                        Email: true,
                        CreatedAt: true,
                        handyMan: {
                            select: {
                                HandyManId: true,
                                Name: true,
                                PhoneNumber: true,
                                AvatarPath: true,
                                serviceHandyMans: {
                                    select: {
                                        service:{
                                            select : {
                                                ServiceName: true,
                                                ServiceType: true,
                                            }
                                        },
                                        Message: true,
                                        Price: true,
                                        TypePrice: true,
                                        Images: true
                                    }
                                }
                            }
                        },
                        ...selectObject
                    }
                })
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
