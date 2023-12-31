/* eslint-disable prettier/prettier */
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the Icon component
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';

export default function Btn({ btnLabel, Press }) {
    return (
        <TouchableOpacity onPress={Press}>
            <LinearGradient
                colors={['#3dc6b9', '#4df8e8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}>
                <Text style={styles.buttonText}>{btnLabel} </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

export function SignupBtn({ btnLabel, Press }) {
    return (
        <TouchableOpacity onPress={Press} style={styles.SignupbtnStyle}>
            <LinearGradient
                colors={['white', 'white']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.SignupbtnGradient}>
                <Text style={styles.SignupbuttonText}>{btnLabel} </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

export function GoogleBtn({ btnLabel, Press }) {
    return (
        <TouchableOpacity
            onPress={Press}
            style={[styles.btnStyle, { backgroundColor: '#ffff' }]}>
            <Text style={[styles.btnTextStyle, { color: '#4b3ca7' }]}>
                {btnLabel}
            </Text>
        </TouchableOpacity>
    );
}

export function AcceptBtn({ btnLabel, Press }) {
    return (
        <TouchableOpacity
            onPress={Press}
            style={[styles.btnStyle, { backgroundColor: '#28a745' }]}>
            <Text style={[styles.btnTextStyle]}>
                {btnLabel}{" "}<Icon name="check" size={20} color="#ffffff" />
            </Text>
        </TouchableOpacity>
    );
}
export function AddToEmergencyContactBtn({ btnLabel, Press }) {
    return (

        <TouchableOpacity onPress={Press} style={styles.emergencyBtnStyle}>
            <LinearGradient
                colors={['#3dc6b9', '#4df8e8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.emergencyBtnStyle}>
                <Text style={[styles.btnTextStyle]}>{btnLabel} </Text>
            </LinearGradient>
        </TouchableOpacity>
        // <TouchableOpacity onPress={Press} style={styles.emergencyBtnStyle}>
        //     <Text style={[styles.btnTextStyle]}>{btnLabel}</Text>
        // </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    SignupbtnStyle: {
        alignItems: 'center',
        paddingVertical: responsiveHeight(1.5),
        paddingLeft: responsiveHeight(10),
        width: responsiveWidth(30),
    },
    SignupbtnGradient: {
        width: responsiveWidth(40),
        height: responsiveHeight(5),
        borderRadius: 30,
        alignItems: 'center',
    },
    gradient: {
        borderRadius: 50,
        width: responsiveWidth(55),
        height: responsiveHeight(5.5),
        alignItems: 'center',
    },
    btnStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        paddingVertical: responsiveHeight(1.5),
        width: responsiveWidth(50),
    },
    btnTextStyle: {
        color: '#ffff',
        fontSize: responsiveFontSize(2.5),
        fontFamily: 'Montserrat-Bold',

    },
    emergencyBtnStyle: {
        borderRadius: 100,
        alignItems: 'center',
        width: responsiveWidth(90),
        paddingVertical: responsiveHeight(1),
        marginVertical: responsiveHeight(0.5),
    },
    buttonText: {
        fontSize: responsiveFontSize(3),
        fontFamily: 'Montserrat-Bold',
        color: 'white',
    },
    SignupbuttonText: {
        fontSize: responsiveFontSize(2.7),
        fontFamily: 'Montserrat-Bold',
        color: '#04A7A4',
    },
});
