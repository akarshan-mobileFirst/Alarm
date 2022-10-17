/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from 'react';
 import {
   SafeAreaView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Dimensions,
   ScrollView
 } from 'react-native';
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import Octicons from 'react-native-vector-icons/Octicons';
 import Feather from 'react-native-vector-icons/Feather';
 import CircularSlider from 'react-native-circular-slider';
 import moment from 'moment';
 
 const App = () => {
   const [startAngle, setStartAngle] = useState(1);
   const [angleLength, setAngleLength] = useState(2);
   const [bedTime, setBedTime] = useState("4:00 AM");
   const [wakeUpTime, setWakeUpTime] = useState("11:30 AM");
   const [timeDifference, setTimeDifference] = useState("7 hr 40 min");
   const [isSleepGoalMatched, setSleepGoalMatched] = useState(false);
   const [gradientColorFrom, setGradientColorFrom] = useState('#ff9800');
   const [gradientColorTo, setGradientColorTo] = useState('#ffcf00');
   const isDarkMode = useColorScheme() === 'dark';
   const meetSleepGoalMessage = 'This schedule meets your sleep goal.';
   const notMeetSleepGoalMessage =
     'This schedule does not meet your sleep goal.';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? 'grey' : 'white',
   };
 
   const calculateMinutesFromAngle = angle =>
     Math.round(angle / ((2 * Math.PI) / (12 * 12))) * 5 * 2;
 
   const calculateTimeFromAngle = angle => {
     const minutes = calculateMinutesFromAngle(angle);
     const h = Math.floor(minutes / 60);
     const m = minutes - h * 60;
     return moment(new Date(2000, 1, 1, h, m, 0, 0))
       .format('hh:mm A')
       .toString();
   };
 
   const sleepGoalMatched = () => {
     if (timeDifference) {
       if (timeDifference.split(' ').length === 4) {
         if (
           timeDifference.split(' ')[0] === '7' ||
           (timeDifference.split(' ')[0] === '8' &&
             timeDifference.split(' ')[2] === '0')
         ) {
           setSleepGoalMatched(true);
           setGradientColorFrom('#8F8D92');
           setGradientColorTo('#9d9d9d');
           return;
         }
       }
     }
     setSleepGoalMatched(false);
     setGradientColorFrom('#ff9800');
     setGradientColorTo('#ffcf00');
   };
 
   useEffect(() => {
     setBedTime(calculateTimeFromAngle(startAngle));
     setWakeUpTime(
       calculateTimeFromAngle((startAngle + angleLength) % (2 * Math.PI)),
     );
     const minutesLong = calculateMinutesFromAngle(angleLength);
     const hours = Math.floor(minutesLong / 60);
     const minutes = minutesLong - hours * 60;
     setTimeDifference(`${hours} hr ${minutes} min`);
     sleepGoalMatched();
   }, [startAngle, angleLength]);
 
   return (
     <SafeAreaView style={styles.container}>
       <StatusBar
         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
         backgroundColor={backgroundStyle.backgroundColor}
       />
       <Text style={styles.titleText}>Change Wake Up</Text>
       <ScrollView>
        <View style={styles.clockContainer}>
          <View style={styles.timeContainer}>
            <View>
              <View style={styles.timeIcon}>
                <Ionicons name="bed" size={14} color="#8F8D92" />
                <Text style={styles.timeHeading}>{` BEDTIME`}</Text>
              </View>
              <Text style={styles.timeText}>{bedTime}</Text>
              <Text style={styles.timeHeading}>Tomorrow</Text>
            </View>
            <View>
              <View style={styles.timeIcon}>
                <Octicons name="bell-fill" size={14} color="#8F8D92" />
                <Text style={styles.timeHeading}>{` WAKE UP`}</Text>
              </View>
              <Text style={styles.timeText}>{wakeUpTime}</Text>
              <Text style={styles.timeHeading}>Tomorrow</Text>
            </View>
          </View>
          <View style={styles.circularSliderWrapper}>
            <Ionicons name="bed" size={20} color="#55B7B5" style={styles.upIcon} />
            <Feather name="sun" size={20} color="#BB9E26" style={styles.downIcon} />
            <CircularSlider
              startAngle={startAngle}
              angleLength={angleLength}
              onUpdate={item => {
                if (!!item && item?.angleLength && item?.startAngle) {
                  setStartAngle(item.startAngle);
                  setAngleLength(item.angleLength);
                }
              }}
              segments={1}
              strokeWidth={40}
              radius={Dimensions.get("window").width * 0.35}
              gradientColorFrom={gradientColorFrom}
              gradientColorTo={gradientColorTo}
              showClockFace
              clockFaceColor="#9d9d9d"
              bgCircleColor="#171717"
            />
          </View>
          <Text style={styles.totalTimeText}>{timeDifference}</Text>
          {!isSleepGoalMatched
            ? <View style={styles.messageContainer}>
                <View style={styles.info}>
                  <Text style={styles.infoText}>{`  !  `}</Text>
                </View>
                <Text
                  style={styles.meetText}>{` ${notMeetSleepGoalMessage}`}</Text>
            </View>
          : <Text style={styles.meetText}>{` ${meetSleepGoalMessage}`}</Text>
          }
        </View>
        <View style={styles.goalTimeContainer}>
          <Text style={styles.goalHeading}>Daily Sleep Goal</Text>
          <Text style={styles.goalValue}>7-8 hours</Text>
        </View>
       </ScrollView>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: 'black',
     padding: 15,
   },
   titleText: {
     color: '#CCCBCC',
     textAlign: 'center',
     fontSize: 18,
     fontWeight: 'bold',
     marginVertical: 3,
   },
   circularSliderWrapper: {alignItems: 'center'},
   clockContainer: {
     backgroundColor: '#221F25',
     padding: 20,
     borderRadius: 10,
     marginVertical: 15,
   },
   timeContainer: {
     flexDirection: 'row',
     justifyContent: 'space-around',
     marginBottom: 15,
   },
   timeIcon: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
   },
   timeText: {
     fontWeight: 'bold',
     color: 'white',
     fontSize: 22,
     textAlign: 'center',
     marginVertical: 3,
   },
   timeHeading: {
     color: '#8F8D92',
     textAlign: 'center',
     fontSize: 14,
   },
   totalTimeText: {
     color: '#CCCBCC',
     textAlign: 'center',
     fontSize: 20,
     fontWeight: '500',
     marginTop: 20,
   },
   messageContainer: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
   },
   meetText: {
     color: '#8F8D92',
     textAlign: 'center',
     fontSize: 13,
     marginTop: 5,
   },
   info: {
     backgroundColor: '#BB9E26',
     borderRadius: 15,
     marginTop: 5,
   },
   infoText: {
     color: 'black',
   },
   goalTimeContainer: {
     backgroundColor: '#221F25',
     padding: 20,
     borderRadius: 10,
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
   },
   goalHeading: {
     color: '#CCCBCC',
     textAlign: 'center',
     fontSize: 20,
     fontWeight: '500',
   },
   goalValue: {
     fontWeight: 'bold',
     color: 'white',
     fontSize: 22,
     textAlign: 'center',
   },
   upIcon: {
    position: 'absolute',
    zIndex: 1,
    top: Dimensions.get("window").width * 0.23,
   },
   downIcon: {
    position: 'absolute',
    zIndex: 1,
    bottom: Dimensions.get("window").width * 0.23,
   },
 });
 
 export default App;
 