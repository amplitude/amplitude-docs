---
id: 19c7fa54-15db-4eaa-8423-5338819cc0f4
blueprint: api
title: 'HTTP API Quickstart'
standard_endpoint: d
api_status: ga
source: 'https://www.docs.developers.amplitude.com/analytics/apis/http-v2-api-quickstart/'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1724431700
---
Use this guide to get started with the Amplitude HTTP V2 API. For a more in-depth look at more considerations and error handling, refer to the complete [HTTP V2 API Reference](/docs/apis/analytics/http-v2).

## Send data

{{partial:admonition type="note" heading="EU Residency"}}
For EU data residency, configure the project inside Amplitude EU. Replace the standard endpoint `https://api2.amplitude.com/2/httpapi` with the EU residency endpoint `https://api.eu.amplitude.com/2/httpapi` in all examples to ensure proper data residency.
{{/partial:admonition}}

Choose your target platform to send a POST request to `https://api2.amplitude.com/2/httpapi` (or `https://api.eu.amplitude.com/2/httpapi` for EU residency). Replace `YOUR_API_KEY` with the [API KEY](/docs/apis/authentication) for your Amplitude project.

{{partial:tabs tabs="cURL, Wget, HTTP, JavaScript, NodeJS, Ruby, Python, Java, Go"}}
{{partial:tab name="cURL"}}
```curl
curl -X POST https://api2.amplitude.com/2/httpapi \
    -H "Content-Type: application/json" \
    -H "Accept: */*" \
    -d "{
        'api_key': 'YOUR_API_KEY',
        'events': [{
        'user_id': '203201202',
        'device_id': 'C8F9E604-F01A-4BD9-95C6-8E5357DF265D',
        'event_type': 'watch_tutorial'
        }]
        }"
```
{{/partial:tab}}
{{partial:tab name="Wget"}}
```bash
wget --method=POST https://api2.amplitude.com/2/httpapi \
    --header="Content-Type: application/json" \
    --header="Accept: */*" \
    --body-data='{ 
        "api_key": "YOUR_API_KEY",
        "events": [{
        "user_id": "203201202",
        "device_id": "C8F9E604-F01A-4BD9-95C6-8E5357DF265D",
        "event_type": "watch_tutorial"
        }]
        }'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
POST https//api2.amplitude.com/2/httpapi HTTP/1.1
Host: api2.amplitude.com
Content-Type: application/json
Accept: */*
Body: { 
        "api_key": "YOUR_API_KEY",
        "events": [{
            "user_id": "203201202",
            "device_id": "C8F9E604-F01A-4BD9-95C6-8E5357DF265D",
            "event_type": "watch_tutorial"
            }]
    }
```
{{/partial:tab}}
{{partial:tab name="JavaScript"}}
```js
const payload = {
    api_key: 'YOUR_API_KEY', // Replace with your Amplitude API key
    events: [
        {
            'user_id': '203201202',
            'device_id': 'C8F9E604-F01A-4BD9-95C6-8E5357DF265D',
            'event_type': 'watch_tutorial',
        }
    ]
};

async function sendAmplitudeEvent() {
    try {
        const response = await fetch('https://api2.amplitude.com/2/httpapi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.code != 200)  {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function to send the event
sendAmplitudeEvent();
```
{{/partial:tab}}
{{partial:tab name="NodeJS"}}
```js
fetch('https://api2.amplitude.com/2/httpapi', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
    },
    body: JSON.stringify({
        "api_key": "YOUR_API_KEY",
        "events": [{
            "user_id": "203201202",
            "device_id": "C8F9E604-F01A-4BD9-95C6-8E5357DF265D",
            "event_type": "watch_tutorial"
        }]
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
```
{{/partial:tab}}
{{partial:tab name="Ruby"}}
```ruby
require "net/http"
require "json"

url = URI("https://api2.amplitude.com/2/httpapi")

headers = {
"Content-Type" => "application/json",
"Accept" => "*/*",
}

data = {
"api_key": "YOUR_API_KEY",
"events": [{
    "user_id": "203201202",
    "device_id": "C8F9E604-F01A-4BD9-95C6-8E5357DF265D",
    "event_type": "watch_tutorial",
}],
}.to_json

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url, headers)
request.body = data

response = http.request(request)

if response.code == "200"
puts "Success: #{response.body}"
else
puts "Error: #{response.body}"
end
```
{{/partial:tab}}
{{partial:tab name="Python"}}
```python
import requests
import json

headers = {
    'Content-Type': 'application/json',
    'Accept': '*/*'
}

data = {
    "api_key": "YOUR_API_KEY",
    "events": [{
        "user_id": "203201202",
        "device_id": "C8F9E604-F01A-4BD9-95C6-8E5357DF265D",
        "event_type": "watch_tutorial"
    }]
}

response = requests.post('https://api2.amplitude.com/2/httpapi',
                        headers=headers, data=json.dumps(data))

if response.status_code == 200:
    print("Success:", response.json())
else:
    print("Error:", response.text)
```
{{/partial:tab}}
{{partial:tab name="Java"}}
Save the following file as `AmplitudeEventsSender.java`.  Run `javac AmplitudeEventsSender.java` in the same directory as where you save it. Then run `java AmplitudeEventsSender` to run the program.

```java
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class AmplitudeEventsSender {

    private final String API_KEY = "YOUR_API_KEY";
    private final String API_URL = "https://api2.amplitude.com/2/httpapi";

    public static void main(String[] args) throws Exception {
        AmplitudeEventsSender sender = new AmplitudeEventsSender();
        sender.sendEvents();
    }

    private void sendEvents() throws Exception {
        URL url = new URL(API_URL);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();

        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Accept", "*/*");
        con.setDoOutput(true);

        String json = "{\"api_key\": \"" + API_KEY + "\"," +
                "\"events\":[{\"user_id\":\"203201202\"," +
                "\"device_id\":\"C8F9E604-F01A-4BD9-95C6-8E5357DF265D\"," +
                "\"event_type\":\"watch_tutorial\"}]}";

        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(json);
        wr.flush();
        wr.close();

        int responseCode = con.getResponseCode();
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        System.out.println(response.toString());
    }
}
```
{{/partial:tab}}
{{partial:tab name="Go"}}
Save the file as `amplitude.go` and run the program by the command `go run amplitude.go`. 

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    // Define API endpoint
    url := "https://api2.amplitude.com/2/httpapi"

    // Define the request body in JSON format
    requestBody := map[string]interface{}{
        "api_key": "YOUR_API_KEY",
        "events": []interface{}{
            map[string]interface{}{
                "user_id":    "203201202",
                "device_id":  "C8F9E604-F01A-4BD9-95C6-8E5357DF265D",
                "event_type": "watch_tutorial",
            },
        },
    }

    // Convert the request body to a JSON string
    requestBytes, err := json.Marshal(requestBody)
    if err != nil {
        fmt.Println(err)
        return
    }

    // Create a new HTTP request and set the content type
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(requestBytes))
    req.Header.Set("Content-Type", "application/json")

    // Send the request and get the response
    client := &http.Client{}
    res, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer res.Body.Close()

    // Read the response body
    responseBody, err := ioutil.ReadAll(res.Body)
    if err != nil {
        fmt.Println(err)
        return
    }

    // Print the response body
    fmt.Println(string(responseBody))
}
```
{{/partial:tab}}
{{/partial:tabs}}

## Check for success

After you send data to Amplitude, use one of the [debugging tools](/docs/sdks/sdk-debugging) to check your instrumentation and validate your events.