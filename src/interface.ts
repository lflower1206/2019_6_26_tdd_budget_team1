import Budget from "./Budget";

export interface IBudgetService {
  findAllBudget: () => Budget[];
}
