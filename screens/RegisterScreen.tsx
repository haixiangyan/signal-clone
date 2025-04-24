import { useNavigation } from '@react-navigation/native';
import { Text, Input, Button } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { auth } from 'firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    });
  }, [navigation]);

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(authUser.user, {
          displayName: name,
          photoURL:
            imageUrl || 'https://cancup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        });
        console.log('authUser', authUser);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 items-center justify-center bg-white p-10">
      <StatusBar style="light" />

      <Text h3>Create a signal account</Text>

      <View className="mt-10">
        <Input
          containerStyle={styles.inputContainer}
          value={name}
          onChangeText={setName}
          placeholder="Full name"
          autoFocus
        />
        <Input
          containerStyle={styles.inputContainer}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <Input
          containerStyle={styles.inputContainer}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <Input
          containerStyle={styles.inputContainer}
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="Profile picture"
          onSubmitEditing={register}
        />
      </View>

      <Button containerStyle={styles.button} raised title="Register" onPress={register} />
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

export default RegisterScreen;
