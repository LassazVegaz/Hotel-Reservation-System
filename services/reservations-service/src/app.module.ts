import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservations/reservations.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [ReservationsModule, SharedModule],
})
export class AppModule {}
