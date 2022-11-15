 import { Dimensions } from "react-native";

 export default {
   clockConstants: {
      clockCircleBorderRadius: (Dimensions.get('window').width * 0.8) / 2, // clockCircleSize/2
      clockCircleSize: Dimensions.get('window').width * 0.8,
      clockFaceCircleSize: Dimensions.get('window').width * 0.55,
      iconPadding: Dimensions.get('window').width * 0.023,
      iconRotationCircleBorderRadius: (Dimensions.get('window').width * 0.77) / 2, // iconRotationCircleSize/2
      iconRotationCircleSize: Dimensions.get('window').width * 0.77,
      iconSize: Dimensions.get('window').width * 0.053,
      offsetLayerBaseValue: -135,
      progressLayerBaseValue: 45,
      radius: (Dimensions.get('window').width * 0.77) / 2 - Dimensions.get('window').width * 0.053 + 1, // iconRotationCircleBorderRadius - iconSize + 1
   },
   dimensions: {
     deviceHeight: Dimensions.get('window').height,
     deviceWidth: Dimensions.get('window').width,
   },
   messages: {
     meetSleepGoalMessage: 'This schedule meets your sleep goal.',
     notMeetSleepGoalMessage: 'This schedule does not meet your sleep goal.',
   },
   screenHeadings: {
     alarmScreenHeading: "Change Wake Up",
   },
};
