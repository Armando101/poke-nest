import { Module } from '@nestjs/common';
import { FetchAdapter } from './adapters/fetch.dapter';
import { ConstantService } from './constants/constant.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [FetchAdapter, ConstantService],
  exports: [FetchAdapter, ConstantService],
})
export class CommonModule {}
