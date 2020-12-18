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

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleForgotPassword = () => {
    var email = this.state.email;

    if (email !== '') {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          console.log('Email sent');
          this.props.navigation.goBack();
        })
        .catch((err) => {
          Alert.alert(err.toString());
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
          <Text style={styles.headerText}>Enter your Email</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.formLabel}>E-Mail ID:</Text>
          <TextInput
            placeholder="Enter your E-mail"
            style={styles.formInput}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              title="Send"
              style={styles.submitButton}
              onPress={this.handleForgotPassword}>
              <Text style={styles.white}> Send Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default ForgotPassword;

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
    fontSize: 40,
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
