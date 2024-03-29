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
import { Hotel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HotelsService } from './hotels.service';

@UseGuards(JwtAuthGuard)
@Controller()
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  async getHotels(): Promise<Hotel[]> {
    return this.hotelsService.getHotels();
  }

  @Get('/:id')
  async getHotel(@Param('id') id: string): Promise<Hotel> {
    return this.hotelsService.getHotel(parseInt(id));
  }

  @Get('hotelAdmin/:id')
  async getHotelsByAdmin(@Param('id') hotelAdminId: string): Promise<Hotel[]> {
    return this.hotelsService.getHotelsByAdmin(parseInt(hotelAdminId));
  }

  @Post()
  async createHotel(@Body() hotel: Hotel): Promise<Hotel> {
    return this.hotelsService.createHotel(hotel);
  }

  @Patch('/:id')
  async updateHotel(
    @Param('id') id: string,
    @Body() hotel: Hotel,
  ): Promise<Hotel> {
    return this.hotelsService.updateHotel(parseInt(id), hotel);
  }

  @Delete('/:id')
  async deleteHotel(@Param('id') id: string): Promise<void> {
    await this.hotelsService.deleteHotel(parseInt(id));
  }
}
