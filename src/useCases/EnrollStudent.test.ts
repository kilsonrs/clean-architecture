import { EnrollStudent } from "./EnrollStudent";

let enrollStudent: EnrollStudent;

describe('EnrollStudent', () => {
  beforeEach(() => {
    enrollStudent = new EnrollStudent();
  });
  it('should not be able enroll without valid student name', () => {
    const enrollmentRequest = {
      student: {
        name: 'Ana',
        cpf: 'any_cpf'
      }
    }
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid student name"))
  });
  it('Should not enroll without valid student cpf', () => {
    const enrollmentRequest = {
      student: {
        name: "Ana Silva",
        cpf: "123.456.789-99"
      }
    }
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid student cpf"))
  });
  it('Should not enroll duplicated student', () => {
    const enrollmentRequest = {
      student: {
        name: "Ana Silva",
        cpf: "832.081.519-34"
      }
    }
    enrollStudent.execute(enrollmentRequest)
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Enrollment with duplicated student is not allowed"))
  });
});
