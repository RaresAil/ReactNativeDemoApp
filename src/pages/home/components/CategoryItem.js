/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, Animated} from 'react-native';

import Colors from '../../../styles/Colors';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(props.active ? 1 : 0),
    };

    this.backgroundInterpolation = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.White, Colors.Primary],
    });
    this.textInterpolation = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.Black, Colors.White],
    });
  }

  #onItemSelect = () => {
    this.props.onClick(this.props.name);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      Animated.timing(this.state.animation, {
        toValue: this.props.active ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }

  render() {
    return (
      <Animated.View
        style={[
          this.#style.view,
          {backgroundColor: this.backgroundInterpolation},
          {marginLeft: this.props.index === 0 ? 20 : 0},
          {marginRight: this.props.index === this.props.lastIndex ? 20 : 8},
        ]}>
        <TouchableHighlight
          style={this.#style.touch}
          underlayColor="none"
          onPress={this.#onItemSelect}>
          <View>
            <Animated.Text
              style={[
                this.#style.text,
                {
                  color: this.textInterpolation,
                },
              ]}>
              {this.props.name}
            </Animated.Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  }

  #style = StyleSheet.create({
    view: {
      height: 50,
      width: 100,
      borderColor: Colors.Gray,
      borderWidth: 1.5,
      overflow: 'hidden',
      borderRadius: 100,
    },
    touch: {
      flex: 1,
      backgroundColor: Colors.None,
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      width: 10,
      height: 10,
    },
    text: {
      fontSize: 14,
      fontWeight: '500',
    },
  });
}
