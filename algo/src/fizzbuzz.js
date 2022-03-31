

module.exports.mutuallyExclusiveFizzBuzz = function (n) {
    let res = [];

    for (let i = 1; i <= n; ++i) {
        let is_div_3 = ((i % 3) === 0);
        let is_div_5 = ((i % 5) === 0);

        if (is_div_3 && is_div_5)
            res.push("FizzBuzz");
        else if (is_div_3)
            res.push("Fizz");
        else if (is_div_5)
            res.push("Buzz");
        else
            res.push(i)

    }
    return res;
};

/*

// not obvious in the description that the display of "Fizz" and "Buzz" 
// are mutually exclusive with the display of "FizzBuzz" and numbers

// after checking on the web it seems the "traditionnal" fizzbuzz interview exercice 
//seems to be mutually exclusive.
https://towardsdatascience.com/how-to-solve-the-fizzbuzz-problem-in-r-c62e7e6c959a

module.exports.nonMutuallyExclusiveFizzBuzz = function (n) {
    let res = [];

    for (let i = 1; i <= n; ++i) {
        let is_div_3 = ((i % 3) === 0);
        let is_div_5 = ((i % 5) === 0);

        if (is_div_3)
            res.push("Fizz");
        if (is_div_5)
            res.push("Buzz");

        if (is_div_3 && is_div_5)
            res.push("FizzBuzz");
        else
            res.push(i)

    }
    return res;
}
*/
