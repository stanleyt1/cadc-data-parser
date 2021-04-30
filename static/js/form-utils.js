
export const parseFile = (file) => {
    if (!file) {
        throw new Error("Invalid File");
    }

    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        // set the reader to process the data as excel once finished
        reader.onload = (data) => {
            const workbook = XLSX.read(data.target.result, { type: 'binary' });

            // Read all rows from First Sheet into an array.
            let fileArray = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
            fileArray = cleanColumns(fileArray);
            console.log(fileArray);
            resolve(fileArray);
        }

        // handles error
        reader.onerror = () => {
            reader.abort();
            reject("Error parsing input file");
        };

        //reads in the file
        reader.readAsBinaryString(file);
    })
}

const cleanColumns = (arr) => {
    let max = arr[0].length;
    return arr.map(function (val) {
        return val.slice(0, max);
    });
}
