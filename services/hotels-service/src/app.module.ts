import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { HotelsModule } from './hotels/hotels.module';

@Module({
  imports: [SharedModule, HotelsModule],
})
export class AppModule {}
