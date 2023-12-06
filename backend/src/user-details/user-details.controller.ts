import { Controller, Get, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { GetUserInfoFromAtPayload } from 'src/common/decorators';
import { TransformDataInterceptor } from 'src/common/interceptors/transformData.interceptor';
import { UserDetailsDto } from './user-details.dto';
import { UserDetailsService } from './user-details.service';

@Controller('user-details')
export class UserDetailsController {
  constructor(private userDetailsService: UserDetailsService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new TransformDataInterceptor(UserDetailsDto))
  public async getUserDetails(@GetUserInfoFromAtPayload('sub') userId: string) {
    return this.userDetailsService.getUserDetails({
      userId
    });
  }
}
