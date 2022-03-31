// increment map
const inc_map = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function recAddOne(rev_digits, column_index) {
    if (column_index == rev_digits.length)
        rev_digits.push(0);

    const digit = rev_digits[column_index];
    rev_digits[column_index] = inc_map[digit];
    if (inc_map[digit] === 0)
        recAddOne(rev_digits, column_index + 1);

}

module.exports.inc = function (digits_array) {

    let rev_digits = digits_array.slice(0).reverse();
    recAddOne(rev_digits, 0);

    return rev_digits.reverse();

}