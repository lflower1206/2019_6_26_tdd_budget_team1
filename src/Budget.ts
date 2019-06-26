export default class Budget {
  private date: Date;
  private amount: number;

  constructor(dateString: string, amount: number) {
    this.date = new Date(dateString);

    this.amount = amount;
  }

  getDate = () => {
    return this.date;
  };

  getAmount = () => {
    return this.amount;
  };
}
