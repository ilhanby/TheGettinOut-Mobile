import React from 'react';
import {StyleSheet} from 'react-native';
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
  CheckBox,
  Toast,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import config from '../../../config';
import axios from 'axios';
import {Formik} from 'formik';
import validations from './validations';

export default class SıgnUp extends React.Component {
  _handleSubmit = async ({userName, eMail, password, notification}, bag) => {
    try {
      notification = notification ? 1 : 0;
      const {data} = await axios.get(
        `${config.API.apiURL}/post_User/${
          config.API.accessToken
        }&name=${userName}&mail=${eMail}&passw=${password}&notification=${notification}`,
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
          text: 'Üyeliğiniz Oluşturuldu',
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
    return (
      <>
        <FastImage
          style={styles.backgroundImage}
          source={config.SignUpColor.imageSource}
          resizeMode={FastImage.resizeMode.cover}
        />

        <Container style={styles.container}>
          <Content ref="_scrollView">
            <Formik
              enableReinitialize={true}
              initialValues={{
                userName: '',
                eMail: '',
                password: '',
                confirmPassword: '',
                notification: true,
              }}
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
                setFieldValue,
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
                    error={errors.userName && touched.userName}>
                    <Icon name="ios-person" style={styles.loginIcon} />
                    <Input
                      returnKeyType={'next'}
                      onSubmitEditing={() => this.eMailRef._root.focus()}
                      placeholder="Kullanıcı Adı"
                      style={styles.loginInput}
                      onChangeText={handleChange('userName')}
                      value={values.userName}
                      onBlur={() => setFieldTouched('userName')}
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      keyboardType={'default'}
                    />
                    {errors.userName && touched.userName && (
                      <Icon name="warning" style={{color: 'red'}} />
                    )}
                  </Item>
                  <Item
                    rounded
                    style={[styles.loginItem, {marginBottom: 0}]}
                    error={errors.eMail && touched.eMail}>
                    <Icon name="ios-mail" style={styles.loginIcon} />
                    <Input
                      ref={ref => (this.eMailRef = ref)}
                      onSubmitEditing={() => this.passwordRef._root.focus()}
                      returnKeyType={'next'}
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
                  <View style={styles.warningView}>
                    <Label style={styles.warningLabel}>
                      Onay kodu bu adrese gönderilecek
                    </Label>
                  </View>
                  <Item
                    rounded
                    style={[styles.loginItem, {marginBottom: 0}]}
                    error={errors.password && touched.password}>
                    <Icon
                      name="user-secret"
                      type="Fontisto"
                      style={styles.loginIcon}
                    />
                    <Input
                      ref={ref => (this.passwordRef = ref)}
                      onSubmitEditing={() =>
                        this.confirmPasswordRef._root.focus()
                      }
                      returnKeyType={'next'}
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
                  <View style={styles.warningView}>
                    <Label style={styles.warningLabel}>
                      0 ile 6 Karakter arasında
                    </Label>
                  </View>
                  <Item
                    rounded
                    style={styles.loginItem}
                    error={errors.confirmPassword && touched.confirmPassword}>
                    <Icon
                      name="user-secret"
                      type="Fontisto"
                      style={styles.loginIcon}
                    />
                    <Input
                      ref={ref => (this.confirmPasswordRef = ref)}
                      returnKeyType={'go'}
                      placeholder="Şifre Tekrarı"
                      style={styles.loginInput}
                      onChangeText={handleChange('confirmPassword')}
                      value={values.confirmPassword}
                      onBlur={() => setFieldTouched('confirmPassword')}
                      autoCapitalize={'none'}
                      secureTextEntry={true}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <Icon name="warning" style={{color: 'red'}} />
                    )}
                  </Item>
                  <Item
                    style={[styles.loginItem, {padding: 10}]}
                    onChangeText={handleChange('notification')}>
                    <CheckBox
                      color="tomato"
                      checked={values.notification}
                      onPress={() =>
                        setFieldValue('notification', !values.notification)
                      }
                    />
                    <Label style={[styles.warningLabel, {marginLeft: 20}]}>
                      Mail hesabın aracılığı ile bilgilendirilmek ister misin?
                    </Label>
                  </Item>
                  <Button
                    block
                    warning
                    style={styles.loginButton}
                    disabled={!isValid || isSubmitting}
                    onPress={handleSubmit}>
                    <Label style={{color: 'white'}}>Kayıt</Label>
                  </Button>
                </Card>
              )}
            </Formik>
          </Content>
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
    padding: 25,
    marginBottom: 0,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: config.SignUpColor.imageColor,
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
    backgroundColor: config.SignUpColor.card,
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
    color: config.SignUpColor.activeTintColor,
    opacity: 0.4,
  },
  warningView: {
    padding: 5,
    alignItems: 'flex-end',
    width: '100%',
  },
  warningLabel: {
    color: 'tomato',
    fontSize: 13,
  },
});
