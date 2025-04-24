import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/base';
import CustomListItem from 'components/CustomListItem';
import { auth, db } from 'firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useLayoutEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState<any[]>([]);

  const signoutUser = () => {
    auth.signOut().then(() => {
      navigation.dispatch(StackActions.replace('Login'));
    });
  };

  useEffect(() => {
    return onSnapshot(query(collection(db, 'chats')), (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  console.log('chats', chats);

  const enterChat = (id: string, chatName: string) => {
    navigation.navigate('Chat', {
      id,
      chatName,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Singal',
      headerStyle: { backgroundColor: 'white' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      headerLeft: () => (
        <View className="ml-5">
          <TouchableOpacity onPress={signoutUser}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL || '' }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View className="mr-5 w-20 flex-row justify-between">
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('AddChat')}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView className="h-full">
        {chats.map((chat: any) => (
          <CustomListItem
            key={chat.id}
            id={chat.id}
            chatName={chat.data.chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
