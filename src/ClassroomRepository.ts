import { Classroom } from './Classroom'

export interface ClassroomRepository {
  findByCode(code: string): Classroom
}
