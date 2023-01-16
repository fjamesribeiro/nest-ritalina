import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './entiry/course.entity';

@Module({
  imports: [CoursesModule, TypeOrmModule.forFeature([Course])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
