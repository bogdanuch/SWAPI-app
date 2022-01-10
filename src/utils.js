import axios from "axios";

const parseBirthDate = (birthData) => {
    const era = birthData.slice(-3);
    const year = birthData.slice(0, -3);
    if (era === 'BBY') {
        return -year
    } else {
        return +year
    }
}

const requestData = async (setDataFunc, searchParam, valueKey) => {
    setDataFunc({dataArray: []});
    const UrlStructure = {}
    let lastData = {data: {next: `https://swapi.dev/api/${searchParam}`}};
    while (lastData.data.next) {
        lastData = await axios({
            'method': 'GET',
            'url': lastData.data.next
        })
        const data = lastData.data.results.map((result) => {
            UrlStructure[result.url] = result[valueKey];
            return {...result, value: result[valueKey], label: result[valueKey]}
        });
        setDataFunc((dataState) => {
            return {...UrlStructure, dataArray: [...dataState.dataArray, ...data]}
        })
    }
}
const deleteCharacterElement = (array, arrayIndex) => {
    let firstHalf = []
    if (arrayIndex !== 0) {
        firstHalf = array.data.slice(0, arrayIndex);
    }
    const secondHalf = array.data.slice(arrayIndex + 1, array.data.length);
    return {
        ...array,
        data: [...firstHalf, ...secondHalf],
        [array.data[arrayIndex].url]: undefined
    };
}

export {parseBirthDate, requestData, deleteCharacterElement}