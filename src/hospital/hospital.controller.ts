import {
  Get,
  Body,
  Param,
  Delete,
  Controller,
  UseInterceptors,
  Query,
  Put,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { HospitalService } from './hospital.service';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { HospitalEntity } from './entities/hospital.entity';
import { PutHospitalDto } from './dto/put-hospital.dto';
import { CreateHospitalDto } from './dto/create-hospital.dto';

async function checkHospitalExistence(
  hospitalService: HospitalService,
  hospitalId: string,
): Promise<void> {
  const existHospital = await hospitalService.existHospital(hospitalId);
  if (!existHospital) {
    throw new NotFoundException(
      '일치하는 병원이 없습니다. HospitalId를 확인해주세요.',
    );
  }
}

@Controller('hospital')
@ApiTags('Hospital')
@UseInterceptors(SuccessInterceptor)
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post()
  @ApiOperation({ summary: '신규 병원 등록' })
  @ApiCreatedResponse({ type: HospitalEntity })
  create(@Body() data: CreateHospitalDto) {
    return this.hospitalService.create(data);
  }

  @Get()
  @ApiOperation({ summary: '지역 별 병원 찾기' })
  @ApiQuery({ name: 'depth1', required: false })
  @ApiQuery({ name: 'depth2', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiCreatedResponse({ type: HospitalEntity })
  findAll(
    @Query('depth1') depth1: string,
    @Query('depth2') depth2: string,
    @Query('size') size: string,
    @Query('page') page: string,
    @Query('sort') sort: string,
  ) {
    return this.hospitalService.findAll(depth1, depth2, +size, +page, sort);
  }

  @Get('hospitalName/:hospitalName')
  @ApiOperation({ summary: '이름으로 병원 찾기' })
  @ApiCreatedResponse({ type: HospitalEntity })
  findByName(@Param('hospitalName') hospitalName: string) {
    return this.hospitalService.findByNames(hospitalName);
  }

  @Get('near')
  @ApiOperation({
    summary: '가까운 병원 9개 찾기, 유저의 경도,위도,반경 r를 넣어주세요.',
  })
  @ApiCreatedResponse({ type: HospitalEntity })
  findByDistance(
    @Query('userLat') userLat: number,
    @Query('userLon') userLon: number,
    @Query('r') r: number,
  ) {
    return this.hospitalService.findByDistance(userLat, userLon, r);
  }

  @Get(':hospitalId')
  @ApiOperation({ summary: '특정 병원 찾기' })
  @ApiCreatedResponse({ type: HospitalEntity })
  async findById(@Param('hospitalId') hospitalId: string) {
    await checkHospitalExistence(this.hospitalService, hospitalId);
    return this.hospitalService.findById(hospitalId);
  }

  @Put(':hospitalId')
  @ApiOperation({ summary: '병원 수정' })
  @ApiCreatedResponse({ type: HospitalEntity })
  async update(
    @Param('hospitalId') hospitalId: string,
    @Body() data: PutHospitalDto,
  ) {
    await checkHospitalExistence(this.hospitalService, hospitalId);
    return this.hospitalService.put(hospitalId, data);
  }

  @Delete(':hospitalId')
  @ApiOperation({ summary: '병원 삭제' })
  @ApiCreatedResponse({ type: HospitalEntity })
  async remove(@Param('hospitalId') hospitalId: string) {
    await checkHospitalExistence(this.hospitalService, hospitalId);
    return this.hospitalService.remove(hospitalId);
  }
}
