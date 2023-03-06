require('dotenv').config();

const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
})

const Person = mongoose.model('Person', personSchema)
const mySecret = process.env['MONGO_URI']
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology:  true  });

const createAndSavePerson = (done) => {


    const person = new Person({
        name: 'Fisayo',
        age: 20,
        favoriteFoods: ['rice', 'chicken']
    });
    person.save(function(err, data) {
        if (err) {
            done(err);
            return;
        }
        done(null, data);
        console.log(data);
    })
};

function createManyPeople(arrayOfPeople, done) {
    Person.create(arrayOfPeople, function(err, data) {
        if (err) {
            done(err);
            return;
        }
        console.log(data);
        done(null, data);
    })
};

const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, function(err, data) {
        if (err) {
            done(err);
            return;
        }
        console.log(data);
        done(null, data);
    })
};

const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, function(err, data) {
        if (err) {
            done(err);
            return;
        }
        console.log(data);
        done(null, data);
    })
};

const findPersonById = (personId, done) => {
    Person.findById(personId, function(err, data) {
        if (err) {
            done(err);
            return;
        }
        console.log(data);
        done(null, data);
    });

};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById(personId, function(err, person) {
        if (err) {
            done(err);
            return;
        }
        console.log(person);
        person.favoriteFoods.push(foodToAdd);
        person.save().then(savedDoc => {
            console.log(savedDoc);
            done(null, savedDoc);

        })
    })
};

const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
    Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true },
        function(err, data) {
            if (err) {
                done(err);
                return;
            }
            console.log(data);
            done(null, data);
        });
};

const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, function(err, data) {
        if (err) {
            done(err);
            return;
        }
        console.log(data);
        done(null, data);
    })
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({ name: nameToRemove }, function(err, data) {
        if (err) {
            done(err);
            return;
        }
        console.log(data);
        done(null, data);
    });

};

const queryChain = (done) => {
    const foodToSearch = "burrito";
    Person
        .find({ favoriteFoods: foodToSearch })
        .sort('name')
        .limit(2)
        .select(['name', 'favoriteFoods'])
        .exec(function(err, data) {
            if (err) {
                done(err);
                return;
            }
            console.log(data);
            done(null, data);
        });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;