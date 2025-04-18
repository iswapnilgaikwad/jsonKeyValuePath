document.getElementById('formatButton').addEventListener('click', function() {
    const jsonInput = document.getElementById('jsonInput').value;
    let formattedOutput = '';
    try {
        const jsonObject = JSON.parse(jsonInput);
        formattedOutput = parseJson(jsonObject);
    } catch (error) {
        formattedOutput = 'Invalid JSON input';
    }
    document.getElementById('output').value = formattedOutput;
});

function parseJson(obj, prefix = '') {
    let result = '';
    for (const key in obj) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            result += parseJson(obj[key], `${prefix}${key}.`);
        } else if (Array.isArray(obj[key])) {
            obj[key].forEach((item, index) => {
                result += parseJson(item, `${prefix}${key}[${index}].`);
            });
        } else {
            result += `"${prefix}${key}" = ${formatValue(obj[key])}\n`;
        }
    }
    return result;
}

function formatValue(value) {
    if (typeof value === 'string') {
        return `"${value}"`;
    } else {
        return value;
    }
}
