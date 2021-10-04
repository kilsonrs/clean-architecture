import { Enrollment } from './Enrollment'

export interface EnrollmentRepository {
  save(enrollment: Enrollment): void
  findAllByClass(level: string, module: string, clazz: string): Enrollment[]
  findByCpf(cpf: string): Enrollment | undefined
  findByCode(code: string): Enrollment | undefined
  count(): number
}
