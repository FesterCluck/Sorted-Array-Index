function createSortedIndex(toIndex, arrMethod, delegate) {
	var index = [];

	arrMethod = arrMethod || "sort";

	delegate = delegate || function() { return 0; };		

	toIndex.forEach(function(el, ix) {
		index.push({});
		var cix = (index.length-1).toString();
		Object.defineProperty(index, cix, {
			enumerable : true,
			configurable : true,
			get : function() { return toIndex[ix]; },
			set : function setterFunc(val) {
				Object.defineProperty(index, cix, {
					enumerable : true,
					configurable : true,
					get: function() { return toIndex[toIndex.indexOf(val)]; },
					set : Object.getOwnPropertyDescriptor(this, cix).set
				});
			} 
		});
	});

	return index[arrMethod](delegate);
}
	
