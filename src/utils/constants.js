 import { Dimensions } from "react-native";

 export default {
    deviceHeight: Dimensions.get('window').height,
    deviceWidth: Dimensions.get('window').width,
    meetSleepGoalMessage: 'This schedule meets your sleep goal.',
    notMeetSleepGoalMessage: 'This schedule does not meet your sleep goal.',
 };
 