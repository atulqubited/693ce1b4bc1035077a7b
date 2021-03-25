import React, {FC, useState, useEffect} from 'react';
import {
  Header,
  Container,
  View,
  Text,
  Button,
  List,
  ListItem,
  Left,
  Body,
  Title,
} from 'native-base';
import {ActivityIndicator, Linking} from 'react-native';

const API_KEY = 'akeRhEZ7hEgI5oA2hZwW7ANaO0J0yuJ4T5LpysdB';
const API_URL = 'https://api.nasa.gov/neo/rest/v1/neo';

type Props = {
  navigation: any;
  route: any;
};

export const ScreenTwo: FC<Props> = ({navigation, route}) => {
  const [id, setId] = useState(route?.params?.id);
  const [error, setError] = useState('');
  const [details, setDetails] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchAsteroidDetails = () => {
    fetch(`${API_URL}/${id}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setDetails(data);
        setLoading(false);
      })
      .catch(err => {
        setError(`No Asteroid found with this ${id}`);
        setLoading(false);
      });
  };

  const fetchRandomAsteroidDetails = () => {
    fetch(`${API_URL}/browse?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setId(
          data?.near_earth_objects[
            Math.floor(Math.random() * data?.near_earth_objects.length)
          ].id,
        );
      })
      .catch(err => {
        setError('error occur');
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);

    if (id) {
      fetchAsteroidDetails();
    } else {
      fetchRandomAsteroidDetails();
    }
  }, [id]);

  if (error) {
    return (
      <Container>
        <Text>{error}</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Text>Back</Text>
          </Button>
        </Left>
        <Body>
          <Title>Asteroid Details</Title>
        </Body>
      </Header>
      <View style={{padding: 10}}>
        {loading ? (
          <Text>
            <ActivityIndicator size={12} color="#6b6b6b" /> fetching Asteroid
            Details...
          </Text>
        ) : details ? (
          <List>
            <ListItem>
              <Text>Id: {id}</Text>
            </ListItem>
            <ListItem>
              <Text>Name: {details?.name}</Text>
            </ListItem>
            <ListItem onPress={() => Linking.openURL(details?.nasa_jpl_url)}>
              <Text>
                URL:{' '}
                <Text style={{color: '#039af4'}}>{details?.nasa_jpl_url}</Text>
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Is Potentially Hazardous Asteroid:{' '}
                <Text style={{fontSize: 17, color: 'blue'}}>
                  {details?.is_potentially_hazardous_asteroid?.toString()}
                </Text>
              </Text>
            </ListItem>
          </List>
        ) : null}
      </View>
    </Container>
  );
};
