import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [SharedModule, HotelsModule, ReservationsModule],
})
export class AppModule {}
