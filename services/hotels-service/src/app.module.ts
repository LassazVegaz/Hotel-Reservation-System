import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationsModule } from './reservations/reservations.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SharedModule, HotelsModule, ReservationsModule, AuthModule],
})
export class AppModule {}
