import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {observer, inject} from 'mobx-react';

@inject('AuthStore')
@observer
export default class Loading extends React.Component {
  async asyncFunc() {
    await this.props.AuthStore.setupAuth();
    if (this.props.AuthStore.isLogin)
      this.props.navigation.navigate('HomeScreen');
    else this.props.navigation.navigate('AuthScreen');
  }
  
  render() {
    const unsubscribe = this.props.navigation.addListener('focus', e => {
      this.asyncFunc();
    });
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
