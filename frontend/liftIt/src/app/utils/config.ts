

export class ConfigCustom {

static nrogkURl = "https://3474-62-87-74-37.ngrok-free.app";
static localHostUrl = "http://localhost:8091";

static baseUrl = this.nrogkURl;
//static baseUrl = this.localHostUrl;

    public static getBaseUrl() {
        return this.baseUrl;
    }
}