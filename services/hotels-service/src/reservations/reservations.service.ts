import { Injectable, NotFoundException } from '@nestjs/common';
import { Reservation } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getReservations(hotelId: number): Promise<Reservation[]> {
    return this.prismaService.reservation.findMany({
      where: {
        hotelId,
      },
    });
  }

  async getReservation(id: number): Promise<Reservation> {
    return this.prismaService.reservation.findUnique({
      where: {
        id,
      },
    });
  }

  async createReservation(reservation: Reservation): Promise<Reservation> {
    // since reservation id is auto generated, we don't need to pass it
    if (typeof reservation.id !== 'undefined') delete reservation.id;

    return this.prismaService.reservation.create({
      data: reservation,
    });
  }

  async updateReservation(
    id: number,
    reservation: Reservation,
  ): Promise<Reservation> {
    // check if reservation exists
    if (!(await this.reservationExists(id)))
      throw new NotFoundException(`Reservation with id ${id} not found`);

    // remove reservation id if it exists
    if (typeof reservation.id !== 'undefined') delete reservation.id;

    return this.prismaService.reservation.update({
      where: {
        id,
      },
      data: reservation,
    });
  }

  async deleteReservation(id: number): Promise<void> {
    // check if reservation exists
    if (!(await this.reservationExists(id)))
      throw new NotFoundException(`Reservation with id ${id} not found`);

    await this.prismaService.reservation.delete({
      where: {
        id,
      },
    });
  }

  private async reservationExists(id: number): Promise<boolean> {
    const reservation = await this.prismaService.reservation.findUnique({
      where: {
        id,
      },
    });

    return !!reservation;
  }
}
