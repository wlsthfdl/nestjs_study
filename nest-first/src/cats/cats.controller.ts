import { Controller, Get, Param, Post, Body,Put,Delete } from '@nestjs/common';
import { CreateCatDto } from './CreateCatDto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {

    //CatsService는 constructor를 통해 주입됨, private을 사용하면 선언과 초기화가 동시에 이루어진다.
    constructor(private catsService: CatsService){};

    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }

    @Get(':id')
    findOne(@Param('id')id:string): string{
        return `This action returns a #${id} cat`;
    }

    @Post()
    create(@Body() createCatDto: CreateCatDto){
        return 'This action adds a new cat';
    }

    @Put(':id')
    update(@Param('id')id: string, @Body() CreateCatDto: CreateCatDto){
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id')id: string){
        return `This action removes a #${id}`
    }
}
