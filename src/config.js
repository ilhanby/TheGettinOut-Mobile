/* API ENTEGRATION CONFIG */
const API = {
  apiURL: 'https://www.service.thegettinout.com/theGetti/v1',
  accessToken:
    'SJnF0LoiVE2DCCSvwErIEUK7PskSNhIFgy8tiEh7zqV5mFolnUg2mRo74b8r3Fh4al2YTgN0Ls0YfNMiDDgmkENBwkA96neAFYrc?tok=3YUZ5YUZ',
  mail: 'info@thegettinout.com',
  logo: require('../assets/img/THEGETTINOUT.png'),
};

/* THEME COLOR */
const ThemeColor = {
  card: '#1f283e',
  border: 'tomato',
  text: 'white',
  activeTintColor: 'tomato',
  inactiveTintColor: 'gray',
};
const SignInColor = {
  imageSource: require('../assets/img/tree2.jpg'),
  card: 'rgba(255, 255, 255,0.55)',
  activeTintColor: 'tomato',
  inactiveTintColor: 'gray',
  borderColor: 'gray',
  imageColor: '#000076',
  noPassColor: '#565656',
};
const SignUpColor = {
  imageSource: require('../assets/img/tree2.jpg'),
  card: 'rgba(255, 255, 255,0.55)',
  activeTintColor: 'tomato',
  inactiveTintColor: 'gray',
  borderColor: 'gray',
  imageColor: '#000076',
};

const ChangePass = {
  imageSource: require('../assets/img/tree.jpg'),
  card: 'rgba(255, 255, 255,0.55)',
  activeTintColor: 'tomato',
  inactiveTintColor: 'gray',
  borderColor: 'gray',
  imageColor: '#000076',
};

const HomeColor = {
  backgroundImage: require('../assets/img/back4.jpg'),
  cardImageUri: 'https://www.dash.thegettinout.com/assets/images/uploadFile/',
  background: 'rgba(135, 135, 135,0.6)',
  cardTextColor: 'white',
  iconColor: 'orange',
  bottomIconColor: '#0628FF',
  borderBottomColor: '#008BFF',
};

export default {
  API,
  ThemeColor,
  SignInColor,
  SignUpColor,
  ChangePass,
  HomeColor,
};
