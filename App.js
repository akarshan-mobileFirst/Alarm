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
   ScrollView,
   LogBox
 } from 'react-native';
 import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import Octicons from 'react-native-vector-icons/Octicons';
 import Feather from 'react-native-vector-icons/Feather';
 import moment from 'moment';

 LogBox.ignoreAllLogs();
 
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
          <View style={styles.clockCircle}>
            <View style={styles.clockLayoutWrapper}>
              <View style={{
                alignItems: 'center', 
                justifyContent: 'center', 
                alignSelf: 'center',
                height: Dimensions.get("window").width * 0.55,
                width: Dimensions.get("window").width * 0.55,
              }}>
                {/* Dots */}
                {Array(60).fill(0).map((item, index) => (
                  <View style={{
                    backgroundColor: 'transparent',
                    height: Dimensions.get("window").width * 0.52,
                    width: Dimensions.get("window").width * 0.52,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{
                      rotateZ: `${index * 3}deg`,
                    }],
                    position: 'absolute'
                  }}>
                    <View
                      style={{
                       height: Dimensions.get("window").width * 0.52,
                       width: 1,
                       justifyContent: 'space-between',
                      }}
                    >
                      <View
                        style={{
                          height: index % 5 === 0 ? 7 : 3,
                          width: 1,
                          backgroundColor: '#FFFFFF',
                        }} 
                      />
                      <View
                        style={{
                          height: index % 5 === 0 ? 7 : 3,
                          width: 1,
                          backgroundColor: '#FFFFFF',
                        }} 
                      />
                    </View>
                  </View>
                ))}
                {/* Time */}
                {Array(6).fill(0).map((item, index) => (
                  <View style={{
                    backgroundColor: 'transparent',
                    height: Dimensions.get("window").width * 0.45,
                    width: Dimensions.get("window").width * 0.45,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{
                      rotateZ: `${index * 30}deg`,
                    }],
                    position: 'absolute'
                  }}>
                    <View style={{
                       height: Dimensions.get("window").width * 0.45,
                       width: index % 3 === 0 ? Dimensions.get("window").width * 0.1 : Dimensions.get("window").width * 0.05,
                       justifyContent: 'space-between',
                    }}>
                    <Text style={{
                      color: index % 3 === 0 ? '#FFFFFF' : 'grey',
                      textAlign: 'center',
                      fontSize: index % 3 === 0 ? 14 : 13,
                      fontWeight: index % 3 === 0 ? 'bold' : '700',
                      transform: [{
                        rotateZ: `${-index * 30}deg`,
                      }],
                    }}>
                      {index === 0 ? 12 : index * 2}
                      {index % 3 === 0 
                        ? (<Text style={{fontSize: 13}}>AM</Text>)
                        : (<Text />)
                      }
                    </Text>
                    <Text style={{
                      color: index % 3 === 0 ? '#FFFFFF' : 'grey',
                      textAlign: 'center',
                      fontSize: index % 3 === 0 ? 14 : 13,
                      fontWeight: index % 3 === 0 ? 'bold' : '700',
                      transform: [{
                        rotateZ: `${-index * 30}deg`,
                      }],
                    }}>
                      {index === 0 ? 12 : index * 2}
                      {index % 3 === 0 
                        ? (<Text style={{fontSize: 13}}>PM</Text>)
                        : (<Text />)
                      }
                    </Text>
                    </View>
                  </View>
                ))}
                {/* Time Icons */}
                <View style={{
                    height: Dimensions.get("window").width * 0.34,
                    width: Dimensions.get("window").width * 0.1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignSelf: 'center',
                    position: 'absolute'
                  }}>
                    <MaterialCommunityIcons name="weather-night" size={20} color="#55B7B5" />
                    <Feather name="sun" size={20} color="#BB9E26" />
                  </View>
              </View>
            </View>
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
   clockCircle: {
    height: Dimensions.get("window").width * 0.8,
    width: Dimensions.get("window").width * 0.8,
    borderRadius: Dimensions.get("window").width * 0.8,
    backgroundColor: '#000000',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
   },
   clockLayoutWrapper: {
    height: Dimensions.get("window").width * 0.55,
    width: Dimensions.get("window").width * 0.55,
    borderRadius: Dimensions.get("window").width * 0.55,
    backgroundColor: '#221F25',
    alignSelf: 'center'
   },
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
 });
 
 export default App;
 