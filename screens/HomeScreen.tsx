import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/base';
import CustomListItem from 'components/CustomListItem';
import { auth } from 'firebase';
import { useLayoutEffect } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const signoutUser = () => {
    auth.signOut().then(() => {
      navigation.dispatch(StackActions.replace('Login'));
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
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
