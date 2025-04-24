import { ListItem, Avatar } from '@rneui/base';
import { db } from 'firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface Props {
  id: string;
  chatName: string;
  enterChat?: (id: string, chatName: string) => void;
}

const CustomListItem = (props: Props) => {
  const { id, chatName, enterChat } = props;

  const [chatMessages, setChatMessages] = useState<any>([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, 'chats', id, 'messages'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setChatMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }
    );
  }, []);

  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat?.(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages[0]?.data.photoURL ||
            'https://avatars.githubusercontent.com/u/97029705?v=4&size=80',
        }}
      />
      <ListItem.Content>
        <ListItem.Title className="font-bold">{chatName}</ListItem.Title>
        {chatMessages.length > 0 && (
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {chatMessages[0]?.data.displayName}: {chatMessages[0]?.data.message}
          </ListItem.Subtitle>
        )}
      </ListItem.Content>
    </ListItem>
  );
};
export default CustomListItem;
