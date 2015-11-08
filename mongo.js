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