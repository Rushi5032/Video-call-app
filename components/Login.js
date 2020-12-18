import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import requestCameraAndAudioPermission from './permission';
import auth from '@react-native-firebase/auth';
import FontAwesome, {parseIconFromClassName} from 'react-native-fontawesome';
import {GoogleSignin} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    if (Platform.OS === 'android') {
      //Request required permissions from Android
      requestCameraAndAudioPermission().then((_) => {
        console.log('requested!');
      });
    }
    if (auth().currentUser !== null) {
      this.props.navigation.navigate('Home');
    }
    GoogleSignin.configure({
      webClientId:
        '294935276496-pstcf0dqvmsmm8ut57l8btofur916c0a.apps.googleusercontent.com',
    });
  }

  handleLogin = () => {
    var email = this.state.email;
    var password = this.state.password;

    if (email !== '' && password !== '') {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('user logged in');
          this.props.navigation.navigate('Home');
        })
        .catch((err) => {
          console.log(err);
          Alert.alert(err.toString());
        });
    }
  };

  handleGoogle = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      auth()
        .signInWithCredential(googleCredential)
        .then(() => {
          console.log('logged in using gmail');
          this.props.navigation.navigate('Home');
        });
    } catch (err) {
      console.log(err.toString());
    }
  };

  handleFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      await auth()
        .signInWithCredential(facebookCredential)
        .then(() => {
          console.log('logged in using facebook');
          this.props.navigation.navigate('Home');
        });
    } catch (err) {
      console.log(err.toString());
    }
  };

  handlePhone = () => {};

  render() {
    const google = parseIconFromClassName('fab fa-google');
    const facebook = parseIconFromClassName('fab fa-facebook');
    const github = parseIconFromClassName('fab fa-github');

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.formLabel}>E-Mail ID:</Text>
          <TextInput
            placeholder="Enter your E-mail"
            style={styles.formInput}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          <Text style={styles.formLabel}>Password:</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Enter your Password"
            style={styles.formInput}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              title="Login"
              style={styles.submitButton}
              onPress={this.handleLogin}>
              <Text style={styles.white}> Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="Register"
              style={styles.submitButton}
              onPress={() => {
                this.props.navigation.navigate('Register');
              }}>
              <Text style={styles.white}> Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="ForgotPassword"
              onPress={() => {
                this.props.navigation.navigate('Forgot');
              }}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.diffLogin}>
            <FontAwesome
              style={styles.google}
              icon={google}
              onPress={this.handleGoogle}
            />
            <FontAwesome
              style={styles.facebook}
              icon={facebook}
              onPress={this.handleFacebook}
            />
            <FontAwesome
              style={styles.phone}
              icon={github}
              onPress={this.handlePhone}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0093E9',
  },
  google: {
    fontSize: 30,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    color: '#db4a39',
  },
  facebook: {
    fontSize: 30,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    color: '#3b5998',
  },
  phone: {
    fontSize: 30,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    color: '#211F1F',
  },
  diffLogin: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  forgotText: {
    color: 'blue',
    fontWeight: '700',
  },
  formLabel: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  formInput: {
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    paddingLeft: 20,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
  },
  submitButton: {
    paddingHorizontal: 60,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: '#0093E9',
    borderRadius: 25,
  },
  white: {
    color: '#fff',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 55,
  },
  headerSubText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
});
