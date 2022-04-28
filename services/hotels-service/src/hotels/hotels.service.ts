import { Injectable, NotFoundException } from '@nestjs/common';
import { Hotel } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';

@Injectable()
export class HotelsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getHotels(): Promise<Hotel[]> {
    return this.prismaService.hotel.findMany();
  }

  async getHotel(id: number): Promise<Hotel> {
    return this.prismaService.hotel.findUnique({
      where: {
        id,
      },
    });
  }

  async createHotel(hotel: Hotel): Promise<Hotel> {
    // since hotel id is auto generated, we don't need to pass it
    if (hotel.id) delete hotel.id;

    return this.prismaService.hotel.create({
      data: hotel,
    });
  }

  async updateHotel(id: number, hotel: Hotel): Promise<Hotel> {
    // check if hotel exists
    if (!(await this.hotelExists(id)))
      throw new NotFoundException(`Hotel with id ${id} not found`);

    // remove hotel id if it exists
    if (hotel.id) delete hotel.id;

    return this.prismaService.hotel.update({
      where: {
        id,
      },
      data: hotel,
    });
  }

  async deleteHotel(id: number): Promise<void> {
    // check if hotel exists
    if (!(await this.hotelExists(id)))
      throw new NotFoundException(`Hotel with id ${id} not found`);

    await this.prismaService.hotel.delete({
      where: {
        id,
      },
    });
  }

  private async hotelExists(id: number): Promise<boolean> {
    const hotel = await this.prismaService.hotel.findUnique({
      where: {
        id,
      },
    });

    return Boolean(hotel);
  }
}
