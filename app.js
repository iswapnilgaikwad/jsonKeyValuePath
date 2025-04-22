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
        const value = obj[key];
        const fullKey = `${prefix}${key}`;

        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    result += parseJson(item, `${fullKey}[${index}].`);
                } else {
                    result += `"${fullKey}[${index}]" = ${formatValue(item)}\n`;
                }
            });
        } else if (typeof value === 'object' && value !== null) {
            result += parseJson(value, `${fullKey}.`);
        } else {
            result += `"${fullKey}" = ${formatValue(value)}\n`;
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
