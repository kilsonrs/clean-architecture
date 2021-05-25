import { Student } from "../Student";

class EnrollStudent {
  private enrollments: any[] = [];

  execute(enrollmentRequest: any) {
    const { name, cpf } = enrollmentRequest.student
    const student = new Student(name, cpf)
    const existingEnrollment = this.enrollments.find(enrollment => enrollment.student.cpf.value === cpf)
    if(existingEnrollment) throw new Error('Enrollment with duplicated student is not allowed')
    const enrollment = { student }
    this.enrollments.push(enrollment)
  }
}

export { EnrollStudent }
