 import { StyleSheet } from 'react-native';
 
 // File Inports
 import Constants from '../../utils/constants';

 // Constants
 const { deviceHeight, deviceWidth } = Constants;

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
    scrollView: {
        marginTop: deviceHeight * 0.035,
    },
    clockCircle: {
        height: deviceWidth * 0.8,
        width: deviceWidth * 0.8,
        borderRadius: deviceWidth * 0.8 / 2,
        backgroundColor: '#000000',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    clockLayoutWrapper: {
        height: deviceWidth * 0.55,
        width: deviceWidth * 0.55,
        borderRadius: deviceWidth * 0.55 / 2,
        backgroundColor: '#262427',
        alignSelf: 'center'
    },
    clockContainer: {
        backgroundColor: '#262427',
        padding: 20,
        borderRadius: 10,
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
        backgroundColor: '#CA7F22',
        borderRadius: deviceWidth * 0.028,
        marginTop: 7,
    },
    infoText: {
        color: 'black',
        paddingHorizontal: deviceWidth * 0.014,
        paddingVertical: deviceHeight * 0.0018,
        textAlign: 'center',
        fontSize: 9,
        fontWeight: 'bold',
    },
    goalTimeContainer: {
        paddingTop: 15,
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
        marginRight: 5,
    },
    textAlignCenter: {
        textAlign: 'center',
    },
    contentAlignCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentAlignCenterWithSelfAlign: {
        alignItems: 'center', 
        justifyContent: 'center', 
        alignSelf: 'center',
    },
    progressOffsetLayer: {
        position: 'absolute',
        zIndex: 1,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        marginVertical: deviceWidth * 0.002 * 2,
    },
    clockOuterDotsContainer: {
        height: deviceWidth * 0.7,
        width: 2.5,
        justifyContent: 'space-between',
        zIndex: 1,
        position: 'absolute',
    },
    clockOuterDots: {
        height: 13,
        width: 2.5,
    },
    rotatingIcon: {
        position: 'absolute',
        zIndex: 1,
        padding: deviceWidth * 0.023,
        marginVertical: deviceWidth * 0.002 * 2,
    },
    clockInnerDotsContainer: {
        position: 'absolute',
        backgroundColor: 'transparent',
        height: deviceWidth * 0.52,
        width: deviceWidth * 0.52,
    },
    clockInnerDotsWrapper: {
        height: deviceWidth * 0.52,
        width: 1,
        justifyContent: 'space-between',
    },
    clockInnerDots: {
        width: 1,
        backgroundColor: '#464448',
    },
    timeCountingContainer: {
        position: 'absolute',
        backgroundColor: 'transparent',
        height: deviceWidth * 0.45,
        width: deviceWidth * 0.45,
    },
    timeCountingWrapper: {
        height: deviceWidth * 0.45,
        justifyContent: 'space-between',
    },
    timeCountingFont: {
     fontSize: 13,
    },
    innerTimeIcons: {
        height: deviceWidth * 0.34,
        width: deviceWidth * 0.1,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute'
   },
   dailySleepGoalContainer: {
        flexDirection: 'row',
        alignItems: 'center'
   },
   dailySleepGoalModalContainer: {
        backgroundColor: '#36454F',
        height: deviceHeight * 0.45,
        width: deviceWidth * 0.9,
        alignSelf: 'center',
        marginTop: deviceHeight * 0.1,
        borderRadius: deviceHeight * 0.01,
        padding: 20,
   },
   modalHeadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginBottom: 10,
   },
   modalHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF'
   },
   goalRangeOuterText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginVertical: 5,
        marginLeft: 5,
   },
   goalRangeInnerText: {
        fontSize: 16,
        fontWeight: '400',
   },
   goalRangeTextInput: {
        backgroundColor: 'white',
        marginHorizontal: 5,
        padding: 10,
        fontSize: 18,
        borderRadius: 5,
   },
   startGoalRangeTextInput: {
        marginBottom: 10,
   },
 });

 export default styles;
