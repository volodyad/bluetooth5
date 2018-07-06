/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
var DeviceInfo = require('react-native-device-info');
import BluetoothSerial from 'react-native-bluetooth-serial';

export default class App extends Component {
  constructor() {
    super();
    this.manager = new BleManager();
    this.state = { macAddress: '' };
  }
  componentDidMount() {
    debugger;

    DeviceInfo.getMACAddress().then(macAddress => {
      debugger;
      this.setState({macAddress})
    })
  
  }

  bluetoothError() {

  }

  requestEnable () {
    BluetoothSerial.requestEnable()
    .then(
      BluetoothSerial.on('connectionSuccess', () => {
            if (this.state.device) {
              Toast.showShortBottom(`Connection to device ${this.state.device.name} has been lost`)
            }
            this.setState({ connected: false })
          })
    )
    .catch((err) => Toast.showShortBottom(err.message))
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Device name {DeviceInfo.getDeviceName()}</Text>
        <Text>id {DeviceInfo.getDeviceId()}</Text>
        <Text>Mac address {this.state.macAddress} </Text>
        <Text>Unique id {DeviceInfo.getUniqueID()}</Text>
        <Text>Instance id {DeviceInfo.getInstanceID()}</Text>
        <Button
                title='Request enable'
                onPress={() => this.requestEnable()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
