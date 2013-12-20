function (doc) {
	if (doc._id.substr(0, 15) === "productLocation")
		emit(doc._id.substr(15), {
			"storeid": doc.storeid,
			"item": doc.item,
			"department": doc.department,
			"aisle": doc.aisle,
			"location": doc.location
		});
}