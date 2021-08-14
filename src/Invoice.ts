export class Invoice {
  code: any
  month: any
  year: any
  amount: any

  constructor(
    code: string,
    month: number,
    year: number,
    amount: number
  ){
    this.code = code
    this.month = month
    this.year = year
    this.amount = amount
  }
}
