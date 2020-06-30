import React, {Component} from 'react';
import {
  StyleSheet,
  Animated,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

import Colors from '../../../styles/Colors';

export default class Categories extends Component {
  constructor(props) {
    super(props);

    this.screenWidth = Dimensions.get('window').width;
    this.iconSize = parseInt(this.screenWidth / 2 - 20, 10);
  }

  render() {
    const {name, icon, price, currency} = this.props.data;
    return (
      <View style={this.#style.view}>
        <Animated.View style={this.#style.contentView}>
          <View style={this.#style.imageView}>
            <Image
              style={[
                this.#style.icon,
                {height: this.iconSize - 40, width: this.iconSize},
              ]}
              source={icon}
            />
          </View>
          <View style={this.#style.dataView}>
            <Text style={this.#style.title}>{name}</Text>
            <Text style={this.#style.price}>
              {price} {currency}
            </Text>
          </View>
        </Animated.View>
      </View>
    );
  }

  #style = StyleSheet.create({
    view: {
      backgroundColor: Colors.None,
      flex: 0.5,
      padding: 10,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    contentView: {
      backgroundColor: Colors.None,
      width: '100%',
      minHeight: 250,
      overflow: 'hidden',
      alignItems: 'center',
    },
    imageView: {
      backgroundColor: Colors.LightGray,
      paddingVertical: 20,
      borderRadius: 30,
      overflow: 'hidden',
    },
    icon: {
      resizeMode: 'contain',
    },
    dataView: {
      paddingTop: 10,
      paddingHorizontal: 15,
    },
    title: {
      fontSize: 16,
      textAlign: 'center',
      color: Colors.DarkGray,
      fontWeight: '500',
    },
    price: {
      paddingTop: 16,
      fontSize: 18,
      textAlign: 'center',
      color: Colors.Black,
      fontWeight: '700',
    },
  });
}
