/**
 * Generic wrapper to decouple configuration.
 */

import { z } from 'zod/v4';

const SettingPath = z.string().regex(/^\w+(\.\w+)*/);

type SettingPath = z.infer<typeof SettingPath>;

// Process environment vairables into a configuration layer
const Env = z.object({
  type: z.literal('env'),
});

// Load Env using DotEnv, then process as Env
const DotEnv = z.object({
  type: z.literal('dotenv'),
});

// Load Env using DotEnvx, then process as Env
const DotEnvx = z.object({
  type: z.literal('dotenvx'),
});

const ConfigSrc = z.discriminatedUnion('type', [Env, DotEnv, DotEnvx]);

type ConfigSrc = z.infer<typeof ConfigSrc>;

const PROCESSOR: Record<string, (c: ConfigSrc, o: object) => object> = {
  env: pc,
  dotenv: c => {},
  dotenvx: c => {},
};

function pc(c: ConfigSrc, o: object) {
  return {};
}

class Config {
  static instance: Config;

  config: object[] = [];

  constructor() {
    if (!Config.instance) {
      Config.instance = this;
    }

    return Config.instance;
  }

  /*
   * load a configuration
   */
  async load(config: ConfigSrc | ConfigSrc[], options = {}) {
    const configurations = Array.isArray(config) ? config : [config];

    configurations.forEach(configuration => {
      const parsed_configuration = ConfigSrc.safeParse(configuration);
      if (parsed_configuration.success) {
        const valid_configuration = parsed_configuration.data;
        // TODO Process configuration
        this.config.unshift(PROCESSOR[valid_configuration.type](valid_configuration, options));
      } else {
        console.error(z.prettifyError(parsed_configuration.error));
      }
    });
  }

  async save() {}

  get(setting: SettingPath) {
    let result = null;
    try {
      const path = SettingPath.parse(setting);
      result = path.split('.').reduce((a, b) => (a != undefined ? a[b] : a), this.config);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(`Cannot get ${setting}: ${error.message}`);
      }
    }
    return result;
  }

  set(setting: SettingPath, value: unknown) {}
}

const config = new Config();

export default config;
