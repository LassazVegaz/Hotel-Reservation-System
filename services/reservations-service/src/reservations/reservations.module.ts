import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
