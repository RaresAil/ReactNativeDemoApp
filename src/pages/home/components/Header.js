import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../../styles/Colors';

export default class HomeNav extends Component {
  render() {
    return (
      <View>
        <SafeAreaView>
          <View style={this.#style.header}>
            <Text style={this.#style.title}>Order</Text>
            <Button
              icon={
                <Icon
                  name="ios-search"
                  size={this.#fontSize.button}
                  color={Colors.Black}
                />
              }
              title=""
              type="clear"
              onPress={() => {}}
              containerStyle={this.#style.buttonLeft}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  #fontSize = {
    button: 36,
  };

  #style = StyleSheet.create({
    header: {
      flexDirection: 'row',
      paddingTop: 20,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 38,
      fontWeight: '600',
      color: Colors.Black,
    },
    buttonLeft: {
      marginLeft: 'auto',
    },
  });
}
