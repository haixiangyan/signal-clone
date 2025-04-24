import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from '@rneui/base';
import { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ChatScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();

  const { chatId, chatName } = params as any;

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
    });
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Chat Screen</Text>
    </View>
  );
};

export default ChatScreen;
