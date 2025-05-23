document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".api-tester").forEach(initTester);
});

function initTester(el) {

    const urlUs = el.dataset.urlUs;
    const urlEu = el.dataset.urlEu;
    const method = el.dataset.method.toUpperCase();
    const fieldsCfg = JSON.parse(el.dataset.fields);
    const authInput = el.querySelector('[data-auth-input="true"]');
    //const authField = authInput ? authInput.dataset.field : null;

    const inputs = Array.from(el.querySelectorAll("[data-field]"));
    const curlEl = el.querySelector(".api-tester__curl");
    const resEl = el.querySelector(".api-tester__response");
    const btn = el.querySelector(".api-tester__send");

  function getCurlPayload(fullPayload) {
    return inputs.reduce((obj, inp) => {
      if (inp.dataset.omitFromCurl !== "true") {
        const key = inp.dataset.field;
        obj[key] = fullPayload[key];
      }
      return obj;
    }, {});
  }

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

    function resolveBaseUrl(payload) {
        return payload["server-zone"] === "EU" ? urlEu : urlUs;
    }

    function buildCurl(fullPayload) {
        // pick only the fields we want in the JSON body
        const payload = getCurlPayload(fullPayload);

        // 1) handle GET query-string as before
        let requestUrl = resolveBaseUrl(fullPayload);
        if (method === "GET") {
            const qs = Object.entries(fullPayload)
                .filter(([k, v]) => v !== "" && !fieldsCfg[k]?.omitFromCurl) // also strip omitted from URL if you like
                .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
                .join("&");
            if (qs) requestUrl += `?${qs}`;
        }
        // 2) build lines
        const lines = [`curl -X ${method} "${requestUrl}"`];
        lines.push(`-H "Content-Type: application/json"`);
        lines.push(`-H "Authorization: Api-Key ${authInput.value}"`);


        // 3) only non-GET/DELETE get a body
        if (!["GET", "DELETE"].includes(method)) {
            const pretty = JSON.stringify(payload, null, 2);
            lines.push(`-d '${pretty}'`);
        }

        // 4) join with backslashes
        return lines
            .map((line, idx) => idx === 0 ? line : `  ${line}`)
            .join(" \\\n");
    }

    function updateCurl() {
        const codeEl = el.querySelector(".api-tester__curl");
        codeEl.textContent = buildCurl(getPayload());
    }

    async function send() {
        updateCurl();
        const payload = getPayload();
        const baseUrl = resolveBaseUrl(payload);
        const headers = {
            "Content-Type": "application/json"
        };
        headers["Authorization"] = 'Api-Key ' + authInput.value;


        try {
            const opts = {
                method,
                headers,
                body: ["GET", "DELETE"].includes(method) ? null : JSON.stringify(payload)
            };
            const response = await fetch(baseUrl, opts);
            const json = await response.json();
            resEl.textContent = JSON.stringify(json, null, 2);
        } catch (err) {
            resEl.textContent = `Error: ${err.message}`;
        }
    }

    // Recompute cURL on every input/change
    inputs.forEach(i => {
        i.addEventListener("input", updateCurl);
        i.addEventListener("change", updateCurl);
    });

    btn.addEventListener("click", send);

    // Initial render
    updateCurl();
}