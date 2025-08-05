#!/usr/bin/env zx

//import config from '../utils/config';
const config = {
  docker: {
    image: {
      registry: process.env.DOCKER_DEVSERVE_IMAGE_REGISTRY ?? 'ghcr.io',
      name: process.env.DOCKER_DEVSERVE_IMAGE_NAME ?? 'ulenarofmondarth/sphinx-docs',
      version: process.env.DOCKER_DEVSERVE_IMAGE_VERSION ?? 'latest',
    },
    ports: [
      {
        internal: process.env.DOCKER_DEVSERVE_SPHINX_INT_PORT ?? 8000,
        external: process.env.DOCKER_DEVSERVE_SPHINX_EXT_PORT ?? 8091,
      },
    ],
    volumes: [
      {
        internal: process.env.DOCKER_DEVSERVE_SPHINX_INT_DOCDIR ?? '/doc',
        external: process.env.DOCKER_DEVSERVE_SPHINX_EXT_DOCDIR ?? `${process.cwd()}/docs`,
      },
    ],
    name: process.env.DOCKER_DEVSERVE_NAME ?? 'devserver',
  },
};

$.verbose = false;

const docker_exec_cmd = [
  'sphinx-autobuild',
  '--host',
  '0.0.0.0',
  '--port',
  config.docker.ports[0].internal,
  '.',
  '_build/html',
];

const args = [
  '--user',
  `${process.getuid()}:${process.getgid()}`,
  '--name',
  config.docker.name,
  ...config.docker.ports.map(p => ['-p', `${p.external}:${p.internal}`]),
  ...config.docker.volumes.map(v => ['-v', `${v.external}:${v.internal}`]),
  '-w',
  config.docker.volumes[0].internal,
  `${config.docker.image.registry}/${config.docker.image.name}:${config.docker.image.version}`,
  ...docker_exec_cmd,
].flat();

const res = await $`docker run -d --rm  ${args}`;

console.log(res);
