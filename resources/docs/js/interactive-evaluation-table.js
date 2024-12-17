document.getElementById('deployment_key').value =
    localStorage.getItem('deployment_key') || '';


document.getElementById('server-zone').addEventListener("change", function(){
    const serverZone = document.getElementById('server-zone').value;
    const url = serverZone === 'US' ? 'https://api.lab.amplitude.com/v1/vardata?' :
        'https://api.lab.eu.amplitude.com/v1/vardata?';
    document.getElementById('curl_url').textContent = url;
})

}

document.getElementById('track_assignment').addEventListener("change", function(){
    const shouldNotTrack = document.getElementById('track_assignment').value === 'no-track';
    if (shouldNotTrack) {
        document.getElementById('x-amp-exp-track-line').style.display = 'block';
    } else {
        document.getElementById('x-amp-exp-track-line').style.display = 'none';
    }
});

document.getElementById('curl_url').textContent = 'https://api.lab.amplitude.com/v1/vardata?';
setupApiTable({
    'deployment_key': false,
    'user_id': true,
    'device_id': true,
    'flag_key': true,
    'context': true,
    'track_assignment': false
}, async function (fields) {
    const deploymentKey = fields['deployment_key'];
    const userId = fields['user_id'];
    const deviceId = fields['device_id'];
    const flagKey = fields['flag_key'];
    const context = fields['context'];
    const trackAssignment = fields['track_assignment'];
    localStorage.setItem('deployment_key', deploymentKey);
    const serverZone = document.getElementById('server-zone').value;
    let uri = serverZone === 'US' ? 'https://api.lab.amplitude.com/v1/vardata?' :
        'https://api.lab.eu.amplitude.com/v1/vardata?';
    if (userId && userId.length > 0) {
        uri += '&user_id=' + userId;
    }
    if (deviceId && deviceId.length > 0) {
        uri += '&device_id=' + deviceId;
    }
    if (flagKey && flagKey.length > 0) {
        uri += '&flag_key=' + flagKey;
    }
    if (context && context.length > 0) {
        uri += '&context=' + context;
    }
    const headers = {
        'Authorization': 'Api-Key ' + deploymentKey,
    };
    if (trackAssignment === 'no-track') {
        headers['X-Amp-Exp-Track'] = 'no-track';
    }
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
