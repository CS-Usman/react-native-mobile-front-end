/* eslint-disable prettier/prettier */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

import { Formik } from 'formik';

import Title, { Info } from '../../components/Text.js';
import Btn from '../../components/Button';
import Field from '../../components/TextInput';
import { EmailValidationSchema } from '../../utils/FromValidation';
import { forgotPasswordApi } from '../../services/AuthApiService.js';

const ForgotPasswordScreen = (props) => {

    const initialValues = {
        email: '',
    };

    const handleSubmit = async (values) => {
        const response = await forgotPasswordApi(values);
        const data = { ...values, ...response };
        if (response) {
            props.navigation.navigate('VerifyOtpScreen', { userData: data });
            props.navigation.navigate('VerifyOtpScreen');
        }
    };

    return (
        <KeyboardAvoidingView>
            <ImageBackground
                source={require('../../../assets/images/background.png')}
                style={styles.img}>

                <View style={styles.container}>
                    <View style={styles.registerContainer}>
                        <View style={styles.loginInfoView}>
                            <Title content="FORGOT PASSWORD" />
                            <Info content="Enter email to get otp" />
                        </View>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={EmailValidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                                <>
                                    <Field
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        placeholder="Enter email"
                                        placeholderTextColor="#a9a9a9"

                                    />
                                    {errors.email && (
                                        <Text style={styles.errorText}>{errors.email}</Text>
                                    )}
                                    <Text style={styles.space}>{''}</Text>
                                    <View style={styles.loginButtonView}>

                                        <Btn
                                            title="Submit"
                                            btnLabel="NEXT"
                                            Press={handleSubmit}
                                        />
                                    </View>
                                </>
                            )}
                        </Formik>
                    </View>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

// Rest of your styles and export statement...


const styles = StyleSheet.create({
    img: {
        height: '100%',
        width: '100%',
    },
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerContainer: {
        backgroundColor: '#1B1B1B',
        opacity: 0.95,
        width: responsiveWidth(90), // Responsive width
        paddingTop: responsiveHeight(3),
        alignItems: 'flex-start',
        paddingLeft: responsiveWidth(2.5), // Responsive padding
        borderRadius: 20,
        height: responsiveHeight(50), // Responsive height
    },
    loginInfoView: {
        paddingLeft: responsiveWidth(2.5),
        marginBottom: responsiveHeight(4),
    },
    space: {
        marginVertical: responsiveHeight(0.5),
    },
    errorText: {
        color: 'red',
        paddingLeft: responsiveWidth(5),
    },
    loginButtonView: {
        marginTop: responsiveHeight(4),
        width: responsiveWidth(80), // Responsive width
        alignItems: 'center',
        borderRadius: 20,
    },
});

export default ForgotPasswordScreen;
