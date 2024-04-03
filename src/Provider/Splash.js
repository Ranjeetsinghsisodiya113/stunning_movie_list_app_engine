import React, { Component } from 'react'
import { SafeAreaView, Text, View, Image, StyleSheet, StatusBar, ImageBackground, Alert, Platform } from 'react-native'
import { config, msgProvider, localStorage, apifuntion, msgText, msgTitle, consolepro, Font, Colors, mobileH, mobileW, localimag, firebaseprovider, Lang_chg } from './utilslib/Utils';
//import OneSignal from 'react-native-onesignal'
import auth from 'firebase';
import { TouchableOpacity } from 'react-native';
import { BackHandler } from 'react-native';
global.content_arr = 'NA'
global.notification_count_1 = 0
global.user_name_type = 0
export default class Splash extends Component {

    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            player_id: '',
            isConnected: true,
        }

        // /* O N E S I G N A L   S E T U P */
        // OneSignal.setAppId(config.onesignalappid);
        // OneSignal.setLogLevel(6, 0);
        // OneSignal.setRequiresUserPrivacyConsent(false);
        // OneSignal.promptForPushNotificationsWithUserResponse(response => {
        //     //this.OSLog("Prompt response:", response);
        //     consolepro.consolelog("Prompt response:", response);
        // });

       
    }

    //----------for auth start ----------------------//
    firstlogin = async () => {

        auth()
            .createUserWithEmailAndPassword(config.demoemail, config.password)
            .then((user) => {
                consolepro.consolelog('user199', user)
                console.log('User account created & signed in!');

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    this.loginbtn()
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }

    loginbtn = () => {
        auth()
            .signInWithEmailAndPassword(config.demoemail, config.password)
            .then((user) => {
                consolepro.consolelog('user199', user)
                console.log('User account created & signed in!');

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    //this.loginbtn()
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }
    //----------for auth end ----------------------//


    async componentDidMount() {

        this._willBlurSubscription = this.props.navigation.addListener('blur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
        );
        // this.firstlogin()
        // firebaseprovider.getAllUsers()
        // //--------for one signal start ----------
        // // consolepro.consolelog("helllllllllllllllllllllll")
        // OneSignal.addEmailSubscriptionObserver((event) => {
        //     // consolepro.consolelog("OneSignal: email subscription changed:", event);
        // });
        // OneSignal.addSubscriptionObserver(event => {
        //     // consolepro.consolelog("OneSignal: subscription changed:", event);
        // });
        // OneSignal.addPermissionObserver(event => {
        //     // consolepro.consolelog("addPermissionObserver", event);

        // });

        // var interval = setInterval(async () => {
        //     await OneSignal.getDeviceState().then(state => {
        //         // consolepro.consolelog({ state })
        //         // consolepro.consolelog('hii player', state.userId)
        //         if (state.isSubscribed == true) {
        //             clearInterval(interval);
        //         }
        //         player_id_me1 = state.userId

        //     }).catch(error => {
        //         consolepro.consolelog({ error })
        //     })
        // }, 500);

        //--------for one signal end ----------

        setTimeout(() => {
            consolepro.consolelog('id',player_id_me1)
            this.authenticateSession();
        }, 2000);
    }

    handleBackPress = () => {
        Alert.alert(
            Lang_chg.exit_app_txt[config.language],
            Lang_chg.do_you_want_exit_txt[config.language], [{
                text: Lang_chg.no_txt[config.language],
                onPress: () => consolepro.consolelog('Cancel Pressed'),
            }, {
                text: Lang_chg.yes_txt[config.language],
                onPress: () => BackHandler.exitApp()
            }], {
            cancelable: false
        }
        ); // works best when the goBack is async
        return true;
    };


    authenticateSession = async () => {

        this.props.navigation.navigate('Home')
       // this.props.navigation.navigate('Login')
        return false

        let result = await localStorage.getItemObject('user_arr');
        consolepro.consolelog('splasedata', result)
        if (result != null) {
            if (result.login_type == 'app') {
                if (result.otp_verify == 1) {
                    if (result.profile_complete == 1) {
                        let password = await localStorage.getItemString('password');
                        let url = config.baseURL + "login.php";
                        var data = new FormData();
                        data.append('email', result.email)
                        data.append('password', password)
                        data.append("login_type", config.login_type)
                        data.append("device_type", config.device_type)
                        data.append("player_id", player_id_me1)
                        data.append("action", 'normal_login')
                        consolepro.consolelog('data', data)
                        apifuntion.postApi(url, data, 1).then((obj) => {

                            consolepro.consolelog('user_arr', obj)
                            // alert(JSON.stringify(obj))
                            if (obj.success == 'true') {
                                var user_arr = obj.user_details;
                                var user_id = user_arr.user_id;
                                var mobile = user_arr.mobile;
                                localStorage.setItemString('user_id', JSON.stringify(user_id));
                                localStorage.setItemObject('user_arr', user_arr);
                                localStorage.setItemString('mobile', mobile);
                                this.props.navigation.navigate('Home')
                                firebaseprovider.firebaseUserCreate();
                                // firebaseprovider.getMyInboxAllData();
                                firebaseprovider.getMyInboxAllDataBooking();


                            }
                            else {
                                msgProvider.toast(msgTitle.information[config.language], obj.msg[config.language], false);
                                this.props.navigation.navigate('Login')
                                return false;

                            }
                        }).catch((error) => {
                            consolepro.consolelog("-------- error ------- " + error);

                        });

                    }
                    else {

                        this.props.navigation.navigate('Login')
                    }
                }
                else {

                    this.props.navigation.navigate('Login')
                }
            } else {

                this.props.navigation.navigate('Login')
            }
        }
        else {

            this.props.navigation.navigate('Login')
        }
    }






    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>


                <StatusBar barStyle={'dark-content'}
                    hidden={false}
                    backgroundColor={Colors.whiteColor}
                    networkActivityIndicatorVisible={true} />




                <ImageBackground source={localimag.splashLogin} style={{
                    height: mobileH, width: mobileW, justifyContent: 'center',
                    alignItems: 'center'
                }} resizeMode='cover'>

                    <View style={{
                        position: 'absolute',
                        top: mobileH * 16 / 100
                    }}>

                        <Text style={{
                            fontSize: mobileW * 18 / 100,
                            color: Colors.whiteColor,
                            fontFamily: Font.FontBold
                        }}>{Lang_chg.logo_txt}</Text>

                    </View>


                    <Text style={{
                        fontSize: mobileW * 7 / 100,
                        color: Colors.whiteColor,
                        fontFamily: Font.FontSemiBold
                    }}>{Lang_chg.Welcome_to_agriCab[config.language]}</Text>


                    <Text style={{
                        fontSize: mobileW * 4 / 100,
                        color: Colors.whiteColor,
                        fontFamily: Font.FontMedium,
                        textAlign: 'center',
                        marginTop: mobileH * 0.5 / 100
                    }}>{Lang_chg.lorem_ipsum_txt[config.language]}</Text>


                    {/* ========Buttons=========== */}
                    <View style={{
                        position: 'absolute',
                        bottom:Platform.OS=='ios'? mobileH * 15 / 100: mobileH * 6 / 100
                    }}>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Are_you',{user_name_type:user_name_type})}
                            activeOpacity={0.7}

                            style={{

                                borderWidth: 1,
                                borderRadius: mobileW * 20 / 100,
                                borderColor: Colors.whiteColor,
                                // marginTop: mobileH * 20/ 100,
                                height: mobileH * 6.2 / 100,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: Colors.whiteColor,
                                width: mobileW * 85 / 100,
                                alignSelf: 'center',
                                flexDirection: 'row'

                            }}>
                            <Text style={{
                                color: Colors.theme_color,
                                fontSize: mobileW * 4 / 100,
                                fontFamily: Font.FontSemiBold
                            }}>{Lang_chg.signup_txt[config.language]}</Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Home')}
                            activeOpacity={0.7}

                            style={{

                                borderWidth: 1,
                                borderRadius: mobileW * 20 / 100,
                                borderColor: Colors.whiteColor,
                                marginTop: mobileH * 3 / 100,
                                height: mobileH * 6.2 / 100,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: Colors.theme_color,
                                width: mobileW * 85 / 100,
                                alignSelf: 'center',
                                flexDirection: 'row'

                            }}>
                            <Text style={{
                                color: Colors.whiteColor,
                                fontSize: mobileW * 4 / 100,
                                fontFamily: Font.FontSemiBold
                            }}>{Lang_chg.login_txt[config.language]}</Text>

                        </TouchableOpacity>

                    </View>
                </ImageBackground>


            </SafeAreaView>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.theme_color
    },
    logo: {
        resizeMode: 'contain',
        width: mobileW * 50 / 100,
    },



});