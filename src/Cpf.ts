class Cpf {
  value: String;

  constructor(value: string) {
    if(!this.validate(value)) throw new Error('Invalid student cpf')
    this.value = value
  }

  validate(cpf: string) {
    cpf = this.extractDigits(cpf)
    if (this.isInvalidLength(cpf)) return false;
    if(this.isBlockedCpf(cpf)) return false;
    const digit1 = this.calculateDigit(cpf, 10, 9);
    const digit2 = this.calculateDigit(cpf, 11, 10);
    let cpfCheckDigit = cpf.slice(9);
    let calculatedCheckDigit = `${digit1}${digit2}`;
    return cpfCheckDigit === calculatedCheckDigit;
  }

  extractDigits(cpf: string){
    return cpf.replace(/\D/g, '');
  }

  isInvalidLength(cpf: string){
    return cpf.length !== 11;
  }

  isBlockedCpf(cpf: string){
    const [digit1] = cpf;
    return cpf.split('').every(digit => digit === digit1);
  }

  calculateDigit(cpf: string, factor: number, max: number){
    let total = 0;
    for (const digit of this.toDigitArray(cpf).slice(0, max)) {
      total += digit * factor--;
    }
    return (total%11 < 2) ? 0 : (11 - total%11);
  }

  toDigitArray(cpf: string){
    return [...cpf].map(digit => parseInt(digit))
  }
}

export { Cpf }
