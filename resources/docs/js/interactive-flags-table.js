document.getElementById('deployment_key_flag').value =
    localStorage.getItem('deployment_key') || '';


document.getElementById('server-zone_flag').addEventListener("change", function(){
    const serverZone = document.getElementById('server-zone_flag').value;
    const url = serverZone === 'US' ? 'https://api.lab.amplitude.com/v1/flags?' :
        'https://api.lab.eu.amplitude.com/v1/flags?';
    document.getElementById('curl_url_flag').textContent = url;
})

document.getElementById('curl_url_flag').textContent = 'https://api.lab.amplitude.com/v1/flags?';
setupApiTable({
    'deployment_key_flag': false,
    'flag_keys_flag': true,
}, async function (fields) {
    const deploymentKey = fields['deployment_key'];
    const flagKeys = fields['flag_keys'];
    localStorage.setItem('deployment_key', deploymentKey);
    const serverZone = document.getElementById('server-zone').value;
    let uri = serverZone === 'US' ? 'https://api.lab.amplitude.com/v1/flags?' :
        'https://api.lab.eu.amplitude.com/v1/flags?';
    if (flagKeys && flagKeys.length > 0) {
        uri += '&flag_keys=' + flagKeys;
    }
    const headers = {
        'Authorization': 'Api-Key ' + deploymentKey,
    };
    const response = await fetch(uri, {
        headers: headers,
    });
    if (response.status != 200) {
        const body = await response.text();
        throw Error(response.status + ': ' + body);
    }
    const result = await response.json();
    return JSON.stringify(result, null, 2);
});
