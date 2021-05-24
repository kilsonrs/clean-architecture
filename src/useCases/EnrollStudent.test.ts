import { EnrollStudent } from "./EnrollStudent";

let enrollStudent;

describe('EnrollStudent', () => {
  beforeEach(() => {
    enrollStudent = new EnrollStudent();
  });
  it('should not be able enroll without valid student name', () => {
    const enrollmentRequest = {
      student: {
        name: 'Ana'
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
});
