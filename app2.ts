function add(num1: number | string, num2: number | string) {
    if (typeof num1 == 'number' && typeof num2 == 'number')
        return num1 + num2;
    else if (typeof num1 == 'string' && typeof num2 == 'string')
        return num1 + " " + num2;
    return +num1 + +num2;
}

// console.log(add(1,2));
// console.log(add("1",2));
// console.log(add("1","2"));
// console.log(add(1,"2"));

const num: number[] = [];

// const strings : string[] =[];

// strings.push("Bhausaheb")

// console.log(num);

let result = add(1, 2)
num.push(result as number)

function printdata<Type>(result: { val: number; date: Date }) {
    console.log(result.val)
    console.log(result.date);
    console.log(num);


}

printdata<String>({ val: 2, date: new Date() })
