export const validateCreditCardLuhn = (number) => {
    const reversed = number.split("").reverse();
    const doubled = reversed.map((digit, index) => {
        if (index % 2 === 0) {
            return digit;
        }
        const doubledDigit = digit * 2;
        return doubledDigit > 9 ? doubledDigit - 9 : doubledDigit;
    });
    const total = doubled.reduce((acc, digit) => acc + parseInt(digit), 0);
    return total % 10 === 0;

};


export const validateCreditCardExpiration = (month, year) => {

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    return year > currentYear || (year === currentYear && month >= currentMonth);
};



export const validateCreditCardCvc = (cvc) => {
    return cvc.length === 3 || cvc.length === 4;
}

export const creditCardExpireMonths = () => {
    return [
        { id: "01", title: "01" },
        { id: "02", title: "02" },
        { id: "03", title: "03" },
        { id: "04", title: "04" },
        { id: "05", title: "05" },
        { id: "06", title: "06" },
        { id: "07", title: "07" },
        { id: "08", title: "08" },
        { id: "09", title: "09" },
        { id: "10", title: "10" },
        { id: "11", title: "11" },
        { id: "12", title: "12" },
    ];
}

export const creditCardExpireYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 10; i++) {
        years.push({ id: currentYear + i, title: currentYear + i });
    }
    return years;
}