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
import config from '../../../config';
import axios from 'axios';
import {Formik} from 'formik';
import validations from './validations';
import {inject, observer} from 'mobx-react';

@inject('AuthStore')
@observer
export default class VerifiedMail extends React.Component {
  _handleSubmit = async ({eMailVerified}, bag) => {
    try {
      const {AuthStore} = this.props;
      const params = this.props.route.params;
      const {data} = await axios.get(
        `${config.API.apiURL}/post_UserVerified/${config.API.accessToken}&id=${
          params.id
        }&verified=${eMailVerified}`,
      );
      if (!data.header.status) {
        Toast.show({
          text: data.header.message,
          position: 'center',
          duration: 1500,
          type: 'danger',
        });
        return false;
      } else {
        Toast.show({
          text: 'Üyeliğiniz Onaylandı',
          position: 'center',
          duration: 1500,
          type: 'warning',
        });
        setTimeout(() => {
          AuthStore.saveToken(params.token);
          this.props.navigation.navigate('Loading');
          bag.setSubmitting(false);
        }, 1600);
      }
    } catch (e) {
      bag.setSubmitting(false);
      console.log(e);
    }
  };
  _sendMail = async () => {
    try {
      const params = this.props.route.params;
      const {data} = await axios.get(
        `${config.API.apiURL}/userVerifiedCode/${config.API.accessToken}&mail=${
          params.mail
        }`,
      );
      if (!data.header.status) {
        Toast.show({
          text: data.header.message,
          position: 'center',
          duration: 1500,
          type: 'danger',
        });
        return false;
      } else {
        Toast.show({
          text: 'Mail Gönderildi',
          position: 'center',
          duration: 1500,
          type: 'warning',
        });
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
          source={config.ChangePass.imageSource}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Container style={styles.container}>
          <Formik
            enableReinitialize={true}
            initialValues={{eMailVerified: ''}}
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
                <View style={styles.warningView}>
                  <Label style={styles.warningLabel}>
                    Mail Adresinize Gönderildi
                  </Label>
                </View>
                <Item
                  rounded
                  style={styles.loginItem}
                  error={errors.eMailVerified && touched.eMailVerified}>
                  <Icon
                    name="user-secret"
                    type="Fontisto"
                    style={styles.loginIcon}
                  />
                  <Input
                    style={styles.loginInput}
                    placeholder="Onay Kodu"
                    onChangeText={handleChange('eMailVerified')}
                    value={values.eMailVerified}
                    onBlur={() => setFieldTouched('eMailVerified')}
                    autoCapitalize={'none'}
                    keyboardType={'numeric'}
                  />
                  {errors.eMailVerified && touched.eMailVerified && (
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
                <TouchableOpacity
                  style={styles.loginNoPass}
                  onPress={() => {
                    this._sendMail();
                  }}>
                  <Label style={styles.loginNoPassLab}>
                    Onay Kodunu Tekrar Gönder
                  </Label>
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
  warningView: {
    padding: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  warningLabel: {
    color: 'tomato',
    fontSize: 14,
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
