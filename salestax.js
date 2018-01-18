var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

// Given the following data, implement a function that
// calculates the total sales and total tax, grouped by company.

function calculateSalesTax(salesData, taxRates) {
  // store salesData and taxRates variables for better performance

  var dataSales = salesData;
  var ratesTax = taxRates;

  // initialize expectedResults object to keep salesData and taxRates
  var expectedResults = {};

  // loop through salesData *object wrapped in array* - for of gives the OBJECT
  for (let data of dataSales) {

    // better performance if referencing data constantly
    var currData = data;

    // check if business name exists in expectedResults
    if (!expectedResults[currData.name]) {

    // store business names as keys in expectedResults
      expectedResults[currData.name] = {};
      expectedResults[currData.name]["totalSales"] = 0;
      expectedResults[currData.name]["totalTaxes"] = 0;
    }

    // calculate sales in array
    // used array.reduce() from:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    var totalSales = sumArray(data.sales);

    // store totalSales to corresponding business expectedResults
    expectedResults[currData.name]["totalSales"] += totalSales;

    // get corresponding taxRates for business' province
    var totalTaxRate = ratesTax[data.province] * totalSales;

    // store totalTax to corresponding business expectedResults
    expectedResults[currData.name]["totalTaxes"] += totalTaxRate;
  }

  return expectedResults;

}

// returns number (sum of given array)
function sumArray(array) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return array.reduce(reducer);
}

var results = calculateSalesTax(companySalesData, salesTaxRates);
console.log(results);

/* Expected Results:
{
  Telus: {
    totalSales: 1300
    totalTaxes: 144
  },
  Bombardier: {
    totalSales: 800,
    totalTaxes: 40
  }
}
*/