import Route from '@ember/routing/route';
import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

const COMMUNITY_CATEGORIES = ['Condo', 'Townhouse', 'Apartment'];

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
  async model() {
    let response = await fetch('api/rentals.json');
    let { data } = await response.json();

    return data.map((model) => {
      let { id, attributes } = model;
      let type;

      if (COMMUNITY_CATEGORIES.includes(attributes.category)) {
        type = 'Community';
      } else {
        type = 'Standalone';
      }

      return { id, type, ...attributes };
    });
  }
}
