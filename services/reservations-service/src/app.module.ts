import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservations/reservations.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ReservationsModule, SharedModule, AuthModule],
})
export class AppModule {}
