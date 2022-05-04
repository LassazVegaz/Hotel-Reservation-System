import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService],
  imports: [SharedModule],
})
export class ReservationsModule {}
