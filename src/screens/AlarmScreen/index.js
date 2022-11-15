 import React, { useLayoutEffect, useState, useRef, useReducer } from 'react';
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
 
 // File Imports
 import styles from './styles';
 import Constants from '../../utils/constants';

  // Constants
  const { clockConstants, dimensions, messages, screenHeadings } = Constants;
  const {
    clockCircleBorderRadius,
    clockCircleSize,
    clockFaceCircleSize,
    iconPadding,
    iconRotationCircleBorderRadius,
    iconRotationCircleSize,
    iconSize,
    offsetLayerBaseValue,
    progressLayerBaseValue,
    radius,
  } = clockConstants;
  const { deviceWidth } = dimensions;
  const { meetSleepGoalMessage, notMeetSleepGoalMessage } = messages;
  const { alarmScreenHeading } = screenHeadings;

 // Intial State and Reducer
 const initState = {
  startAngle: 0,
  angleLength: Math.PI,
  angleDifference: 0,
  bedTime: "12:00 AM",
  wakeUpTime: "12:00 PM",
  hoursDifference: 12,
  minutesDifference: 0,
  isSleepGoalMatched: false,
  outerLinesColor: 'rgba(0, 0, 0, 0.15)',
  sleepGoalColorMatched: '#CA7F22',
  sleepGoalIconColorMatched: '#72260A',
  percent: 50,
  progressLayer: progressLayerBaseValue,
  offsetLayer: offsetLayerBaseValue,
  circleCenterX: 0,
  circleCenterY: 0,
  modalVisible: false,
  startRange: '7',
  endRange: '8',
 };

 const reducer = (state, action) => {
  switch(action.type) {
    case "StartAngle":
      return { ...state, startAngle: action.payload };
    case "AngleLength":
      return { ...state, angleLength: action.payload };
    case "AngleDifference":
      return { ...state, angleDifference: action.payload };
    case "BedTime":
      return { ...state, bedTime: action.payload };
    case "WakeUpTime":
      return { ...state, wakeUpTime: action.payload };
    case "HoursDifference":
      return { ...state, hoursDifference: action.payload };
    case "MinutesDifference":
      return { ...state, minutesDifference: action.payload };
    case "IsSleepGoalMatched":
      return { ...state, isSleepGoalMatched: action.payload };
    case "OuterLinesColor":
      return { ...state, outerLinesColor: action.payload };
    case "SleepGoalColorMatched":
      return { ...state, sleepGoalColorMatched: action.payload };
    case "SleepGoalIconColorMatched":
      return { ...state, sleepGoalIconColorMatched: action.payload };
    case "Percent":
      return { ...state, percent: action.payload };
    case "ProgressLayer":
      return { ...state, progressLayer: action.payload };
    case "OffsetLayer":
      return { ...state, offsetLayer: action.payload };
    case "CircleCenterX":
      return { ...state, circleCenterX: action.payload };
    case "CircleCenterY":
      return { ...state, circleCenterY: action.payload };
    case "ModalVisible":
      return { ...state, modalVisible: action.payload };
    case "StartRange":
      return { ...state, startRange: action.payload };
    case "EndRange":
      return { ...state, endRange: action.payload };
    default:
      return state;
  }
 }
 
 const AlarmScreen = () => {
  // Ref
  const circleRef = useRef();

  // States
  const [startRangeInput, setStartRangeInput] = useState('7');
  const [endRangeInput, setEndRangeInput] = useState('8');

  // UseReducer
  const [state, dispatch] = useReducer(reducer, initState);
  const {
    startAngle,
    angleLength,
    angleDifference,
    bedTime,
    wakeUpTime,
    hoursDifference,
    minutesDifference,
    isSleepGoalMatched,
    outerLinesColor,
    sleepGoalColorMatched,
    sleepGoalIconColorMatched,
    percent,
    progressLayer,
    offsetLayer,
    circleCenterX,
    circleCenterY,
    modalVisible,
    startRange,
    endRange,
  } = state;
  
  // Pan Responders
  const panResponderBed =
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: Animated.event(
        [],
        {
          useNativeDriver: false,
          listener: (evt, { moveX, moveY }) => {
            const currentAngleStop = (startAngle + angleLength) % (2 * Math.PI);
            let newAngle = Math.atan2(moveY - circleCenterY, moveX - circleCenterX) + Math.PI / 2;

            if(newAngle < 0) {
              newAngle += 2 * Math.PI;
            }

            let newAngleLength = (currentAngleStop - newAngle) % (2 * Math.PI);

            if(newAngleLength < 0) {
              newAngleLength += 2 * Math.PI;
            }

            dispatch({ type: "StartAngle", payload: newAngle });
            dispatch({ type: "AngleLength", payload: newAngleLength });
          },
        },
      ),
    });
  const panResponderBell = 
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: Animated.event(
        [],
        {
          useNativeDriver: false,
          listener: (evt, { moveX, moveY }) => {
            const newAngle = Math.atan2(moveY - circleCenterY, moveX - circleCenterX) + Math.PI / 2;
            let newAngleLength = (newAngle - startAngle) % (2 * Math.PI);

            if(newAngleLength < 0) {
              newAngleLength += 2 * Math.PI;
            }

            dispatch({ type: "AngleLength", payload: newAngleLength });
          },
        },
      ),
    });
  const panResponderDifference = 
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, { moveX, moveY }) => {
        let angDiff = Math.atan2(moveY - circleCenterY, moveX - circleCenterX);
        
        if(angDiff < 0) {
          angDiff -= 2 * Math.PI;
        }

        angDiff -= startAngle;
        dispatch({ type: "AngleDifference", payload: angDiff });
      },
      onPanResponderMove: Animated.event(
        [],
        {
          useNativeDriver: false,
          listener: (evt, { moveX, moveY }) => {
            let newAngle = Math.atan2(moveY - circleCenterY, moveX - circleCenterX) - angleDifference;
            
            if(newAngle < 0) {
              newAngle -= 2 * Math.PI;
            }

            dispatch({ type: "StartAngle", payload: newAngle });
          },
        },
      ),
    });

  // Hook
  useLayoutEffect(() => {
    // PROGRESS AND OFFSET LAYER CHANGES
    const startAngleDegree = Math.round((startAngle * 360) / (Math.PI * 2));
    const angleLengthDegree = Math.round((angleLength * 360) / (Math.PI * 2));
    const angleLengthPercentage = Math.round((angleLength * 100) / (Math.PI * 2));
    dispatch({ type: "Percent", payload: angleLengthPercentage });
    if(angleLengthPercentage > 50) {
      dispatch({ type: "ProgressLayer", payload: (progressLayerBaseValue + startAngleDegree) % 360 });
      dispatch({ type: "OffsetLayer", payload: (offsetLayerBaseValue + angleLengthDegree + startAngleDegree) % 360 });
    } else {
      dispatch({ type: "ProgressLayer", payload: (progressLayerBaseValue + angleLengthDegree + startAngleDegree + 180) % 360 });
      dispatch({ type: "OffsetLayer", payload: (offsetLayerBaseValue + startAngleDegree) % 360 });
    }

    // Updating Bed time, Wake up time, time difference and sleep goal matched
    dispatch({ type: "BedTime", payload: calculateTimeFromAngle(startAngle) });
    dispatch({ type: "WakeUpTime", payload: calculateTimeFromAngle((startAngle + angleLength) % (2 * Math.PI)) });
    const minutesLong = calculateMinutesFromAngle(angleLength);
    const hours = Math.floor(minutesLong / 60);
    const minutes = Math.round(minutesLong - hours * 60);
    dispatch({ type: "HoursDifference", payload: hours });
    dispatch({ type: "MinutesDifference", payload: minutes });
    sleepGoalMatched();
  }, [startAngle, angleLength]);
  
  // Methods
  const calculateMinutesFromAngle = angle =>
    (angle / ((2 * Math.PI) / (12 * 12))) * 5 * 2;

  const calculateTimeFromAngle = angle => {
    const minutes = calculateMinutesFromAngle(angle);
    const h = Math.floor(minutes / 60);
    const m = minutes - h * 60;
    return moment(new Date(2000, 1, 1, h, m, 0, 0))
      .format('hh:mm A')
      .toString();
  };

  const onLayout = () => setCircleCenter();

  const setCircleCenter = () => {
    if(circleRef?.current)
      circleRef.current.measure((x, y, w, h, px, py) => {
        if(px >= 0 && py >= 0) {
          dispatch({ type: "CircleCenterX", payload: px + clockCircleBorderRadius });
          dispatch({ type: "CircleCenterY", payload: py + clockCircleBorderRadius });
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
    if(hoursDifference >= 0 && minutesDifference >= 0) {
      const startRangeInMinutes = parseInt(startRange, 10) * 60;
      const endRangeInMinutes = parseInt(endRange, 10) * 60;
      const totalTimeDifferenceInMinutes = hoursDifference * 60 + minutesDifference;
      if(totalTimeDifferenceInMinutes >= startRangeInMinutes
        && totalTimeDifferenceInMinutes <= endRangeInMinutes) {
          dispatch({ type: "IsSleepGoalMatched", payload: true });
          dispatch({ type: "SleepGoalColorMatched", payload: '#262427' });
          dispatch({ type: "SleepGoalIconColorMatched", payload: '#727277' });
          dispatch({ type: "OuterLinesColor", payload: '#000000' });
          return;
      }
    }
    dispatch({ type: "IsSleepGoalMatched", payload: false });
    dispatch({ type: "SleepGoalColorMatched", payload: '#CA7F22' });
    dispatch({ type: "SleepGoalIconColorMatched", payload:'#72260A' });
    dispatch({ type: "OuterLinesColor", payload: 'rgba(0, 0, 0, 0.15)' });
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
        <Text style={styles.totalTimeText}>{`${hoursDifference} hr ${minutesDifference} min`}</Text>
        {!isSleepGoalMatched
          ? <View style={styles.messageContainer}>
              <View style={styles.info}>
                <Text style={styles.infoText}>{`!`}</Text>
              </View>
              <Text
                style={styles.meetText}>{` ${notMeetSleepGoalMessage}`}
              </Text>
          </View>
        : <Text style={styles.meetText}>{` ${meetSleepGoalMessage}`}</Text>
        }
        <View style={styles.goalTimeContainer}>
          <Text style={styles.goalHeading}>Daily Sleep Goal</Text>
          <TouchableOpacity activeOpacity={0.9}
            onPress={() => {
              dispatch({ type: "ModalVisible", payload: true });
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
          dispatch({ type: "ModalVisible", payload: false });
        }}
    >
        <View style={styles.dailySleepGoalModalContainer}>
        <View style={styles.modalHeadingContainer}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => dispatch({ type: "ModalVisible", payload: false })}>
            <Ionicons name="ios-close-sharp" size={30} color="#FF5733" />
            </TouchableOpacity>
            <Text style={styles.modalHeading}>Sleep Goal</Text>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    const startRangeValue = parseInt(startRangeInput, 10);
                    const endRangeValue = parseInt(endRangeInput, 10);
                    if(startRangeValue > 0 && startRangeValue < 24 && endRangeValue > 1 && endRangeValue < 25 && endRangeValue > startRangeValue) {
                        dispatch({ type: "ModalVisible", payload: false });
                        dispatch({ type: "StartRange", payload: startRangeInput });
                        dispatch({ type: "EndRange", payload: endRangeInput });
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
            borderWidth: iconSize + iconPadding * 2,
            height: iconRotationCircleSize,
            width: iconRotationCircleSize,
            borderRadius: iconRotationCircleBorderRadius,
            transform: [{rotateZ: `${progressLayer}deg`}],
            }}
            {...panResponderDifference.panHandlers}
        />

        {/* Offset Layer */}
        <Animated.View style={{
            ...styles.progressOffsetLayer,
            borderRightColor: percent > 50 ? sleepGoalColorMatched : 'black',
            borderTopColor: percent > 50 ? sleepGoalColorMatched : 'black',
            borderWidth: iconSize + iconPadding * 2,
            height: iconRotationCircleSize,
            width: iconRotationCircleSize,
            borderRadius: iconRotationCircleBorderRadius,
            transform: [{rotateZ: `${offsetLayer}deg`}],
            }}
            {...panResponderDifference.panHandlers}
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
            padding: deviceWidth * 0.0215,
            borderRadius: iconSize + deviceWidth * 0.0215,
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
            padding: deviceWidth * 0.023,
            paddingHorizontal: deviceWidth * 0.0265,
            borderRadius: deviceWidth * 0.05 + deviceWidth * 0.023,
            transform: [
                {
                  translateX: calculateArcCircle().toX,
                },
                {
                  translateY: calculateArcCircle().toY,
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
                        color: index % 3 === 0 ? '#C3C1C3' : '#706F74',
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
                        color: index % 3 === 0 ? '#C3C1C3' : '#706F74',
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
    <View
      style={{
        ...styles.clockCircle,
        height: clockCircleSize,
        width: clockCircleSize,
        borderRadius: clockCircleBorderRadius,
      }}
      onLayout={onLayout}
    >
      <View 
        style={{
          ...styles.clockCircle,
          height: clockCircleSize,
          width: clockCircleSize,
          borderRadius: clockCircleBorderRadius,
        }}
        ref={circleRef}
      >
          <View style={{
              ...styles.contentAlignCenter,
              height: iconRotationCircleSize,
              width: iconRotationCircleSize,
              borderRadius: iconRotationCircleBorderRadius,
            }}
          >
              {/* Icon Difference */}
              {iconDifferenceWithRotatingLines()}

              {/* ROTATING ICONS */}
              {rotatingIcons()}

              {/* Clock Layout */}
              {clockLayout()}
          </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <Text style={styles.titleText}>{alarmScreenHeading}</Text>

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
 