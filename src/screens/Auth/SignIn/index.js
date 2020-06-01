import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
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
import config from '../../../config';
import axios from 'axios';
import {Formik} from 'formik';
import validations from './validations';
import {inject, observer} from 'mobx-react';

@inject('AuthStore')
@observer
export default class SignIn extends React.Component {
  _handleSubmit = async ({eMail, password}, bag) => {
    try {
      const {AuthStore} = this.props;
      const {data} = await axios.get(
        `${config.API.apiURL}/get_User/${
          config.API.accessToken
        }&mail=${eMail}&passw=${password}`,
      );
      bag.setSubmitting(false);
      if (!data.header.status) {
        Toast.show({
          text: data.header.message,
          position: 'center',
          duration: 1500,
          type: 'danger',
        });
      } else {
        data.body = data.body[0];
        Toast.show({
          text: 'Giriş Başarılı',
          position: 'center',
          duration: 1500,
          type: 'warning',
        });
        setTimeout(() => {
          bag.resetForm();
          if (data.body.verified == 0)
            this.props.navigation.navigate('VerifiedMail', {
              id: data.body.Id,
              token: data.body._token,
              mail: eMail,
            });
          else {
            AuthStore.saveToken(data.body._token, data.body);
            this.props.navigation.navigate('Loading');
          }
        }, 1600);
      }
    } catch (e) {
      bag.setSubmitting(false);
      console.log(e);
    }
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <>
        <FastImage
          style={styles.backgroundImage}
          source={config.SignUpColor.imageSource}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Container style={styles.container}>
          <Formik
            enableReinitialize={true}
            initialValues={{eMail: '', password: ''}}
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
                    returnKeyType={'next'}
                    onSubmitEditing={() => this.passwordRef._root.focus()}
                    placeholder="E-Mail"
                    style={styles.loginInput}
                    onChangeText={handleChange('eMail')}
                    value={values.eMail}
                    onBlur={() => setFieldTouched('eMail')}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                  />
                  {errors.eMail && touched.eMail && (
                    <Icon name="warning" style={{color: 'red'}} />
                  )}
                </Item>
                <Item
                  rounded
                  style={styles.loginItem}
                  error={errors.password && touched.password}>
                  <Icon
                    name="user-secret"
                    type="Fontisto"
                    style={styles.loginIcon}
                  />
                  <Input
                    ref={ref => (this.passwordRef = ref)}
                    returnKeyType={'go'}
                    placeholder="Şifre"
                    style={styles.loginInput}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    onBlur={() => setFieldTouched('password')}
                    autoCapitalize={'none'}
                    secureTextEntry={true}
                  />
                  {errors.password && touched.password && (
                    <Icon name="warning" style={{color: 'red'}} />
                  )}
                </Item>
                <Button
                  block
                  warning
                  style={styles.loginButton}
                  disabled={!isValid || isSubmitting}
                  onPress={handleSubmit}>
                  <Label style={{color: 'white'}}>Giriş</Label>
                </Button>
                <TouchableOpacity
                  style={styles.loginNoPass}
                  onPress={() => navigate('ChangePass')}>
                  <Label style={styles.loginNoPassLab}>Şifremi Unuttum</Label>
                </TouchableOpacity>
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
    padding: 25,
    marginBottom: 0,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: config.SignInColor.imageColor,
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
    backgroundColor: config.SignInColor.card,
    padding: 20,
    paddingTop: 50,
    marginTop: 120,
    marginBottom: 50,
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
    borderColor: config.SignUpColor.borderColor,
  },
  loginInput: {
    textAlignVertical: 'bottom',
  },
  loginIcon: {
    fontSize: 20,
    color: config.SignInColor.activeTintColor,
    opacity: 0.4,
  },
  loginNoPass: {
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  loginNoPassLab: {
    fontSize: 15,
    color: config.SignInColor.noPassColor,
  },
});
