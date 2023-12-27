import { Module } from '@nestjs/common';
import { AddressModule } from 'src/address/address.module';
import { UserDetailsController } from './user-details.controller';
import { UserDetailsService } from './user-details.service';

@Module({
  controllers: [UserDetailsController],
  providers: [UserDetailsService],
  imports: [AddressModule]
})
export class UserDetailsModule {}
