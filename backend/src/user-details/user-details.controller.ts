import { Controller, Get, HttpCode, HttpStatus, Put, UseInterceptors } from '@nestjs/common';
import { GetUserInfoFromAtPayload } from 'src/common/decorators';
import { ValidatedBody } from 'src/common/decorators/validated-body.decorator';
import { TransformDataInterceptor } from 'src/common/interceptors/transformData.interceptor';
import { UpdateUserDetailsDto } from './dtos/update-user-details.dto';
import { UserDetailsDto } from './dtos/user-details.dto';
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

  @Put('/')
  @HttpCode(HttpStatus.OK)
  public async updateUserDetails(
    @ValidatedBody() updatedUserDetailsDto: UpdateUserDetailsDto,
    @GetUserInfoFromAtPayload('sub') userId: string
  ) {
    await this.userDetailsService.updateUserDetails({
      userId,
      updatedUserDetailsDto
    });

    return {
      message: 'User details updated successfully'
    };
  }
}
