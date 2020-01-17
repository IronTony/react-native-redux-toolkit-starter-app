import { createLatestSagas } from '@utils/redux';

import { getUserInfoRequest } from './actions';

function* fetchUserData(action) {
  console.log('Retrieving user data based on action:', action);
}

export default createLatestSagas(
  {
    [getUserInfoRequest]: fetchUserData,
  },
  'user',
);
