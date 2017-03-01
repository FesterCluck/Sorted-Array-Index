function createSortedIndex(toIndex, arrMethod, delegate, filterFunc) {
	var index = [];

	arrMethod = arrMethod || "sort";

	delegate = delegate || function() { return 0; };

	var skipped = 0;
	
	function createGetter(item) {
		var item = item;
		return function() {
			return toIndex[item];
		};
	}

	Object.entries(toIndex).forEach(([key,val], ix) => {

		if(filterFunc && !filterFunc(val)) {
			skipped++;
			return;
		}
		index.push({});
		var cix = (ix-skipped).toString();
		Object.defineProperty(index, cix, {
			enumerable : true,
			configurable : true,
			get : createGetter(key),
			set : function setterFunc(val) {
				Object.defineProperty(index, cix, {
					enumerable : true,
					configurable : true,
					get: function() { return toIndex[Object.keys(toIndex)[Object.values(toIndex).indexOf(val)]]; },
					set : Object.getOwnPropertyDescriptor(this, cix).set
				});
			}
		});
	});

	return index[arrMethod](delegate);
}
