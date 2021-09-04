import { ClassroomRepository } from './ClassroomRepository'
import { Enrollment } from './Enrollment'
import { EnrollmentRepository } from './EnrollmentRepository'
import { LevelRepository } from './LevelRepository'
import { ModuleRepository } from './ModuleRepository'
import { RepositoryAbstractFactory } from './RepositoryAbstractFactory'
import { Student } from './Student'

export class EnrollStudent {
  levelRepository: LevelRepository
  moduleRepository: ModuleRepository
  classroomRepository: ClassroomRepository
  enrollmentRepository: EnrollmentRepository

  constructor(repositoryFacade: RepositoryAbstractFactory) {
    this.levelRepository = repositoryFacade.createLevelRepository()
    this.moduleRepository = repositoryFacade.createModuleRepository()
    this.classroomRepository = repositoryFacade.createClassroomRepository()
    this.enrollmentRepository = repositoryFacade.createEnrollmentRepository()
  }
  // constructor(
  //   levelRepository: LevelRepository,
  //   moduleRepository: ModuleRepository,
  //   classroomRepository: ClassroomRepository,
  //   enrollmentRepository: EnrollmentRepository
  // ) {
  //   this.levelRepository = levelRepository
  //   this.moduleRepository = moduleRepository
  //   this.classroomRepository = classroomRepository
  //   this.enrollmentRepository = enrollmentRepository
  // }

  execute(enrollmentRequest: any) {
    const student = new Student(
      enrollmentRequest.student.name,
      enrollmentRequest.student.cpf,
      enrollmentRequest.student.birthDate
    )
    const level = this.levelRepository.findByCode(enrollmentRequest.level)
    const module = this.moduleRepository.findByCode(enrollmentRequest.level, enrollmentRequest.module)
    const classroom = this.classroomRepository.findByCode(enrollmentRequest.class)

    const studentsEnrolledInClassroom = this.enrollmentRepository.findAllByClass(
      level.code,
      module.code,
      classroom.code
    )
    if (studentsEnrolledInClassroom.length === classroom.capacity) throw new Error('Class is over capacity')
    const existingEnrollment = this.enrollmentRepository.findByCpf(enrollmentRequest.student.cpf)
    if (existingEnrollment) throw new Error('Enrollment with duplicated student is not allowed')
    const enrollmentSequence = this.enrollmentRepository.count() + 1
    const issueDate = new Date()
    const enrollment = new Enrollment(student, level, module, classroom, issueDate, enrollmentSequence, enrollmentRequest.installments)
    this.enrollmentRepository.save(enrollment)
    return enrollment
  }
}
