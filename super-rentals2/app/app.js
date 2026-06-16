import '@warp-drive/ember/install';
import Application from '@ember/application';
import compatModules from '@embroider/virtual/compat-modules';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'super-rentals2/config/environment';
import { importSync, isDevelopingApp, macroCondition } from '@embroider/macros';
import setupInspector from '@embroider/legacy-inspector-support/ember-source-4.12';
import { initializeFaro } from '@grafana/faro-web-sdk';

if (macroCondition(isDevelopingApp())) {
  importSync('./deprecation-workflow');
}

// Ember.onerror = function(error) {
//   faro.api.pushError(error);
//   console.error(error); // Keep logging to console
// };

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver.withModules(compatModules);
  inspector = setupInspector(this);
}

loadInitializers(App, config.modulePrefix, compatModules, initializeFaro);

import { setBuildURLConfig } from '@warp-drive/utilities/json-api';

setBuildURLConfig({
  namespace: 'api',
});
