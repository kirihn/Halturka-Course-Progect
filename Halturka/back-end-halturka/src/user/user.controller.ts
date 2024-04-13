import { Body, Controller, Get, HttpCode, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GetCustomerProfile
  // GetHandyMapProfile
  // UpdateCustomerProfile
  // UpdateHandyMapProfile



  // getCustomerOrders
  // getHandyManOrders

  @Get('GetProfile')
  @Auth()
  async GetProfile(@CurrentUser('Id') id: number){
    return this.userService.ById(id);
  }

  // @UsePipes(new ValidationPipe()) // check
  // @Put('UpdateProfile')
  // @Auth()
  // @HttpCode(200)
  // async UpdateProfile(@CurrentUser('Id') id: number, @Body() dto: UserDto){
  //   return this.userService.UpdateProfile(id, dto);
  // }
}
