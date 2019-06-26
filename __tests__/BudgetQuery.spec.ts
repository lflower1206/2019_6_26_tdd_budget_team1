import QueryBudget from "../src/QueryBudget";
import { IBudgetService } from "../src/interface";
import Budget from "../src/Budget";

let queryBudget: QueryBudget;

beforeEach(() => {});

describe("QueryBudget.ts", () => {
  it("should a whole month'", done => {
    class TestAPI implements IBudgetService {
      findAllBudget = () => {
        return [new Budget("2019/6", 30000)];
      };
    }

    queryBudget = new QueryBudget(new TestAPI());

    const start = new Date("2019-06-01");
    const end = new Date("2019-06-30");
    const result = queryBudget.query(start, end);
    expect(result).toBe(30000);

    done();
  });

  it("should be one day'", done => {
    class TestAPI implements IBudgetService {
      findAllBudget = () => {
        return [new Budget("2019/7", 31000)];
      };
    }

    queryBudget = new QueryBudget(new TestAPI());

    const start = new Date("2019-07-01");
    const end = new Date("2019-07-01");
    const result = queryBudget.query(start, end);
    expect(result).toBe(1000);

    done();
  });

  it("should be cross month'", done => {
    class TestAPI implements IBudgetService {
      findAllBudget = () => {
        return [new Budget("2019/8", 31000), new Budget("2019/9", 30000)];
      };
    }

    queryBudget = new QueryBudget(new TestAPI());

    const start = new Date("2019-08-31");
    const end = new Date("2019-09-01");
    const result = queryBudget.query(start, end);
    expect(result).toBe(2000);

    done();
  });
});
