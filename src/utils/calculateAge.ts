function calculateAge(birthDate: Date): number {
  const timestampDifference = Date.now() - birthDate.getTime();
  const dateDifference = new Date(timestampDifference);
  return Math.abs(dateDifference.getUTCFullYear() - 1970)
}

export { calculateAge }
