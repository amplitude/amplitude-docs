function setCurlVariable(id, query) {
    let value = document.getElementById(id).value;
    if (value) {
        value = value.trim();
    }
    if (query) {
        if (value && value.length > 0) {
            document.getElementById('curl_' + id).innerHTML =
                '&' + id + '=' + encodeURIComponent(value);
        } else {
            document.getElementById('curl_' + id).innerHTML = '';
        }
    } else {
        document.getElementById('curl_' + id).innerHTML = value;
    }
}

function setupCurlVariable(id, query) {
    setCurlVariable(id, query);
    document.getElementById(id).addEventListener('input', function() {
        setCurlVariable(id, query);
    }, false);
}

function setFailureTip(message) {
    const tip = document.getElementById('failure_tip');
    if (tip && message && message.length > 0) {
        tip.innerHTML = '<p>'+ message + '</p>';
    } else {
        tip.innerHTML = '';
    }
}

function trackAction() {
    if (trackWithPageContext) {
        trackWithPageContext("api table action", new URL(window.location.href));
    }
}

/**
 * Setup an interactive api table.
 *
 * @param {object} ids map of textarea id to bool, if the field is a query param
 * @param {async function(object): string} action the async action function, takes a map of id:value as input and
 * should return a string.
 */
function setupApiTable(ids, action) {
    for (const id of Object.keys(ids)) {
        let value = ids[id];
        setupCurlVariable(id, value || false);
    }
    const button = document.getElementById('at-action-button');
    button.addEventListener('click', async function() {
        trackAction();
        let fields = {};
        for (const id of Object.keys(ids)) {
            let value = document.getElementById(id).value.trim();
            fields[id] = value;
        }
        try {
            const result = await action(fields);
            document.getElementById("result").innerHTML = result;
            setFailureTip();
        } catch (e) {
            document.getElementById("result").innerHTML = e;
            if (e.message === 'Failed to fetch') {
                setFailureTip('🚫 Request blocked. Disable your ad blocker and retry.');
            }
        }
    });
}



document.getElementById('deployment_key').value =
        localStorage.getItem('deployment_key') || '';

    function updateUrl() {
        const serverZone = document.getElementById('server-zone').value;
        const url = serverZone === 'US' ? 'https://api.lab.amplitude.com/v1/vardata?' :
            'https://api.lab.eu.amplitude.com/v1/vardata?';

        document.getElementById('curl_url').textContent = url;
    }

    document.getElementById('curl_url').textContent = 'https://api.lab.amplitude.com/v1/vardata?';

    setupApiTable({
        'deployment_key': false,
        'user_id': true,
        'device_id': true,
        'flag_key': true,
        'context': true,
    }, async function (fields) {
        const deploymentKey = fields['deployment_key'];
        const userId = fields['user_id'];
        const deviceId = fields['device_id'];
        const flagKey = fields['flag_key'];
        const context = fields['context'];

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

        const response = await fetch(uri, {
            headers: {
                'Authorization': 'Api-Key ' + deploymentKey,
            },
        });
        if (response.status != 200) {
            const body = await response.text();
            throw Error(response.status + ': ' + body);
        }
        const result = await response.json();
        return JSON.stringify(result, null, 2);
    });