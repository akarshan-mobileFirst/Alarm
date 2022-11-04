 import React, { useEffect, useState, useRef } from 'react';
 import {
   View,
   Text,
   Alert,
   Modal,
   Animated,
   StatusBar,
   TextInput,
   ScrollView,
   PanResponder,
   SafeAreaView,
   TouchableOpacity,
 } from 'react-native';
 import moment from 'moment';
 import Feather from 'react-native-vector-icons/Feather';
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import Octicons from 'react-native-vector-icons/Octicons';
 import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
 
 // File Inports
 import styles from './styles';
 import Constants from '../../utils/constants';
 
 const AlarmScreen = () => {  
  // Constants
  const { deviceWidth, meetSleepGoalMessage, notMeetSleepGoalMessage } = Constants;
  const screenHeading = "Change Wake Up";
  const progressLayerBaseValue = 45;
  const offsetLayerBaseValue = -135;
  const outerCircleSize = deviceWidth * 0.77;
  const outerCircleBorderRadius = outerCircleSize / 2;
  const clockFaceCircleSize = deviceWidth * 0.55;
  const iconSize = deviceWidth * 0.053;
  const radius = outerCircleBorderRadius - iconSize + 1; // Circle Radius - Icon Size

  // Ref
  const circleRef = useRef(null);

  // State
  const [startAngle, setStartAngle] = useState(0);
  const [angleLength, setAngleLength] = useState(3.15);
  const [bedTime, setBedTime] = useState("12:00 AM");
  const [wakeUpTime, setWakeUpTime] = useState("12:00 PM");
  const [timeDifference, setTimeDifference] = useState("12 hr 0 min");
  const [isSleepGoalMatched, setSleepGoalMatched] = useState(false);
  const [outerLinesColor, setOuterLinesColor] = useState('rgba(0, 0, 0, 0.15)');
  const [sleepGoalColorMatched, setSleepGoalColorMatched] = useState('#CA7F22');
  const [sleepGoalIconColorMatched, setSleepGoalIconColorMatched] = useState('#72260A');
  const [percent, setPercent] = useState(50);
  const [progressLayer, setProgressLayer] = useState(progressLayerBaseValue);
  const [offsetLayer, setOffsetLayer] = useState(offsetLayerBaseValue);
  const [circleCenterX, setCircleCenterX] = useState(0);
  const [circleCenterY, setCircleCenterY] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [startRange, setStartRange] = useState('7');
  const [endRange, setEndRange] = useState('8');
  const [startRangeInput, setStartRangeInput] = useState('7');
  const [endRangeInput, setEndRangeInput] = useState('8');
  const [panResponderBed, setPanResponderBed] = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => setCircleCenter(),
      onPanResponderMove: (evt, gestureState) => {},
    })
  );
  const [panResponderBell, setPanResponderBell] = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => setCircleCenter(),
      onPanResponderMove: (evt, gestureState) => {},
    })
  );
  const [panResponderDiffernce, setPanResponderDifference] = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => setCircleCenter(),
      onPanResponderMove: (evt, gestureState) => {},
    })
  );

  // Hook
  useEffect(() => {
    // Pan Responders
    setPanResponderBed(
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => setCircleCenter(),
        onPanResponderMove: (evt, { moveX, moveY }) => {
          const currentAngleStop = (startAngle + angleLength) % (2 * Math.PI);
          let newAngle = Math.atan2(moveY - circleCenterY, moveX - circleCenterX) + Math.PI / 2;

          if (newAngle < 0) {
            newAngle += 2 * Math.PI;
          }

          let newAngleLength = (currentAngleStop - newAngle) % (2 * Math.PI);

          if (newAngleLength < 0) {
            newAngleLength += 2 * Math.PI;
          }

          setStartAngle(newAngle);
          setAngleLength(newAngleLength);
        },
      })
    );

    setPanResponderBell(
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => setCircleCenter(),
        onPanResponderMove: (evt, { moveX, moveY }) => {
          let newAngle = Math.atan2(moveY - circleCenterY, moveX - circleCenterX) + Math.PI/2;
          let newAngleLength = (newAngle - startAngle) % (2 * Math.PI);

          if (newAngleLength < 0) {
            newAngleLength += 2 * Math.PI;
          }

          setStartAngle(startAngle);
          setAngleLength(newAngleLength);
        },
      })
    );

    setPanResponderDifference(
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => setCircleCenter(),
        onPanResponderMove: (evt, { moveX, moveY }) => {
          let newAngle = Math.atan2(moveY - circleCenterY, moveX - circleCenterX) + Math.PI/2;

          if (newAngle < 0) {
            newAngle += 2 * Math.PI;
          }

          setStartAngle(newAngle);
          setAngleLength(angleLength);
        },
      })
    );

    
    // PROGRESS AND OFFSET LAYER CHANGES
    const startAngleDegree = Math.round((startAngle * 360) / (Math.PI * 2));
    const angleLengthDegree = Math.round((angleLength * 360) / (Math.PI * 2));
    const angleLengthPercentage = Math.round((angleLength * 100) / (Math.PI * 2));
    setPercent(angleLengthPercentage);
    if(angleLengthPercentage > 50) {
      setProgressLayer(progressLayerBaseValue + startAngleDegree);
      setOffsetLayer(offsetLayerBaseValue + angleLengthDegree + startAngleDegree);
    } else {
      setProgressLayer(progressLayerBaseValue + angleLengthDegree + startAngleDegree + 180);
      setOffsetLayer(offsetLayerBaseValue + startAngleDegree);
    }

    // Updating Bed time, Wake up time, time difference and sleep goal matched
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
  
  // Methods
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

  const setCircleCenter = () => {
    if (circleRef?.current)
      circleRef.current.measure((x, y, w, h, px, py) => {
        if (px && py) {
          const halfOfContainer = (iconSize + outerCircleSize + 2) / 2;
          setCircleCenterX(px + halfOfContainer);
          setCircleCenterY(py + halfOfContainer);
        }
      });
  }

  const calculateArcCircle = () => {
    const newStartAngle = startAngle % (2 * Math.PI);
    const newAngleLength = angleLength % (2 * Math.PI);
    const fromAngle = newStartAngle;
    const toAngle = newAngleLength + newStartAngle;
    const fromX = radius * Math.sin(fromAngle);
    const fromY = -radius * Math.cos(fromAngle);
    const toX = radius * Math.sin(toAngle);
    const toY = -radius * Math.cos(toAngle);
  
    return {
      fromX,
      fromY,
      toX,
      toY,
    };
  }

  const sleepGoalMatched = () => {
    if (timeDifference) {
      if (timeDifference.split(' ').length === 4) {
        const startRangeInMinutes = parseInt(startRange, 10) * 60;
        const endRangeInMinutes = parseInt(endRange, 10) * 60;
        const timeDifferenceInMinutes = parseInt(timeDifference.split(' ')[0], 10) * 60 + parseInt(timeDifference.split(' ')[2], 10);
        if (timeDifferenceInMinutes >= startRangeInMinutes
          && timeDifferenceInMinutes <= endRangeInMinutes) {
            setSleepGoalMatched(true);
            setSleepGoalColorMatched('#262427');
            setSleepGoalIconColorMatched('#727277');
            setOuterLinesColor('#000000');
            return;
        }
      }
    }
    setSleepGoalMatched(false);
    setSleepGoalColorMatched('#CA7F22');
    setSleepGoalIconColorMatched('#72260A');
    setOuterLinesColor('rgba(0, 0, 0, 0.15)');
  };

  const timeHeading = () => (
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
  );

  const alarmFooter = () => (
    <>
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
        <View style={styles.goalTimeContainer}>
          <Text style={styles.goalHeading}>Daily Sleep Goal</Text>
          <TouchableOpacity activeOpacity={0.9}
            onPress={() => {
              setModalVisible(true);
              setStartRangeInput(startRange);
              setEndRangeInput(endRange);
            }}
            style={styles.dailySleepGoalContainer}>
                <Text style={styles.goalValue}>{`${startRange}-${endRange} hours`}</Text>
                <MaterialCommunityIcons name="clock-edit" size={25} color="#55B7B5" />
          </TouchableOpacity>
        </View>
    </>
  )

  const sleepGoalModal = () => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(false);
        }}
    >
        <View style={styles.dailySleepGoalModalContainer}>
        <View style={styles.modalHeadingContainer}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => setModalVisible(false)}>
            <Ionicons name="ios-close-sharp" size={30} color="#FF5733" />
            </TouchableOpacity>
            <Text style={styles.modalHeading}>Sleep Goal</Text>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    const startRangeValue = parseInt(startRangeInput, 10);
                    const endRangeValue = parseInt(endRangeInput, 10);
                    if(startRangeValue > 0 && startRangeValue < 24 && endRangeValue > 1 && endRangeValue < 25 && endRangeValue > startRangeValue) {
                        setModalVisible(false);
                        setStartRange(startRangeInput);
                        setEndRange(endRangeInput);
                    } else {
                        Alert.alert("Warning", "Please enter a value sleep goal range.")
                    }
                }}>
            <Ionicons name="ios-checkmark-sharp" size={30} color="#DAF7A6" />
            </TouchableOpacity>
        </View>
        <Text style={styles.goalRangeOuterText}>
            Start Range:
            <Text style={styles.goalRangeInnerText}> (Between 1 and 23)</Text>
            </Text>
            <TextInput
            keyboardType='phone-pad'
            placeholder='Start Range'
            value={startRangeInput}
            maxLength={2}
            onChangeText={val => {
                const reg =/[0-9/b]+$/;
                if(val === "" || (reg.test(val)))
                setStartRangeInput(val.toString());
            }}
            style={[ styles.goalRangeTextInput, styles.startGoalRangeTextInput ]} 
            />
            <Text style={styles.goalRangeOuterText}>
            End Range:
            <Text style={styles.goalRangeInnerText}> (Between 2 and 24)</Text>
            </Text>
            <TextInput 
            keyboardType='phone-pad'
            placeholder='End Range'
            value={endRangeInput}
            maxLength={2} 
            onChangeText={val => {
                const reg =/[0-9/b]+$/;
                if(val === "" || reg.test(val))
                setEndRangeInput(val.toString());
            }}
            style={styles.goalRangeTextInput}
            />
        </View>
    </Modal>
  );

  const iconDifferenceWithRotatingLines = () => (
    <>
        {/* Progress Layer */}
        <Animated.View style={{
            ...styles.progressOffsetLayer,
            borderRightColor: sleepGoalColorMatched,
            borderTopColor: sleepGoalColorMatched,
            borderWidth: iconSize + deviceWidth * 0.023 * 2,
            height: outerCircleSize,
            width: outerCircleSize,
            borderRadius: outerCircleBorderRadius,
            transform: [{rotateZ: `${progressLayer}deg`}],
            }}
            {...panResponderDiffernce.panHandlers}
        />

        {/* Offset Layer */}
        <Animated.View style={{
            ...styles.progressOffsetLayer,
            borderRightColor: percent > 50 ? sleepGoalColorMatched : 'black',
            borderTopColor: percent > 50 ? sleepGoalColorMatched : 'black',
            borderWidth: iconSize + deviceWidth * 0.023 * 2,
            height: outerCircleSize,
            width: outerCircleSize,
            borderRadius: outerCircleBorderRadius,
            transform: [{rotateZ: `${offsetLayer}deg`}],
            }}
            {...panResponderDiffernce.panHandlers}
        />

        {/* Clock Outer Rotating Lines */}
        {Array(90).fill(0).map((item, index) => (
            <View
            key={index.toString()}
            style={{
                ...styles.clockOuterDotsContainer,
                transform: [{
                rotateZ: `${index * 2}deg`,
                }],
            }}
            >
            <View style={{ ...styles.clockOuterDots, backgroundColor: outerLinesColor }} />
            <View style={{ ...styles.clockOuterDots, backgroundColor: outerLinesColor }} />
            </View>
        ))}
    </>
  );

  const rotatingIcons = () => (
    <>
        {/* Bed Icon */}
        <Animated.View style={{
            ...styles.rotatingIcon,
            backgroundColor: sleepGoalColorMatched,
            borderRadius: iconSize + deviceWidth * 0.023,
            transform: [
                {
                    translateX: calculateArcCircle().fromX,
                },
                {
                    translateY: calculateArcCircle().fromY,
                }
            ],
            }}
            {...panResponderBed.panHandlers}
        >
            <Ionicons name="bed" size={iconSize} color={sleepGoalIconColorMatched} />
        </Animated.View>

        {/* Bell Icon */}
        <Animated.View style={{
            ...styles.rotatingIcon,
            backgroundColor: sleepGoalColorMatched,
            paddingHorizontal: deviceWidth * 0.028,
            borderRadius: deviceWidth * 0.05 + deviceWidth * 0.023,
            transform: [
                {
                    translateX: calculateArcCircle(). toX,
                },
                {
                    translateY: calculateArcCircle(). toY
                }
            ],
            }}
            {...panResponderBell.panHandlers}
        >
            <Octicons name="bell-fill" size={deviceWidth * 0.05} color={sleepGoalIconColorMatched}  />
        </Animated.View>
    </>
  );

  const clockIcons = () => (
    <View style={styles.innerTimeIcons}>
        <MaterialCommunityIcons name="weather-night" size={20} color="#55B7B5" />
        <Feather name="sun" size={20} color="#BB9E26" />
    </View>
  );

  const clockTimeLines = () => (
    <>
        {Array(60).fill(0).map((item, index) => (
            <View key={index.toString()} style={{
                ...styles.clockInnerDotsContainer,
                ...styles.contentAlignCenterWithSelfAlign,
                transform: [{
                rotateZ: `${index * 3}deg`,
                }],
            }}>
                <View style={styles.clockInnerDotsWrapper}>
                    <View
                        style={{
                        height: index % 5 === 0 ? 7 : 3,
                        ...styles.clockInnerDots,
                        }} 
                    />
                    <View
                        style={{
                        height: index % 5 === 0 ? 7 : 3,
                        ...styles.clockInnerDots,
                        }} 
                    />
                </View>
            </View>
        ))}
    </>
  );

  const clockTimeNumbers = () => (
    <>
        {Array(6).fill(0).map((item, index) => (
            <View key={index.toString()} style={{
                ...styles.timeCountingContainer,
                ...styles.contentAlignCenterWithSelfAlign,
                transform: [{
                rotateZ: `${index * 30}deg`,
                }],
            }}>
                <View style={{
                ...styles.timeCountingWrapper,
                width: index % 3 === 0 ? deviceWidth * 0.1 : deviceWidth * 0.05,
                }}>
                    <Text style={{
                        ...styles.textAlignCenter,
                        fontSize: index % 3 === 0 ? 14 : 13,
                        fontWeight: index % 3 === 0 ? 'bold' : '700',
                        color: index % 3 === 0 ? '#FFFFFF' : 'grey',
                        transform: [{
                            rotateZ: `${-index * 30}deg`,
                        }],
                    }}>
                        {index === 0 ? 12 : index * 2}
                        {index % 3 === 0 
                            ? (<Text style={styles.timeCountingFont}>AM</Text>)
                            : (<Text />)
                        }
                    </Text>
                    <Text style={{
                        ...styles.textAlignCenter,
                        color: index % 3 === 0 ? '#FFFFFF' : 'grey',
                        fontSize: index % 3 === 0 ? 14 : 13,
                        fontWeight: index % 3 === 0 ? 'bold' : '700',
                        transform: [{
                            rotateZ: `${-index * 30}deg`,
                        }],
                    }}>
                        {index === 0 ? 12 : index * 2}
                        {index % 3 === 0 
                            ? (<Text style={styles.timeCountingFont}>PM</Text>)
                            : (<Text />)
                        }
                    </Text>
                </View>
            </View>
        ))}
    </>
  );

  const clockLayout = () => (
    <View style={styles.clockLayoutWrapper}>
        <View style={{
            ... styles.contentAlignCenterWithSelfAlign,
            height: clockFaceCircleSize,
            width: clockFaceCircleSize,
        }}>
            {/* CLOCK LAYOUT TIME LINES */}
            {clockTimeLines()}

            {/* CLOCK TIME NUMBERS */}
            {clockTimeNumbers()}

            {/* ON CLOCK ICONS */}
            {clockIcons()}
        </View>
    </View>
  );

  const alarmClockComponent = () => (
    <View style={styles.clockCircle}>
        <View style={{
                ...styles.contentAlignCenter,
                height: outerCircleSize,
                width: outerCircleSize,
                borderRadius: outerCircleBorderRadius,
            }}
            collapsable={false}
            ref={circleRef}
        >
            {/* Icon Difference */}
            {iconDifferenceWithRotatingLines()}

            {/* ROTATING ICONS */}
            {rotatingIcons()}

            {/* Clock Layout */}
            {clockLayout()}
        </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <Text style={styles.titleText}>{screenHeading}</Text>

      {/* ALARM CLOCK */}
      {!modalVisible && (
        <ScrollView
            style={styles.scrollView}
            bounces={false}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.clockContainer}>
                {/* TIME HEADING COMPONENT */}
                {timeHeading()}

                {/* ALARM CLOCK COMPONENT */}
                {alarmClockComponent()}

                {/* ALARM CLOCK FOOTER COMPONENT */}
                {alarmFooter()}
            </View>
        </ScrollView>
      )}

      {/* SLEEP GOAL RANGE EDIT MODAL */}
      {sleepGoalModal()}
    </SafeAreaView>
  );
 };
 
 export default AlarmScreen;
 