"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async ById(id, selectObject = {}) {
        const UserTable = await this.prisma.user.findUnique({
            where: {
                Id: id
            },
            select: {
                Role: true,
                Id: true
            }
        });
        let anyUser;
        switch (UserTable.Role) {
            case 1: {
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
                });
            }
            case 2: {
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
                                        service: {
                                            select: {
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
                });
            }
            case 3: {
            }
            default: {
                console.log("UserRole Error in User.Service.ts");
            }
        }
        return anyUser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map