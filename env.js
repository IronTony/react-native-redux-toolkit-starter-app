import active from './active.env';

const envs = {
  stage: {
    API_URL: 'http://staging.api.com',
  },
  prod: {
    API_URL: 'http://prod.api.com',
  },
  dev: {
    API_URL: 'http://dev.api.com',
  },
};

export default envs[active];
