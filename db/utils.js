exports.formatDataForEntry = data => {
    //maps/iterates the data to a new array to avoid mutation
	const formattedData = data.map(element => {
        const dataArray = [];
        //for each key and value of the element we check if its a key of created at if it is we convert the value to a string and push to dataArray else we just push the value
		for (const [key, value] of Object.entries(element)) {
			if (key == 'created_at') {
				dataArray.push(String(value));
			} else {
				dataArray.push(value);
			}
        }
        //return the inner array
		return dataArray;
	});
	// console.log(formattedData);
    //returns the mapped array of arrays
	return formattedData;
};
