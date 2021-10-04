import { EnrollmentRepository } from "./EnrollmentRepository";

export class GetEnrollment {
  enrollmentRepository: EnrollmentRepository;

  constructor(enrollmentRepository: EnrollmentRepository) {
    this.enrollmentRepository = enrollmentRepository
  }

  execute(getEnrollmentRequest: any) {
    const enrollment = this.enrollmentRepository.findByCode(getEnrollmentRequest.code)
    return enrollment
  }
}
