class EnrollmentCode {
  sequenceCount: number;
  enrollmentCode: string;


  constructor(level: string, module: string, clazz: string) {
    this.enrollmentCode = ''
    this.sequenceCount = 0
    const year = new Date().getFullYear()
    const sequence = this.generateSequence()
    this.enrollmentCode = `${year}${level}${module}${clazz}${sequence}`
  }

  private generateSequence() {
    this.sequenceCount++
    return (this.sequenceCount).toString().padStart(4,'0')
  }

}

export { EnrollmentCode }
