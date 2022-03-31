
let inc = require("../src/inc");

describe("test inc", () => {
    it("should return [1,2,4] for inc([1,2,3]", () => {
        let res = inc.inc([1, 2, 3]);
        //   console.log(res);
        expect(res).toEqual([1, 2, 4]);
    });

    it("should return [2,0] for inc([1,9]", () => {
        let res = inc.inc([1, 9]);
        //       console.log(res);
        expect(res).toEqual([2, 0]);
    });

    it("should return [1,0,0] for inc([9,9]", () => {
        let res = inc.inc([9, 9]);
        //       console.log(res);
        expect(res).toEqual([1, 0, 0]);
    });

});