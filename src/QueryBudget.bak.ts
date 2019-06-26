import API from "./API";
import moment from "moment";
import Budget from "./Budget";

export default class QueryBudget {
  private api: API;
  constructor(api: API) {
    this.api = api;
  }
  query = (start: Date, end: Date) => {
    const startYear = start.getFullYear();
    const startMonth = start.getMonth() + 1;
    const startDate = start.getDate();

    const endYear = end.getFullYear();
    const endMonth = end.getMonth() + 1;
    const endDate = end.getDate();

    const allBudget = this.api.findAllBudget();
    let budgetAmount = 0;
    let budgetList: { [key: string]: Budget } = {};
    allBudget.forEach(budget => {
      const budgetYear = moment(budget.getDate()).year();
      const budgetMonth = moment(budget.getDate()).month() + 1;

      if (
        (startYear === budgetYear && startMonth === budgetMonth) ||
        (endYear === budgetYear && endMonth === budgetMonth)
      ) {
      }
    });

    if (start.getMonth === end.getMonth) {
      budgetAmount /= moment(start).daysInMonth();
      budgetAmount *= endDate - startDate + 1;
    } else {
      console.log("Echo");

      budgetAmount = this.getValidBudget(
        startDateDays,
        budgetList[start.getFullYear() + "/" + start.getMonth() + 1]
      );
      budgetAmount += this.getValidBudget(
        startDateDays,
        budgetList[start.getFullYear() + "/" + start.getMonth() + 1]
      );
    }

    return budgetAmount;
  };

  getValidBudget(days: number, budget: Budget) {
    const daysInMonth = moment(budget.getDate()).daysInMonth();
    console.log(days * (budget.getAmount() / daysInMonth));
    return days * (budget.getAmount() / daysInMonth);
  }
}
