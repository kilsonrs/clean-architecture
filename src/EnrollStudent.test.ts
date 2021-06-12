import LevelRepositoryMemory from "./LevelRepositoryMemory";
import ModuleRepositoryMemory from "./ModuleRepositoryMemory";
import ClassRepositoryMemory from "./ClassRepositoryMemory";
import EnrollmentRepositoryMemory from "./EnrollmentRepositoryMemory";
import { EnrollStudent } from "./EnrollStudent";

let enrollStudent: EnrollStudent;

describe('EnrollStudent', () => {
  beforeEach(() => {
    const levelRepository = new LevelRepositoryMemory()
    const moduleRepository = new ModuleRepositoryMemory()
    const classRepository = new ClassRepositoryMemory()
    const enrollmentRepositoryMemory = new EnrollmentRepositoryMemory()
    enrollStudent = new EnrollStudent(levelRepository, moduleRepository, classRepository, enrollmentRepositoryMemory);
  });
  it('should not be able enroll without valid student name', () => {
    const enrollmentRequest = {
      student: {
        name: 'Ana',
        cpf: 'any_cpf'
      },
      level: "EM",
      module: "1",
      class: "A"
    }
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid student name"))
  });
  it('Should not enroll without valid student cpf', () => {
    const enrollmentRequest = {
      student: {
        name: "Ana Silva",
        cpf: "123.456.789-99"
      },
      level: "EM",
      module: "1",
      class: "A"
    }
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid student cpf"))
  });
  it('Should not enroll duplicated student', () => {
    const enrollmentRequest = {
      student: {
        name: "Ana Silva",
        cpf: "832.081.519-34"
      },
      level: "EM",
      module: "1",
      class: "A"
    }
    enrollStudent.execute(enrollmentRequest)
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Enrollment with duplicated student is not allowed"))
  });
  it('Should generate enrollment code', () => {
    const enrollmentRequest = {
      student: {
        name: "Maria Carolina Fonseca",
        cpf: "755.525.774-26",
        birthDate: "2002-03-12"
      },
      level: "EM",
      module: "1",
      class: "A"
    }
    const enrollment = enrollStudent.execute(enrollmentRequest)
    expect(enrollment.code).toEqual('2021EM1A0001')
  });
  it('Should not enroll student below minimum age', () => {
    const enrollmentRequest = {
      student: {
        name: "Maria Carolina Fonseca",
        cpf: "755.525.774-26",
        birthDate: "2014-03-12"
      },
      level: "EM",
      module: "1",
      class: "A"
    }
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Student below minimum age"))
  });
  it('Should not enroll student over class capacity', () => {
    enrollStudent.execute({
      student: {
        name: "Maria Carolina Fonseca",
        cpf: "755.525.774-26",
        birthDate: "2002-03-12"
      },
      level: "EM",
      module: "1",
      class: "A"
    })
    enrollStudent.execute({
      student: {
        name: "Mario Fonseca da Silva",
        cpf: "428.693.800-03",
        birthDate: "2002-02-12"
      },
      level: "EM",
      module: "1",
      class: "A"
    })
    const enrollmentRequest = {
      student: {
        name: "Mario Fonseca da Silva",
        cpf: "950.722.310-03",
        birthDate: "2002-02-12"
      },
      level: "EM",
      module: "1",
      class: "A"
    }
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Class is over capacity"))
  });
});
