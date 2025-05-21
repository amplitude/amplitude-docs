document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".api-tester").forEach(initTester);
});

function initTester(el) {
  const url        = el.dataset.url;
  const method     = el.dataset.method.toUpperCase();
  const fieldsCfg  = JSON.parse(el.dataset.fields);
  const authField  = el.dataset.authField || null;
  //const authPrefix = el.dataset.authPrefix || "";

  const inputs = Array.from(el.querySelectorAll("[data-field]"));
  const curlEl  = el.querySelector(".api-tester__curl");
  const resEl   = el.querySelector(".api-tester__response");
  const btn     = el.querySelector(".api-tester__send");

  function getPayload() {
    return inputs.reduce((obj, inp) => {
      if (inp.type === "checkbox") {
        obj[inp.dataset.field] = inp.checked;
      } else {
        obj[inp.dataset.field] = inp.value;
      }
      return obj;
    }, {});
  }

  function buildCurl(payload) {
    // Always send JSON
    const headers = [`-H "Content-Type: application/json"`];
    if (authField && payload[authField]) {
      headers.push(
        `-H "Authorization: ${authPrefix + payload[authField]}"`
      );
    }
    const dataPart = ["GET","DELETE"].includes(method)
      ? ""
      : ` -d '${JSON.stringify(payload)}'`;
    return `curl -X ${method} "${url}" ` + headers.join(" ") + dataPart;
  }

  function updateCurl() {
    curlEl.textContent = buildCurl(getPayload());
  }

  async function send() {
    updateCurl();
    const payload = getPayload();
    const headers = { "Content-Type": "application/json" };
    console.log(payload)
    
      headers["Authorization"] = 'Api-Key ' +  payload["deployment-key"];
    
    console.log(headers);

    try {
      const opts = {
        method,
        headers,
        body: ["GET","DELETE"].includes(method) ? null : JSON.stringify(payload)
      };
      const response = await fetch(url, opts);
      const json     = await response.json();
      resEl.textContent = JSON.stringify(json, null, 2);
    } catch (err) {
      resEl.textContent = `Error: ${err.message}`;
    }
  }

  // Recompute cURL on every input/change
  inputs.forEach(i => {
    i.addEventListener("input",  updateCurl);
    i.addEventListener("change", updateCurl);
  });

  btn.addEventListener("click", send);

  // Initial render
  updateCurl();
}