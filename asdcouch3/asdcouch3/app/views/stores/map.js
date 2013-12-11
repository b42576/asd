function (doc) {
	if (doc._id.substr(0, 6) === "store:")
		emit(doc._id.substr(6), {
			"nameofstore": doc.nameofstore,
			"address": doc.address,
			"zip": doc.zip
		});
}