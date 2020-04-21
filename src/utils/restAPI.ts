export default class RestAPI {
    public app: any;

    public express: any;

    public path: string;

    constructor(app, express, path = '/api') {
      this.app = app;
      this.express = express;
      this.path = path;
    }

    public append(services): any {
      for (const key in services) {
        if (services[key].generateExpressRoute) {
          services[key].generateExpressRoute(this.app, this.express, this.path);
        }
      }

      return this.app;
    }
}
