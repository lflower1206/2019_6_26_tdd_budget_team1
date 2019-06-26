import { IBudgetService } from "./interface";
import Budget from "./Budget";

export default class API implements IBudgetService {
  findAllBudget = (): Budget[] => {
    return [];
  };
}
