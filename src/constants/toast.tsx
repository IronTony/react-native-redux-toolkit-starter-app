import React from 'react';
import { Text, XStack } from 'tamagui';

type Props = {
  text1: string;
  text2: string;
};

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: Props) => (
    <XStack height={50} backgroundColor="$emerald" width="100%" alignItems="center" paddingHorizontal="$5">
      <Text color="$white" fontSize="$6">
        {props.text1}
      </Text>
      {props.text2 && (
        <Text color="$white" fontSize="$4">
          {props.text2}
        </Text>
      )}
    </XStack>
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: Props) => (
    <XStack height={60} backgroundColor="$emerald" width="100%" alignItems="center" paddingHorizontal="$5">
      <Text color="$white" fontSize="$6">
        {props.text1}
      </Text>
      {props.text2 && (
        <Text color="$white" fontSize="$4">
          {props.text2}
        </Text>
      )}
    </XStack>
  ),
  /*
    Or create a completely new type - `customToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  // customToast: ({ text1, props }) => (
  //   <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
  //     <Text>{text1}</Text>
  //     <Text>{props.uuid}</Text>
  //   </View>
  // ),
};

export default toastConfig;
