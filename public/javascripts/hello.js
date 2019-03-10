window.alert("Hello World!");

var salaryString = window.prompt("What are your yearly earnings?","Enter here");

var salaryNumber = parseFloat(salaryString);
var mortgageNumber = salaryNumber * 3.5;

if (salaryNumber > 50000){
    alert("You are rather wealthy :)")
}
else{
    alert("You are rather poor :(")
}

window.alert("The total amount you can borrow is : €"+mortgageNumber);

/*
Calculate monthly mortgage payments
P = L[c(1 + c)n]/[(1 + c)n - 1]
 */

var interestRate = .006;
var months = 12 * 30;

var monthlyPayment = mortgageNumber * (interestRate * (Math.pow((1 + interestRate),months)))/((Math.pow((1 + interestRate),months - 1)));
window.alert("Your monthly payment over "+months+" months is : €"+monthlyPayment.toFixed(2));

/* =========================== */

var ageString = window.prompt("What is your age?","Enter here");
var ageInteger = parseInt(ageString);

/* Passing by value into function */

function ageIncrementer(input) {

    input++;

    alert("My age inside the function is "+input);

}

ageIncrementer(ageInteger);
alert("My age outside the function is "+ageInteger);

/* Returning a value from a function */

function ageIncrementer2(inputAge) {

    inputAge++;

   return inputAge;

}

var includeAge = ageIncrementer2(ageInteger);
alert("Using the function that returns an age assigned to a new variable is :"+includeAge);