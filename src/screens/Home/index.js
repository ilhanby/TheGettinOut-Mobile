import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Text,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Item,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import config from '../../config';
import {observer, inject} from 'mobx-react';

@inject('DataStore')
@observer
export default class Home extends React.Component {
  componentDidMount() {
    this.props.DataStore.getEvent();
  }

  handleSubmit = item => {
    alert(item);
  };

  renderLoadMore = async () => {
    const {DataStore} = this.props;
    DataStore.loadingChanged(true);
    await DataStore.pageIncrement();
    await DataStore.getEvent();
  };

  renderItem = ({item}) => {
    if (item != undefined)
      return (
        <TouchableOpacity
          onPress={() => this.handleSubmit(item)}
          style={{paddingHorizontal: 2, paddingVertical: 10}}>
          <Card style={styles.card}>
            <CardItem cardBody>
              <FastImage
                style={{height: 280, width: null, flex: 1}}
                source={{
                  uri: config.HomeColor.cardImageUri + item.image1,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </CardItem>
            <CardItem style={styles.cardHeader}>
              <View style={styles.cardHeaderView}>
                <Text style={styles.cardHeaderText}>{item.name}</Text>
              </View>
            </CardItem>
            <CardItem style={styles.cardTime}>
              <View style={{width: '80%'}}>
                <Text style={styles.cardText}>
                  {item.date} - {item.time}
                </Text>
              </View>
              <View style={{width: '20%', alignItems: 'flex-end'}}>
                <Icon
                  name="clock"
                  type="FontAwesome5"
                  style={styles.cardIcon}
                />
              </View>
            </CardItem>
            <CardItem style={styles.cardLocation}>
              <View style={{width: '80%'}}>
                <Text style={styles.cardText}>{item.konum}</Text>
              </View>
              <View style={{width: '20%', alignItems: 'flex-end'}}>
                <Icon name="location" type="Entypo" style={styles.cardIcon} />
              </View>
            </CardItem>
            <CardItem style={styles.card}>
              <Text
                numberOfLines={3}
                style={[styles.cardText, {fontWeight: 'normal'}]}>
                {item.description}
              </Text>
            </CardItem>
            <CardItem style={[styles.card, styles.border]}>
              <Left>
                <Button transparent>
                  <Icon
                    style={[
                      styles.cardIcon,
                      {color: config.HomeColor.bottomIconColor},
                    ]}
                    name="thumbs-up"
                  />
                  <Text style={[styles.cardText]}>12</Text>
                </Button>
              </Left>
              <Right>
                <Button transparent>
                  <Icon
                    style={[
                      styles.cardIcon,
                      {color: config.HomeColor.bottomIconColor},
                    ]}
                    name="chatbubbles"
                  />
                  <Text style={styles.cardText}>4</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </TouchableOpacity>
      );
  };

  renderFooter = () => {
    const {DataStore} = this.props;
    if (!DataStore.isLoading) return <View style={{paddingVertical: 10}} />;
    return (
      <View style={{paddingVertical: 10}}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  };

  render() {
    const {DataStore} = this.props;
    return (
      <>
        <FastImage
          style={styles.backgroundImage}
          source={config.HomeColor.backgroundImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Container style={styles.container}>
          <FlatList
            style={{marginBottom: 50}}
            ListFooterComponent={this.renderFooter}
            data={DataStore.allEvents}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
            onEndReached={async () => this.renderLoadMore()}
            onEndReachedThreshold={0.2}
          />
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: config.SignInColor.imageColor,
  },
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {backgroundColor: config.HomeColor.background},
  cardHeader: {
    backgroundColor: config.HomeColor.background,
    borderBottomColor: config.HomeColor.borderBottomColor,
    borderBottomWidth: 0.5,
  },
  cardHeaderText: {
    backgroundColor: 'transparent',
    fontSize: 21,
    color: config.HomeColor.iconColor,
    paddingVertical: 5,
  },
  cardTime: {
    backgroundColor: config.HomeColor.background,
    marginBottom: 0,
    paddingBottom: 0,
  },
  cardLocation: {
    marginTop: 0,
    backgroundColor: config.HomeColor.background,
    borderBottomColor: config.HomeColor.borderBottomColor,
    borderBottomWidth: 0.2,
  },
  cardText: {
    color: config.HomeColor.cardTextColor,
    fontWeight: 'bold',
    fontSize: 17,
  },
  border: {
    borderTopColor: config.HomeColor.borderBottomColor,
    borderTopWidth: 0.2,
  },
  cardIcon: {color: config.HomeColor.iconColor, fontSize: 25},
});
