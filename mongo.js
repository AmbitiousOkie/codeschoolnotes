// Updates the first document that has Devotion shift as the name with the price of 5.99
db.wands.update(
	{"name": "Devotion Shift"},
  {"$set": {"price": 5.99}}
)



// updates ALL documents with the vendor KC to Kettlecooked
db.potions.update(
	{"vendor": "KC"},
	{"$set": { "vendor": "Kettlecooked" }},
	{"multi": true}
)

// Increments the count variable in the potion log for Shrinking potion
db.logs.update(
	{"potion": "Shrinking"},
	{"$inc": {"count": 1}}
)

// Inserts a document if no document is found to update
db.logs.update(
	{"potion": "Love"},
	{"$inc": {"count": 1}},
	{"upsert": true}
)


// Removes the color field from all documents
db.potions.update(
	{},
	{"$unset": {"color": ""}},
	{"multi": true}
)

// Renames a field name
db.potions.update(
	{},
	{"$rename": {"score": "grade"}},
	{"multi": true}
)


// Updates the 2nd value of the ingredients array
db.potions.update(
	{"name": "Shrinking"},
	{"$set": {"ingredients.1": 42}}
)

// Finds and updates the queried value in all documents
db.potions.update(
	{"ingredients": "secret"},
	{"$set": {"ingredients.$": 42}},
	{"multi": true}
)

// Dot notation for updating a child object
db.potions.update(
	{"name": "Shrinking"},
	{"$set": {"rating.strength": 5}}
)


// Remove the last value from an array
db.potions.update(
	{"name": "Shrinking"},
	{"$pop": {"categories": 1}}
)


// Remove the first value from an array
db.potions.update(
	{"name": "Shrinking"},
	{"$pop": {"categories": -1}}
)

// Adds a value to the end of an array
db.potions.update(
	{"name": "Shrinking"},
	{"$push": {"categories": "budget"}}
)

// Only adds to an array if not present
db.potions.update(
	{"name": "Shrinking"},
	{"$addToSet": {"categories": "budget"}}
)

// Removes any matching value from an array
db.potions.update(
	{"name": "Shrinking"},
	{"$pull": {"categories": "tasty"}}
)

// multiplies the value of the price field on the document with _id: 1 
db.products.update(
   { _id: 1 },
   { $mul: { price: 1.25 } }
)

// Part 3 ----------------------------------
//Queries

// find potions with a price less than 20
db.potions.find({"price": {"$lt": 20}})

// find potions with a price less than or equal 20
db.potions.find({"price": {"$lte": 20}})

// find potions with a price greater than 10 AND less than 20
db.potions.find({"price": {"$gt": 10, "$lt": 20}}) 

// Find vendors not equal to Brewers
db.potions.find({"vendor": {"$ne": "Brewers"}})

// Find at least 1 value in an array that matches
db.potions.find(
	{"sizes": {"$elemMatch": {"$gt": 8, "$lt": 16}}}
)

// Only returns the vendor and name of potions with a grade >= 80
db.potions.find(
	{"grade": {"$gte": 80}},
	{"vendor": true, "name": true}
)

// Returns all fields except for vendor and name
db.potions.find(
	{"grade": {"$gte": 80}},
	{"vendor": false, "name": false}
)

// Counts the total found
db.potions.find().count()


// Sort the results by pricing ascending
db.potions.find().sort({"price": 1})

// Sort the results by pricing descending
db.potions.find().sort({"price": -1})

// Limit to the first 3
db.potions.find().limit(3)

// Pagination
db.potions.find().skip(3).limit(3)

// Mixed
db.wands.find({}, {"name": true, "powers": true, "_id": false})

// Part 4 ------------------------------

// Relations
db.Potion
{
	"_id": ObjectId(...),
	"name": "Invisibility",
	"vendor_id": "Kettlecooked",  //maps the relation
	...
}

db.vendor{
	"_id": "Kettlecooked",  // the matching ID
	"phone": 5555555555,
	"organic": true
}

// Part 5 ------------------------------

// Returns all unique vendors in the collection
db.potions.aggregate([
	{"$group": {"_id": "$vendor_id",}}
])

// Adds a "total" field to each document equaling the number of vendors with that name
db.potions.aggregate([
	{"$group": {"_id": "$vendor_id", "total": {"$sum": 1}}}
])

// Sums existing values per vendor
db.potions.aggregate([
	{"$group": {
		"_id": "$vendor_id",
		 "total": {"$sum": 1},
		 "grade_total": {"$sum": "$grade"} //sums all the grades per vendor
		}
	}
])

// Averages existing values per vendor
db.potions.aggregate([
	{"$group": {
		"_id": "$vendor_id",
		"avg_grade": {"$avg": "$grade"} // Returns the average of each grade per vendor
		}
	}
])

// Finds the maximum/ minimum existing value per vendor
db.potions.aggregate([
	{"$group": {
		"_id": "$vendor_id",
		"max_grade": {"$max": "$grade"}, // Returns the maximum value of grade per vendor
		"min_grade": {"$min": "$grade"}  // Returns the minimum value of grade per vendor
		}
	}
])



// Aggregates use stage operators, meaning each part is a different part of the stage pipeline
db.potions.aggregate([
	{"$match": {"ingredients": "unicorn"}}, // passes along only matching queries
	{"$group":
		{
			"_id": "$vendor_id",
			"potion_count": {"$sum": 1}
		}
	}
])

db.potions.aggregate([
	{"$match": {"price": {"$lt": 15}}}, // the query
	{"$project": {"_id": false, "vendor_id": true, "grade": true}}, // limits the fields returned
	{"$group": {"id": "$vendor_id", "avg_grade": {"$avg": "$grade"}}}, // grouping and accumalators
	{"$sort": {"avg_grade": -1}}, // sorts the results
	{"$limit": 3}  // pagination
])


db.wands.aggregate([
  {$match: {level_required: {$lte: 5}}}, // the query
  {$project: {"_id": false, "maker": true, "damage.magic": true}}, // limits the fields returned
  {$group: {_id: "$maker", max_damage: {$max: "$damage.magic"}}}, // creates the aggregate field of max_damage and groups by _id (maker)
  {$sort: {max_damage: -1}}, // sorts the return by the max_damage field descending
  {$limit: 4} // limits to the top four results
])