import { EnrollStudent } from './EnrollStudent'
import { RepositoryMemoryFactory } from './RepositoryMemoryFactory'

let enrollStudent: EnrollStudent

describe('EnrollStudent', () => {
  beforeAll(() => { jest.useFakeTimers('modern').setSystemTime(new Date(2021, 5, 6))})

  beforeEach(() => { enrollStudent = new EnrollStudent(new RepositoryMemoryFactory())})

  test('Should not be able enroll without valid student name', () => {
    const enrollmentRequest = {
      student: {
        name: 'Ana',
        cpf: 'any_cpf',
      },
      level: 'EM',
      module: '1',
      class: 'A',
    }
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Invalid student name'))
  })

  test('Should not enroll without valid student cpf', () => {
    const enrollmentRequest = {
      student: {
        name: 'Ana Silva',
        cpf: '123.456.789-99',
      },
      level: 'EM',
      module: '1',
      class: 'A',
    }
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Invalid student cpf'))
  })

  test('Should not enroll duplicated student', () => {
    const enrollmentRequest = {
      student: {
        name: 'Ana Silva',
        cpf: '832.081.519-34',
      },
      level: 'EM',
      module: '1',
      class: 'A',
    }
    enrollStudent.execute(enrollmentRequest)
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error('Enrollment with duplicated student is not allowed')
    )
  })

  test('Should generate enrollment code', () => {
    const enrollmentRequest = {
      student: {
        name: 'Maria Carolina Fonseca',
        cpf: '755.525.774-26',
        birthDate: '2002-03-12',
      },
      level: 'EM',
      module: '1',
      class: 'A',
    }
    const enrollment = enrollStudent.execute(enrollmentRequest)
    expect(enrollment.code.value).toEqual('2021EM1A0001')
  })

  test('Should not enroll student below minimum age', () => {
    const enrollmentRequest = {
      student: {
        name: 'Maria Carolina Fonseca',
        cpf: '755.525.774-26',
        birthDate: '2014-03-12',
      },
      level: 'EM',
      module: '1',
      class: 'A',
    }
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Student below minimum age'))
  })

  test('Should not enroll student over class capacity', () => {
    enrollStudent.execute({
      student: {
        name: 'Maria Carolina Fonseca',
        cpf: '755.525.774-26',
        birthDate: '2002-03-12',
      },
      level: 'EM',
      module: '1',
      class: 'A',
    })
    enrollStudent.execute({
      student: {
        name: 'Mario Fonseca da Silva',
        cpf: '428.693.800-03',
        birthDate: '2002-02-12',
      },
      level: 'EM',
      module: '1',
      class: 'A',
    })
    const enrollmentRequest = {
      student: {
        name: 'Mario Fonseca da Silva',
        cpf: '950.722.310-03',
        birthDate: '2002-02-12',
      },
      level: 'EM',
      module: '1',
      class: 'A',
    }
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Class is over capacity'))
  })

  test('Should not enroll after que end of the class', () => {
    const enrollmentRequest = {
      student: {
        name: 'Maria Carolina Fonseca',
        cpf: '755.525.774-26',
        birthDate: '2002-03-12',
      },
      level: 'EM',
      module: '1',
      class: 'B',
    }
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Class is already finished'))
  })

  test('Should not enroll after 25% of the start of the class', () => {
    const enrollmentRequest = {
      student: {
        name: 'Maria Carolina Fonseca',
        cpf: '755.525.774-26',
        birthDate: '2002-03-12',
      },
      level: 'EM',
      module: '1',
      class: 'C',
    }
    console.log(new Date())
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Class is already started'))
  })

  test('Should generate the invoices based on the number of installments, rounding each amount and applying the rest in the last invoice', () => {
    const enrollmentRequest = {
      student: {
        name: 'Maria Carolina Fonseca',
        cpf: '755.525.774-26',
        birthDate: '2002-03-12',
      },
      level: 'EM',
      module: '1',
      class: 'A',
      installments: 12,
    }
    const enrollment = enrollStudent.execute(enrollmentRequest)
    expect(enrollment.invoices).toHaveLength(12)
    expect(enrollment.invoices[0].amount).toBe(1416.66)
    expect(enrollment.invoices[11].amount).toBe(1416.73)
  })

  test('Should get enrollment by code with invoice balance', () => {
    const enrollmentRequest = {
      code: "2021EM1A0001"
    }
    const enrollment = enrollStudent.execute(enrollmentRequest)
    expect(enrollment.invoices).toHaveLength(12)
  })
})
