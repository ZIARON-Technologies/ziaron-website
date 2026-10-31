import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

/** Punto de entrada usado SOLO en build para prerenderizar (SSG) cada ruta a
 * HTML estático — no hay servidor Node en producción (`outputMode: static`
 * en angular.json). Ver CLAUDE.md, "Prerender (SSG)". */
const bootstrap = (context: BootstrapContext) => bootstrapApplication(App, config, context);

export default bootstrap;
