exports.formatDataForEntry = data => {

	const formattedData = data.map(element => {
        const dataArray = [];

        for (const [key, value] of Object.entries(element)) {
           

            dataArray.push(value);

        }
     
		return dataArray;
	});
	
  
	return formattedData;
};
