import { ListItem, Avatar } from '@rneui/base';

interface Props {
  id: string;
  chatName: string;
  enterChat: () => void;
}

const CustomListItem = (props: Props) => {
  const { id, chatName, enterChat } = props;

  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri: 'https://avatars.githubusercontent.com/u/14303404?u=cac2abfbc83c6a39752f653c8566d56e2be13219&v=4&size=80',
        }}
      />
      <ListItem.Content>
        <ListItem.Title>Youtube Chat</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Onlinesjflsjklfjal sdjkf aklsj dflkaj slkdfjalksjdfljslkjasldjflkajdlfkjalksdjflkajdslkfjals dflajdflk
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};
export default CustomListItem;
