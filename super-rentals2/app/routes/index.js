import Route from '@ember/routing/route';
import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import { service } from '@ember/service';
import { query } from '@warp-drive/utilities/json-api';

initializeFaro({
  url: 'https://faro-collector-prod-us-east-0.grafana.net/collect/6210d0df72827d03363f82869d192a7e',
  app: {
    name: 'super-rentals2',
    version: '1.0.0',
    environment: 'production'
  },

  instrumentations: [
    // Mandatory, omits default instrumentations otherwise.
    ...getWebInstrumentations(),

    // Tracing package to get end-to-end visibility for HTTP requests.
    new TracingInstrumentation(),
  ],
});

export default class IndexRoute extends Route {
  @service store;

  async model() {
    const { content } = await this.store.request(query('rental'));
    return content.data;
  }
}

