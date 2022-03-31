
let fizzbuzz = require("../src/fizzbuzz");

describe("test fizzbuzz mutually exclusive function", () => {
    it("test fizzbuzz mutually exclusive function up to 15", () => {
        let res = fizzbuzz.mutuallyExclusiveFizzBuzz(15);
        //  console.log(res);
        expect(res).toEqual([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]);
    });

});