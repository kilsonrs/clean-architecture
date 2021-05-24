import { validateCpf } from "../util/validateCpf"

interface IStudent {
  name: string;
  cpf: string;
}

interface IEnrollment {
  student: IStudent;
}

class EnrollStudent {
  private enrollments: IEnrollment[] = [];

  execute(enrollmentRequest: IEnrollment) {
    const { name } = enrollmentRequest.student;
    const regExp = /^([A-Za-z]+ )+([A-Za-z])+$/
    const isInvalidName = !regExp.test(name)
    if (isInvalidName) {
      throw new Error('Invalid student name')
    }
    const isInvalidCpf = !validateCpf(enrollmentRequest.student.cpf)
    if (isInvalidCpf) {
      throw new Error('Invalid student cpf')
    }
    const enrollmentExists = this.enrollments.find(enrollment => enrollment.student.name === name)
    if(enrollmentExists) {
      throw new Error('Enrollment with duplicated student is not allowed')
    }
    this.enrollments.push(enrollmentRequest)
  }
}

export { EnrollStudent }
