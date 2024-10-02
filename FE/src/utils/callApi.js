
async function callApi(path, method='GET', body=null) {
    let res = await fetch(path, {
        method,
        headers: {
            'Content-Type': "application/json, Authorization",
        },
        credentials: "include",
        body: body ? JSON.stringify(body): null,
    }).then((res) => {
        if(res.headers.get("Content-Type").includes("application/json")) {
            return res.json();
        } else {
            return res.text();
        }
    });
    return res;
}

export default callApi;