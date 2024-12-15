import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Linking, Keyboard, TouchableWithoutFeedback } from 'react-native';

const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [price, setPrice] = useState('');

  const makeUSSDCall = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter a phone number.');
      return;
    }

    if (!price.trim()) {
      Alert.alert('Error', 'Please enter a price.');
      return;
    }

    // Encode the USSD code dynamically
    const ussdCode = `%237115%2A7%2A${encodeURIComponent(phoneNumber)}%2A${encodeURIComponent(price)}%23`;
    const url = `tel:${ussdCode}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'USSD not supported on this device');
      }
    } catch (error) {
      Alert.alert('Error', `Something went wrong: ${error.message}`);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>SSD Phone Call</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter your phone number"
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          keyboardType="numeric"
          placeholder="Enter your price"
          style={styles.input}
          value={price}
          onChangeText={setPrice}
        />
        <View style={styles.btn}>
          <Button title="Make A Call" onPress={makeUSSDCall} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeefff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    backgroundColor: 'yellow',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: 'gray',
    color: 'black',
    fontSize: 18,
    borderRadius: 8,
  },
  btn: {
    width: '90%',
    marginTop: 10,
  },
});
