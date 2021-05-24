class EnrollStudent {
  execute(enrollmentRequest) {
    const regExp = /^([A-Za-z]+ )+([A-Za-z])+$/
    const isInvalidName = !regExp.test(enrollmentRequest.student.name)
    if (isInvalidName) {
      throw new Error('Invalid student name')
    }
  }
}

export { EnrollStudent }
