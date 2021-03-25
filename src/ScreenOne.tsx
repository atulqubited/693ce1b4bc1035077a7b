import React, {useState, FC} from 'react';
import {
  Header,
  Container,
  View,
  Text,
  Input,
  Button,
  Body,
  Title,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ScreenTwo'
>;

type Props = {
  navigation: ScreenNavigationProp;
};

export const ScreenOne: FC<Props> = ({navigation}) => {
  const [id, setId] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setId('');
    }, []),
  );

  const navigate = () => {
    if (id) {
      navigation.navigate('ScreenTwo', {id});
    } else {
      navigation.navigate('ScreenTwo');
    }
  };

  return (
    <Container>
      <Header>
        <Body>
          <Title>Search Asteroid By Id</Title>
        </Body>
      </Header>
      <View style={{margin: 10, width: '100%', flexDirection: 'row'}}>
        <Input
          placeholder="Enter Asteroid ID"
          onChangeText={setId}
          value={id}
          keyboardType="numeric"
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button onPress={navigate} light={!id} disabled={!id}>
          <Text>Submit</Text>
        </Button>
        <Button onPress={navigate} success>
          <Text>Random Asteroid</Text>
        </Button>
      </View>
    </Container>
  );
};
