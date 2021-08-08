// JScript source code
/*A BMI Calculator to compute BMI and health risk.*/
/*The function returns count of number of overweight people in given data set.*/
/*Author--@Kokil Awasthi - 08.08.2021*/
'use strict';

function compute(inputJSON) {
    try{
    var p = [];
    var inputData = new Map();
    var count = 0;
    var j = 1;
    for (var i = 0; i < inputJSON.length; i++) {
        inputData.set(j, {
            "Gender": inputJSON[i].Gender,
            "HeightCm": inputJSON[i].HeightCm,
            "WeightKg": inputJSON[i].WeightKg
        });
        j++;
    }

    function person(gender, height, weight) {
        this.gender = gender;
        this.height = parseFloat(height);
        this.weight = parseFloat(weight);
    }

    for (const [key, value] of inputData) {
        p.push(new person(value.Gender, value.HeightCm, value.WeightKg));
    }
    /*Using Prototype allows new methods/properties to be added for objects created through function constructor.
    /*It complies with DRY - Dont repeat yourself principle.*/

    person.prototype.bMI = function() {
        var result = (this.weight) / (this.height / 100);
        return result.toPrecision(3);
    }
    person.prototype.bMICategory = function() {
        var info = new Map();
        info.set('Underweight', [0, 18.4]);
        info.set('Normal weight', [18.5, 24.9]);
        info.set('Overweight', [25, 29.9]);
        info.set('Moderately obese', [30, 34.9]);
        info.set('Severely obese', [35, 39.9]);
        info.set('Very severely obese', [40]);
        for (const [key, value] of info) {
            if (value.length > 1) {
                if (this.bMI() >= value[0] && this.bMI() <= value[1])
                    return key;
            } else if (value.length == 1) {
                if (this.bMI() >= value[0]) return key;
            }
        }
    }

    person.prototype.healthRisk = () => ['Malnutrition risk', 'Low risk', 'Enhanced risk', 'Medium risk', 'High risk', 'Very high risk'];

    /*To find overweigth count*/
    /*1. Find the BMI of each person*/

    //calculate overweigth ->
    for (var i = 0; i < p.length; i++) {
        console.log('BMI of ' + i + ' is # ' + p[i].bMI());
        if (p[i].bMICategory() == 'Overweight')
            count++;
    }
    return count;
}catch(err){
    console.error(err);
}
}

var inputJSON = [{
        "Gender": "Male",
        "HeightCm": 171,
        "WeightKg": 96
    },
    {
        "Gender": "Male",
        "HeightCm": 161,
        "WeightKg": 85
    },
    {
        "Gender": "Male",
        "HeightCm": 180,
        "WeightKg": 77
    },
    {
        "Gender": "Female",
        "HeightCm": 166,
        "WeightKg": 62
    },
    {
        "Gender": "Female",
        "HeightCm": 150,
        "WeightKg": 70
    },
    {
        "Gender": "Female",
        "HeightCm": 167,
        "WeightKg": 82
    }
];
compute(inputJSON);
