

export class ConfigCustom {

static nrogkURl = "https://6caa-89-129-228-7.ngrok-free.app";
static localHostUrl = "http://localhost:8091";

static baseUrl = this.nrogkURl;
//static baseUrl = this.localHostUrl;

    public static getBaseUrl() {
        return this.baseUrl;
    }
}