import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Reservation } from '@prisma/client';
import { ReservationsService } from './reservations.service';

@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async createReservation(
    @Body() reservation: Reservation,
  ): Promise<Reservation> {
    return this.reservationsService.createReservation(reservation);
  }

  @Get('customers/:id')
  async getReservations(
    @Param('id') customerId: string,
  ): Promise<Reservation[]> {
    return this.reservationsService.getReservations(Number(customerId));
  }

  @Get('/:id')
  async getReservation(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.getReservation(Number(id));
  }

  @Patch('/:id')
  async updateReservation(
    @Param('id') id: string,
    @Body() reservation: Reservation,
  ): Promise<Reservation> {
    return this.reservationsService.updateReservation(Number(id), reservation);
  }

  @Delete('/:id')
  async deleteReservation(@Param('id') id: string): Promise<void> {
    await this.reservationsService.deleteReservation(Number(id));
  }
}
