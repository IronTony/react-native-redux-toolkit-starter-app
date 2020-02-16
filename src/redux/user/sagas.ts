import { PayloadAction } from '@reduxjs/toolkit';
import { createLatestSagas } from '@utils/redux';
import { getUserInfoRequest } from './actions';
// import { navigate } from '@routes/navigationUtils';

function* fetchUserData(action: PayloadAction) {
  console.log('Retrieving user data based on action:', action);
  // Use this utility to access the React-Navigation-v5 navigation property
  // navigate('Main', { screen: 'OtherPage' });
}

// Map actions to effects, will map each entry as takeLatest,
//  if needed 'createEverySagas' can be used to map entries as takeEvery.
export default createLatestSagas(
  {
    [getUserInfoRequest as any]: fetchUserData,
    // [getUserInfoRespone]: storeUserData,
  },
  'user', // Optional paramenter to improve saga error logging, see 'createLatestSagas' jsdoc
);

// To combine 'createLatestSagas' and 'createEverySagas',
// simply create a wrapping saga like this
// export default function*() {
//   yield fork(createLatestSagas({ ... }))
//   yield fork(createEverySagas({ ... }))
// }
