document.getElementById('api_key').value =
     localStorage.getItem('api_key') || '';

function updateUrl() {
     const serverZone = document.getElementById('server-zone').value;
     const url = serverZone === 'US' ? 'https://api2.amplitude.com/2/httpapi' :
          'https://api.eu.amplitude.com/2/httpapi';

     document.getElementById('curl_url').textContent = url;
}

document.getElementById('curl_url').textContent = 'https://api2.amplitude.com/2/httpapi';

setupApiTable({
     'api_key': false,
     'user_id': false,
     'flag_key': false,
     'variant': false,
}, async function(fields) {
     const apiKey = fields['api_key'];
     const userId = fields['user_id'];
     const flagKey = fields['flag_key'];
     const variant = fields['variant'];

     localStorage.setItem('api_key', apiKey);

     const serverZone = document.getElementById('server-zone').value;
     const url = serverZone === 'US' ? 'https://api2.amplitude.com/2/httpapi' :
          'https://api.eu.amplitude.com/2/httpapi';

     const response = await fetch(url, {
          method: 'POST',
          headers: {
               'Content-Type':'application/json',
               'Accept':'*/*'
          },
          body: JSON.stringify({
               "api_key": apiKey,
               "events":[{
                    "event_type":"$exposure",
                    "user_id": userId,
                    "event_properties":{
                         "flag_key": flagKey,
                         "variant": variant
                    }
               }]
          })
     });
     if (response.status != 200) {
          const body = await response.text();
          throw Error(response.status + ': ' + body);
     }
     const result = await response.json();
     return JSON.stringify(result, null, 2);
});