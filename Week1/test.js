function isPalindrome(str) {
    str = str.toLowerCase().trim();
    var len = str.length;
    for (var i = 0; i < len / 2; i++) {
        if (str[i] != str[len - i - 1]) {
            return false
        }
    }
    return true;
}
console.log(isPalindrome("race car"));