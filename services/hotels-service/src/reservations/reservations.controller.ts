import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Reservation } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReservationsService } from './reservations.service';

@UseGuards(JwtAuthGuard)
@Controller(':hotelId/reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  async getReservations(
    @Param('hotelId') hotelId: string,
  ): Promise<Reservation[]> {
    return this.reservationsService.getReservations(parseInt(hotelId));
  }

  @Get(':id')
  async getReservation(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.getReservation(parseInt(id));
  }

  @Post()
  async createReservation(
    @Param('hotelId') hotelId: string,
    @Body() reservation: Reservation,
  ): Promise<Reservation> {
    reservation.hotelId = parseInt(hotelId);
    return this.reservationsService.createReservation(reservation);
  }

  @Patch(':id')
  async updateReservation(
    @Param('hotelId') hotelId: string,
    @Param('id') id: string,
    @Body() reservation: Reservation,
  ): Promise<Reservation> {
    reservation.hotelId = parseInt(hotelId);
    return this.reservationsService.updateReservation(
      parseInt(id),
      reservation,
    );
  }

  @Delete(':id')
  async deleteReservation(@Param('id') id: string): Promise<void> {
    await this.reservationsService.deleteReservation(parseInt(id));
  }
}
