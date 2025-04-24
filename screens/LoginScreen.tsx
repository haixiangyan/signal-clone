import { StackActions, useNavigation } from '@react-navigation/native';
import { Button, Input, Image } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { auth } from 'firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const signIn = () => {
    console.log('signIn', email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      console.log('login user', user);
      if (user) {
        navigation.dispatch(StackActions.replace('Home'));
      }
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      className="flex-1 items-center justify-center p-10">
      <StatusBar style="light" />

      <Image
        source={{
          uri: 'https://play-lh.googleusercontent.com/FtGKSwVtpmMxKoJrJuI837DkYGRsqlMdiVPAd8bomLQZ3_Hc55XokY_dYdXKgGagiYs',
        }}
        style={{ height: 200, width: 200 }}
      />
      <View className="">
        <Input
          containerStyle={styles.inputContainer}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoFocus
          keyboardType="email-address"
        />
        <Input
          containerStyle={styles.inputContainer}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onSubmitEditing={signIn}
        />
      </View>

      <Button containerStyle={styles.button} title="Login" onPress={signIn} />
      <Button
        containerStyle={styles.button}
        type="outline"
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />

      <View className="h-100" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});

export default LoginScreen;
