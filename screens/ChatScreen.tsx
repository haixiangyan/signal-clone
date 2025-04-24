import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { useLayoutEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();

  const { chatId, chatName } = params as any;

  const [input, setInput] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chats',
      headerTitleAlign: 'left',
      headerBackTitle: '',
      headerTitle: () => (
        <View className="ml-5 flex-row items-center">
          <Avatar
            rounded
            source={{
              uri: 'https://avatars.githubusercontent.com/u/7212311?u=f08f2cf31763895b89c799b18246640522a19ea2&v=4&size=80',
            }}
          />
          <Text className="ml-2 text-xl font-bold color-white">{chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity className="ml-2" onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="mr-5 w-20 flex-row justify-between">
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const sendMessage = () => {
    // TODO: send message to firebase
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <StatusBar style="light" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="w-full flex-1"
        keyboardVerticalOffset={90}>
        <>
          <ScrollView />
          <View className="w-full flex-row items-center p-4">
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Signal Message"
              className="bottom-0 mr-4 h-12 flex-1 rounded-full border-none bg-[#ECECEC] p-3 color-gray-500"
            />
            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage} className="">
              <Ionicons name="send" size={24} color="#2B68E6" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
