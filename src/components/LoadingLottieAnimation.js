import React, {Component} from 'react';
import LottieView from 'lottie-react-native';

export default class LoadingLottieAnimation extends Component {
  render() {
    return <LottieView source={require('../assets/lottie_animations/loading_circle_gray.json')} autoPlay loop />;
  }
}