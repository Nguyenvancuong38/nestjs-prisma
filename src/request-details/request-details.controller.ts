import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RequestDetailsService } from './request-details.service';
import { CreateRequestDetailDto } from './dto/create-request-detail.dto';
import { UpdateRequestDetailDto } from './dto/update-request-detail.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Request-detail')
@ApiBearerAuth('access-token')
@Controller('v1/request-details')
export class RequestDetailsController {
  constructor(private readonly requestDetailsService: RequestDetailsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createRequestDetailDto: CreateRequestDetailDto) {
    return this.requestDetailsService.create(createRequestDetailDto);
  }

  @Get()
  findAll() {
    return this.requestDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDetailDto: UpdateRequestDetailDto) {
    return this.requestDetailsService.update(+id, updateRequestDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestDetailsService.remove(+id);
  }
}
