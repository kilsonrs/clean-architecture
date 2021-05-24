function validateCpf(cpf: string){
  cpf = extractDigits(cpf)
  if (isInvalidLength(cpf)) return false;
  if(isBlockedCpf(cpf)) return false;
  const digit1 = calculateDigit(cpf, 10, 9);
  const digit2 = calculateDigit(cpf, 11, 10);
  let cpfCheckDigit = cpf.slice(9);
  let calculatedCheckDigit = `${digit1}${digit2}`;
  return cpfCheckDigit === calculatedCheckDigit;
}

function extractDigits(cpf: string){
  return cpf.replace(/\D/g, '');
}

function isInvalidLength(cpf: string){
  return cpf.length !== 11;
}

function isBlockedCpf(cpf: string){
  const [digit1] = cpf;
  return cpf.split('').every(digit => digit === digit1);
}

function calculateDigit(cpf: string, factor: number, max: number){
  let total = 0;
  for (const digit of toDigitArray(cpf).slice(0, max)) {
    total += digit * factor--;
  }
  return (total%11 < 2) ? 0 : (11 - total%11);
}

function toDigitArray(cpf: string){
  return [...cpf].map(digit => parseInt(digit))
}

export { validateCpf }
