---
id: 8928035c-0b78-4b55-8610-ea7377ddde86
blueprint: sdk-catalog
title: Python
source: 'https://www.docs.developers.amplitude.com/data/sdks/python/'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1715798961
logo: icons/python.svg
exclude_from_sitemap: false
---
```python
def callback_func(event, code, message=None):
  # callback function that takes three input parameters
  # event: the event that triggered this callback
  # code: status code of request response
  # message: a optional string message for more detailed information

client.configuration.api_key = "new api key"
client.configuration.flush_max_retries = 5
client.configuration.logger = logging.getLogger(__name__)
client.configuration.min_id_length = 7
client.configuration.callback = callback_func
client.configuration.server_zone = "EU"
client.configuration.use_batch = True
client.configuration.server_url = "proxy url that forwarding the requests"
client.configuration.opt_out = False
```