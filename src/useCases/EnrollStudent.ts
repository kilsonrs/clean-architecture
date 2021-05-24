import { validateCpf } from "../util/validateCpf"

interface IEnrollmentRequest {
  student: {
    name: string;
    cpf: string;
  }
}

class EnrollStudent {
  execute(enrollmentRequest: IEnrollmentRequest) {
    const regExp = /^([A-Za-z]+ )+([A-Za-z])+$/
    const isInvalidName = !regExp.test(enrollmentRequest.student.name)
    if (isInvalidName) {
      throw new Error('Invalid student name')
    }
    const isInvalidCpf = !validateCpf(enrollmentRequest.student.cpf)
    if (isInvalidCpf) {
      throw new Error('Invalid student cpf')
    }
  }
}

export { EnrollStudent }
