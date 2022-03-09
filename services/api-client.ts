let client: any;

export function setClient(newClient: any) {
    client = newClient;
}

function call(method: string, ...args: any[]) {
    return (client as any)[method](...args);
}

let BASE_URL = "http://localhost:5000";
if (process.env.NODE_ENV !== "development") {
    BASE_URL = "";
}

export default {
    get(path: string, config?: any): Promise<any> {
        return call("get", BASE_URL + path, config);
    },
    post(path: string, data?: any, config?: any): Promise<any> {
        return call("post", BASE_URL + path, data, config);
    },
    put(path: string, data?: any, config?: any): Promise<any> {
        return call("put", BASE_URL + path, data, config);
    },
    delete(path: string, config?: any): Promise<any> {
        return call("delete", BASE_URL + path, config);
    },
    request(config: any): Promise<any> {
        return call("request", config)
    },
    client() {
        return client;
    }
};