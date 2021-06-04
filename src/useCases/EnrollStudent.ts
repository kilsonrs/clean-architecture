import { EnrollmentCode } from "../EnrollmentCode";
import { Student } from "../Student";
import { calculateAge } from "../utils/calculateAge";

class EnrollStudent {
  private enrollments: any[] = [];
  private data = {
    levels: [
        {
            code: "EF1",
            description: "Ensino Fundamental I"
        },
        {
            code: "EF2",
            description: "Ensino Fundamental II"
        },
        {
            code: "EM",
            description: "Ensino Médio"
        }
    ],
    modules: [
        {
            level: "EF1",
            code: "1",
            description: "1o Ano",
            minimumAge: 6,
            price: 15000
        },
        {
            level: "EF1",
            code: "2",
            description: "2o Ano",
            minimumAge: 7,
            price: 15000
        },
        {
            level: "EF1",
            code: "3",
            description: "3o Ano",
            minimumAge: 8,
            price: 15000
        },
        {
            level: "EF1",
            code: "4",
            description: "4o Ano",
            minimumAge: 9,
            price: 15000
        },
        {
            level: "EF1",
            code: "5",
            description: "5o Ano",
            minimumAge: 10,
            price: 15000
        },
        {
            level: "EF2",
            code: "6",
            description: "6o Ano",
            minimumAge: 11,
            price: 14000
        },
        {
            level: "EF2",
            code: "7",
            description: "7o Ano",
            minimumAge: 12,
            price: 14000
        },
        {
            level: "EF2",
            code: "8",
            description: "8o Ano",
            minimumAge: 13,
            price: 14000
        },
        {
            level: "EF2",
            code: "9",
            description: "9o Ano",
            minimumAge: 14,
            price: 14000
        },
        {
            level: "EM",
            code: "1",
            description: "1o Ano",
            minimumAge: 15,
            price: 17000
        },
        {
            level: "EM",
            code: "2",
            description: "2o Ano",
            minimumAge: 16,
            price: 17000
        },
        {
            level: "EM",
            code: "3",
            description: "3o Ano",
            minimumAge: 17,
            price: 17000
        }
    ],
    classes: [
        {
            level: "EM",
            module: "3",
            code: "A",
            capacity: 1
        }
    ]
};
  execute(enrollmentRequest: any) {
    const { student: { name, cpf, birthDate }, level, module, class: clazz } = enrollmentRequest
    const student = new Student(name, cpf)
    const existingEnrollment = this.enrollments.find(enrollment => enrollment.student.cpf.value === cpf)
    if(existingEnrollment) throw new Error('Enrollment with duplicated student is not allowed')
    const minimumAge = this.data.modules.find(_module => _module.level === level)?.minimumAge
    const studentAge = calculateAge(new Date(birthDate))
    if(studentAge < minimumAge!) throw new Error("Student below minimum age")
    const classCapacity = this.data.classes.find(clazz => clazz.code)?.capacity
    const classStudentQuantity = this.enrollments.reduce((accumulator, enrollment) => {
      if(enrollment.level === level) return accumulator = accumulator + 1
    }, 0)
    if(classCapacity === classStudentQuantity) throw new Error("Class is over capacity")
    const { enrollmentCode } = new EnrollmentCode(level, module, clazz)
    const enrollment = { student, enrollmentCode, level, module, class: clazz }
    this.enrollments.push(enrollment)
    return enrollment
  }
}

export { EnrollStudent }
