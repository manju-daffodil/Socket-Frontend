import React, {Component} from 'react';

import {Text, View, TextInput, TouchableOpacity} from 'react-native';

import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.warn('props>>', this.props.navigation.navigate);
  }

socket.on

  handleChange = (key, value) => {
    this.setState({[key]: value});
  };

  handleUser = () => {
    axios
      .post('http://192.168.100.172:8888/register', this.state)
      .then(response => {
        console.warn('response.data', response.data);
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        console.warn('error>>', err);
      });
  };
  render() {
    return (
      <View style={styles.parent}>
        <TextInput
          style={styles.textField}
          placeholder="firstname"
          onChangeText={text => {
            this.handleChange('firstname', text);
          }}
          onSubmitEditing={() => this.lastname.focus()}
        />
        <TextInput
          style={styles.textField}
          ref={ref => (this.lastname = ref)}
          placeholder="lastname"
          onChangeText={text => {
            this.handleChange('lastname', text);
          }}
          onSubmitEditing={this.handleUser}
        />
        <TouchableOpacity onPress={this.handleUser} style={styles.button}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

styles = {
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    height: 50,
    width: 200,
    borderWidth: 2,
    borderColor: 'black',
    color: 'black',
    marginBottom: 10,
    borderRadius: 20,
  },
  button: {
    backgroundColor: 'blue',
    height: 30,
    width: 60,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: 'black',
  },
};
