import { Module } from '@nestjs/common';
import { FetchAdapter } from './adapters/fetch.dapter';

@Module({
  providers: [FetchAdapter],
  exports: [FetchAdapter],
})
export class CommonModule {}
