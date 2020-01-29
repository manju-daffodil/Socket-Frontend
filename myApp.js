import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';

import io from 'socket.io-client';
let socket;
class myApp extends Component {
  constructor() {
    super();
    this.state = {sendername: '', result: []};
    socket = io.connect('http://192.168.100.172:9999/');
  }
  componentDidMount() {
    socket.on('connect', () => {
      console.log('Connect>>>>==');
    });

    socket.on('socket_Id', data => {
      //console.warn('data from server', data);
    });
    socket.on('chat_message', data => {
      let newArr = this.state.result.push(data);
      //console.warn('ARR>>>', this.state.result);
      this.setState({result: this.state.result}, () => {
        console.warn('Sender', this.state.result);
      });
    });
  }

  handleChange = (key, value) => {
    this.setState({[key]: value});
  };

  handlePress = () => {
    this.state.result.push({
      message: this.state.message,
      name: this.state.sender,
    });
    this.setState({result: this.state.result}, () => {
      console.warn('newres>>>', this.state.result);
    });
    socket.emit('send_Message', {
      sender: this.state.sender,
      receiver: this.state.receiver,
      message: this.state.message,
    });
  };

  handleUser = () => {
    socket.emit('addUser', {name: this.state.sender});
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text>Messages</Text>
          {this.state.result.length > 0 &&
            this.state.result.map(res => {
              console.log('res>>', res);
              return (
                <View>
                  <Text>
                    {res.name}
                    {'-'}
                    {res.message}
                  </Text>
                </View>
              );
            })}
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TextInput
            style={{
              height: 50,
              width: 200,
              borderWidth: 2,
              borderColor: 'black',
              color: 'black',
              marginBottom: 10,
            }}
            placeholder="sender"
            onChangeText={text => {
              this.handleChange('sender', text);
            }}
          />
          <TouchableOpacity
            onPress={this.handleUser}
            style={{
              backgroundColor: 'blue',
              height: 30,
              width: 60,
              marginBottom: 10,
            }}>
            <Text>Add User</Text>
          </TouchableOpacity>

          <TextInput
            style={{
              height: 50,
              width: 200,
              borderWidth: 2,
              borderColor: 'black',
              color: 'black',
              marginBottom: 10,
            }}
            placeholder="message"
            onChangeText={text => {
              this.handleChange('message', text);
            }}
          />

          <TextInput
            style={{
              height: 50,
              width: 200,
              borderWidth: 2,
              borderColor: 'black',
              color: 'black',
              marginBottom: 10,
            }}
            placeholder="receiver"
            onChangeText={text => {
              this.handleChange('receiver', text);
            }}
          />
          <TouchableOpacity
            onPress={this.handlePress}
            style={{backgroundColor: 'blue', height: 30, width: 60}}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default myApp;
