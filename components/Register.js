import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import FontAwesome, {parseIconFromClassName} from 'react-native-fontawesome';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: '',
    };
  }

  handleRegister = () => {
    let email = this.state.email;
    let password = this.state.password;
    let user = this.state.user;
    if (email !== '' && password !== '') {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          result.user
            .updateProfile({
              displayName: user,
            })
            .then(() => {
              this.props.navigation.navigate('Home');
            });
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          Alert.alert(error.toString());
        });
    }
  };

  render() {
    const back = parseIconFromClassName('fas fa-arrow-left');

    return (
      <View style={styles.container}>
        <FontAwesome
          style={styles.iconStyle}
          icon={back}
          onPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.header}>
          <Text style={styles.headerText}>Register</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.formLabel}>Username:</Text>
          <TextInput
            placeholder="Enter your username"
            style={styles.formInput}
            onChangeText={(user) => this.setState({user})}
            value={this.state.user}
          />
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
              title="Register"
              style={styles.submitButton}
              onPress={this.handleRegister}>
              <Text style={styles.white}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0093E9',
  },
  iconStyle: {
    fontSize: 35,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    borderRadius: 0,
    color: 'white',
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
