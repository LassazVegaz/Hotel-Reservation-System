import { Injectable, NotFoundException } from '@nestjs/common';
import { Reservation } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createReservation(reservation: Reservation): Promise<Reservation> {
    // remove ID
    if (typeof reservation.id !== 'undefined') delete reservation.id;

    return this.prismaService.reservation.create({
      data: reservation,
    });
  }

  async getReservations(customerId: number): Promise<Reservation[]> {
    return this.prismaService.reservation.findMany({
      where: {
        customerId,
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

  async updateReservation(
    id: number,
    reservation: Reservation,
  ): Promise<Reservation> {
    // check if reservation exists
    if (!(await this.reservationExists(id)))
      throw new NotFoundException(`Reservation with ID ${id} not found`);

    // only date range can be updated
    const {
      id: _,
      customerId,
      reservationId,
      postPaidSelected,
      taxiSerivceSelected,
      ...data
    } = reservation;

    return this.prismaService.reservation.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteReservation(id: number): Promise<void> {
    // check if reservation exists
    if (!(await this.reservationExists(id)))
      throw new NotFoundException(`Reservation with ID ${id} not found`);

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
