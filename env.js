import active from './active.env';

const envs = {
  stage: {
    DEV_API: 'http://staging.api.com',
  },
  prod: {
    DEV_API: 'http://prod.api.com',
  },
  dev: {
    DEV_API: 'http://dev.api.com',
  },
};

export default envs[active];
