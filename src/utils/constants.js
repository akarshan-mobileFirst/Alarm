 import { Dimensions } from "react-native";

 export default {
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
 