exports.formatDataForEntry = data => {
	const formattedData = data.map(element => {
		const dataArray = [];
        for (const [key, value] of Object.entries(element)) {
            if (key == 'created_at') {
                dataArray.push(String(value));
            }
            else {
                dataArray.push(value)
            }
			
		}

		return dataArray;
	});
    console.log(formattedData)
	return formattedData;
};
