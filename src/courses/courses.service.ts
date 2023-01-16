import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entiry/course.entity';

@Injectable()
export class CoursesService {
  private cursos: Array<Course> = [
    {
      id: 1,
      nome: 'curso 1',
      descricao: 'esc do curso 1',
      tags: ['aaa', 'bbb'],
    },
  ];

  findAll() {
    return this.cursos;
  }

  findOne(id: string) {
    const res = this.cursos.find((curso: Course) => curso.id == Number(id));

    if (!res) {
      throw new HttpException(
        `Curso ${id} não encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    return res;
  }

  create(createCourseDto: any) {
    this.cursos.push(createCourseDto);
  }

  update(id: string, updateCourseDto: any) {
    const index = this.cursos.findIndex((indice) => indice.id == Number(id));
    this.cursos[index] = updateCourseDto;
  }

  delete(id: string) {
    const index = this.cursos.findIndex((indice) => indice.id == Number(id));
    if (index > 0) {
      this.cursos.splice(index);
    }
  }
}
