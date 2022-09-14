import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmployeeService } from './employee/employ.service';
import { employeeDto } from './employee/employee.dto';
import { employeeEntity } from './employee/employee.entity';
import { PersonDto } from './person.dto';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService,
              private employeeService: EmployeeService
    ){}

    @ApiTags('employee')
    @Post('employee')
    async employeeCreate(@Body() data: employeeDto){
      const user = await this.employeeService.create(data)
      return {
        "personId":user.id,
        "name":user.name,
        "email":user.email,
      }
    }
    @ApiTags('employee')
    @HttpCode(200)
    @Get('employee')
    async getEmployee(){
      const user = await this.employeeService.getAll()
      return user
    }
    @ApiTags('employee')
    @HttpCode(200)
    @Get('employee/:id')
    async getOneEmployee(@Param('id') id:number){
      const user = await this.employeeService.getOne(id)
      if(!user){
        throw new NotFoundException({message: 'largue mão de ser indiota :D'})
      }
      return user
    }
    @ApiTags('employee')
    @HttpCode(204)
    @Delete('employee/:id')
    async deleteEmployee(@Param('id') id: number){
      const user = await this.employeeService.destroy(id)
      if(!user){
        throw new NotFoundException({message: 'id não encontrado'})
      }
      return user
    }
    @ApiTags('employee')
    @HttpCode(200)
    @Put('employee/:id')
    async UpdateEmployee(@Param('id') id: number, @Body() data: employeeDto){
      const user = await this.employeeService.update(id, data)
      return user
    }

  @ApiTags('person')
  @HttpCode(200)
  @Get()
  async showAllPerson(){
    const data = this.personService.showAll();
    return data;
  }
  @ApiTags('person')
  @HttpCode(200)
  @Get(':id')
  async showOnePerson(@Param('id') id:number){
    const data = await this.personService.findOne(id, true);
    if(!data){
      throw new NotFoundException();
    }
    return data;
  }
  @ApiTags('person')
  @HttpCode(201)
  @Post()
  async create(@Body() person: PersonDto){
    const data = await this.personService.createPerson(person);
    return data;
  }
  @ApiTags('person')
  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') id:number, @Body() person:PersonDto){
    const data = await this.personService.update(id, person);
    return data;
  }

  @ApiTags('person')
  @HttpCode(204)
  @Delete(':id')
  async PersonDelete(@Param('id') id:number){
    const data = await this.personService.destroy(id);
    if (!data){
      throw new NotFoundException();
    }

    return data;
  }

}
