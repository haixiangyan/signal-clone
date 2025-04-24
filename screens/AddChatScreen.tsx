import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Input } from '@rneui/base';
import { db } from 'firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';

const AddChatScreen = () => {
  const [input, setInput] = useState('');

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new chat',
      headerBackTitle: 'Chats',
    });
  }, [navigation]);

  const createChat = async () => {
    await addDoc(collection(db, 'chats'), {
      chatName: input,
    });

    navigation.goBack();
  };

  return (
    <View className="h-full bg-white p-6">
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={setInput}
        leftIcon={<Icon name="wechat" type="antdesign" size={24} color="black" />}
        onSubmitEditing={createChat}
      />
      <Button disabled={!input} onPress={createChat} title="Create new Chat" />
    </View>
  );
};
export default AddChatScreen;
