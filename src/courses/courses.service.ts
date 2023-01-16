import { UpdateCourseDto } from './dto/create.courses.dto/update.courses.dto';
import { CreateCourseDto } from './dto/create.courses.dto/create.courses.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tags.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAll() {
    return this.courseRepository.find();
  }

  findOne(id: string) {
    const res = this.courseRepository.findOne(id);

    if (!res) {
      throw new NotFoundException(`Curso ${id} não encontrado`);
    }

    return res;
  }

  async create(createCourseDto: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDto.tags.map((name) => this.preLoadTagByName(name)),
    );

    const curso = this.courseRepository.create({ ...createCourseDto, tags });
    return this.courseRepository.save(curso);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((name) => this.preLoadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      id: +id,
      ...updateCourseDto,
      tags,
    });

    if (!course) {
      throw new NotFoundException(`Curso ${id} não encontrado`);
    }

    return this.courseRepository.save(course);
  }

  async delete(id: string) {
    const course = await this.courseRepository.findOne(id);

    if (!course) {
      throw new NotFoundException(`Curso ${id} não encontrado`);
    }

    return this.courseRepository.remove(course);
  }

  private async preLoadTagByName(name: string): Promise<Tag> {
    const tag = this.tagRepository.findOne({ name: name });

    if (tag) {
      return tag;
    } else {
      return this.tagRepository.create({ name: name });
    }
  }
}
