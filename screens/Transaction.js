import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {BarcodeScanner} from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";

export default class TransactionScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      domState:"normal",
      hasCameraPermissions:null,
      scanned:false,
      scannedData:"",
    }
  }
  getCameraPermissions = async domState => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions:status === "granted",
      domState:domState,
      scanned:false,
    })
  }
    handleBarcodeScan = async({type,data}) => {
      this.setState({
        scannedData:data,
        domState:"normal",
        scanned:true,
      })
    }
  render() {
    const {domState,hasCameraPermissions,scannedData,scanned} = this.state
    if(domState === "scanner"){
      return(
        <BarcodeScanner
          onBarcodeScanned = {scanned?undefined:this.handleBarcodeScan}
          style = {StyleSheet.absoluteFillObject}
        />
      )
    }
    return (
      <View style={styles.container}>
        <Text>
          {hasCameraPermissions ? scannedData:"Request for camera permission"}
        </Text>
        <TouchableOpacity
          style = {[styles.button,{marginTop:25}]}
          onPress = {()=>this.getCameraPermissions("scan")}
        >
        <Text style={styles.text}>scan QR Code</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  }
});
