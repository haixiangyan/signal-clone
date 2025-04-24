import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from 'firebase';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { useLayoutEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const ChatScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();

  const { id, chatName } = params as any;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  useLayoutEffect(() => {
    return onSnapshot(
      query(collection(db, 'chats', id, 'messages'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }
    );
  }, [navigation]);

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
              uri:
                messages[0]?.data.photoURL ||
                'https://avatars.githubusercontent.com/u/97029705?v=4&size=80',
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
  }, [navigation, messages]);

  const sendMessage = () => {
    Keyboard.dismiss();

    addDoc(collection(db, 'chats', id, 'messages'), {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser?.displayName,
      photoURL: auth.currentUser?.photoURL,
      email: auth.currentUser?.email,
    });

    setInput('');
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <StatusBar style="light" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="h-full w-full flex-1"
        keyboardVerticalOffset={90}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="h-full">
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser?.email ? (
                  <View
                    key={id}
                    className="relative mb-5 mr-4 max-w-[80%] self-end rounded-xl bg-[#ECECEC] p-4">
                    <Avatar
                      containerStyle={{ position: 'absolute', bottom: -15, right: -5 }}
                      size={30}
                      rounded
                      source={{ uri: data.photoURL }}
                    />
                    <Text className="ml-2 font-medium color-black">{data.message}</Text>
                  </View>
                ) : (
                  <View
                    key={id}
                    className="relative m-4 max-w-[80%] self-start rounded-xl bg-[#2B68E6] p-4">
                    <Avatar
                      containerStyle={{ position: 'absolute', bottom: -15, left: -5 }}
                      size={30}
                      rounded
                      source={{ uri: data.photoURL }}
                    />
                    <Text className="mb-4 ml-2 font-medium color-white">{data.message}</Text>
                    <Text className="left-2 pr-2 text-xs font-light color-white">
                      {data.displayName}
                    </Text>
                  </View>
                )
              )}
            </ScrollView>

            <View className="w-full flex-row items-center p-4">
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Signal Message"
                className="bottom-0 mr-4 h-12 flex-1 rounded-full border-none bg-[#ECECEC] p-3 color-gray-500"
                onEndEditing={sendMessage}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage} className="">
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
