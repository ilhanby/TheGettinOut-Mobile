import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Container,
  Icon,
  Card,
  Item,
  Label,
  Input,
  Button,
  View,
  Toast,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import config from '../../../config';
import {Formik} from 'formik';
import validations from './validations';

export default class ChangePass extends React.Component {
  _handleSubmit = async ({eMail}, bag) => {
    try {
      const {data} = await axios.get(
        `${config.API.apiURL}/userForgotPass/${
          config.API.accessToken
        }&mail=${eMail}`,
      );
      bag.setSubmitting(false);
      if (!data.header.status) {
        Toast.show({
          text: data.header.message,
          position: 'center',
          duration: 2000,
          type: 'danger',
        });
      } else {
        Toast.show({
          text: 'Mail Gönderildi',
          position: 'center',
          duration: 1500,
          type: 'warning',
        });
        setTimeout(() => {
          bag.resetForm();
          this.props.navigation.navigate('Loading');
        }, 1600);
      }
    } catch (e) {
      bag.setSubmitting(false);
      console.log(e);
    }
  };
  render() {
    const {goBack} = this.props.navigation;
    return (
      <>
        <FastImage
          style={styles.backgroundImage}
          source={config.ChangePass.imageSource}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Container style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
            <Icon name="ios-arrow-back" style={{color: 'white'}} />
          </TouchableOpacity>
          <Formik
            enableReinitialize={true}
            initialValues={{eMail: ''}}
            validationSchema={validations}
            onSubmit={this._handleSubmit}
            validateOnChange={true}>
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              setFieldTouched,
              isValid,
              isSubmitting,
            }) => (
              <Card style={styles.loginCard}>
                <View style={styles.logoView}>
                  <FastImage
                    style={styles.logo}
                    source={config.API.logo}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </View>

                <Item
                  rounded
                  style={styles.loginItem}
                  error={errors.eMail && touched.eMail}>
                  <Icon name="ios-mail" style={styles.loginIcon} />
                  <Input
                    style={styles.loginInput}
                    placeholder="E-Mail"
                    onChangeText={handleChange('eMail')}
                    value={values.email}
                    onBlur={() => setFieldTouched('eMail')}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                  />
                  {errors.eMail && touched.eMail && (
                    <Icon name="warning" style={{color: 'red'}} />
                  )}
                </Item>

                <Button
                  block
                  warning
                  style={styles.loginButton}
                  disabled={!isValid || isSubmitting}
                  onPress={handleSubmit}>
                  <Label style={{color: 'white'}}>Gönder</Label>
                </Button>
              </Card>
            )}
          </Formik>
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: config.ChangePass.imageColor,
    opacity: 0.25,
  },
  logoView: {
    height: 150,
    width: 150,
    position: 'absolute',
    top: -110,
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  loginCard: {
    alignItems: 'center',
    borderColor: 'transparent',
    backgroundColor: config.ChangePass.card,
    width: '85%',
    padding: 20,
    paddingTop: 50,
  },
  loginItem: {
    opacity: 1,
    backgroundColor: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  loginButton: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: config.ChangePass.borderColor,
  },
  loginInput: {
    textAlignVertical: 'bottom',
  },
  loginIcon: {
    fontSize: 20,
    color: config.ChangePass.activeTintColor,
    opacity: 0.4,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
});
