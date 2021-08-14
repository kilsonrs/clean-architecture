import { Classroom } from './Classroom'
import { ClassroomRepository } from './ClassroomRepository'

export class ClassroomRepositoryMemory implements ClassroomRepository {
  classrooms: any[]

  constructor() {
    this.classrooms = [
      new Classroom({
        level: 'EM',
        module: '3',
        code: 'A',
        capacity: 2,
        startDate: new Date('2021-06-01'),
        endDate: new Date('2021-12-15'),
      }),
      new Classroom({
        level: 'EM',
        module: '3',
        code: 'B',
        capacity: 2,
        startDate: new Date('2021-05-01'),
        endDate: new Date('2021-05-30'),
      }),
      new Classroom({
        level: 'EM',
        module: '3',
        code: 'C',
        capacity: 2,
        startDate: new Date('2021-05-01'),
        endDate: new Date('2021-06-30'),
      }),
    ]
  }

  findByCode(code: string): Classroom {
    const classroom = this.classrooms.find((classroom) => classroom.code === code)
    if (!classroom) throw new Error('Classroom not found')
    return classroom
  }
}
