import API from "./API";
import Budget from "./Budget";
import moment from "moment";
export default class QueryBudget {
  private api: API;
  constructor(api: API) {
    this.api = api;
  }
  query = (start: Date, end: Date) => {
    const startYear = start.getFullYear();
    const startMonth = start.getMonth() + 1;

    const endYear = end.getFullYear();
    const endMonth = end.getMonth() + 1;

    const allBudget = this.api.findAllBudget();
    let budgetAmount = 0;

    const validAmountList: number[] = [];

    allBudget.forEach(budget => {
      const budgetYear = moment(budget.getDate()).year();
      const budgetMonth = moment(budget.getDate()).month() + 1;

      if (startYear === budgetYear && startMonth === budgetMonth) {
        // budgetAmount = budget.getAmount();
        const startValidDays = this.getStartValidDays(start);
        console.log(startValidDays);
        const amountPerDay = this.getAmountPerDay(budget);
        validAmountList.push(startValidDays * amountPerDay);
      } else if (endYear === budgetYear && endMonth === budgetMonth) {
        const endValidDays = this.getEndValidDays(end);
        const amountPerDay = this.getAmountPerDay(budget);
        //console.log(amountPerDay);
        validAmountList.push(endValidDays * amountPerDay);
      }
    });

    return validAmountList.reduce((prevAmount, currentAmount) => {
      return prevAmount + currentAmount;
    }, 0);
  };

  getStartValidDays = (start: Date): number => {
    const startDays = moment(start).daysInMonth();
    return startDays - moment(start).date() + 1;
  };
  getEndValidDays = (end: Date): number => {
    const endDays = moment(end).daysInMonth();
    return moment(endDays).date();
  };

  //
  getAmountPerDay = (budget: Budget): number => {
    /**
     * start: 2019/8/1
     * budget for : 31
     * return 1
     */
    return budget.getAmount() / moment(budget.getDate()).daysInMonth();
  };
}
