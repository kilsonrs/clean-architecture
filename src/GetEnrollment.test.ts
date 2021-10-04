import { EnrollmentRepository } from './EnrollmentRepository'
import { EnrollmentRepositoryMemory } from './EnrollmentRepositoryMemory'

class GetEnrollment {
  enrollmentRepository: EnrollmentRepository;

  constructor(enrollmentRepository: EnrollmentRepository) {
    this.enrollmentRepository = enrollmentRepository
  }

  execute(getEnrollmentRequest: any) {
    const enrollment = this.enrollmentRepository.findByCode(getEnrollmentRequest.code)
    return enrollment
  }
}

const enrollmentRepository = new EnrollmentRepositoryMemory()
let getEnrollments = new GetEnrollment(enrollmentRepository)

describe('', () => {
  beforeAll(() => { jest.useFakeTimers('modern').setSystemTime(new Date(2021, 5, 6))})

  test('Should get enrollment by code with invoice balance', () => {
    const enrollmentRequest = {
      student: {
        name: 'Ana Clara',
        cpf: '832.081.519-34',
      },
      level: 'EM',
      module: '1',
      class: 'A',
    }
    const getEnrollmentRequest = {
      code: "2021EM1A0001"
    }
    const enrollment = getEnrollments.execute(enrollmentRequest)
    expect(getEnrollments).toHaveLength(12)
  })
})
