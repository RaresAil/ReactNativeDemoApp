import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
// import {Button} from 'react-native-elements';

// import Icon from 'react-native-vector-icons/FontAwesome';
// import Colors from '../../../styles/Colors';

import Category from './CategoryItem';

export default class Categories extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `CAT${index}`}
          horizontal={true}
          data={['All', ...this.props.data]}
          contentContainerStyle={this.#style.list}
          renderItem={({item, index}) => {
            return (
              <Category
                name={item}
                active={this.props.selected === item}
                onClick={this.props.onSelect}
                index={index}
                lastIndex={this.props.data.length - 1}
              />
            );
          }}
        />
      </View>
    );
  }

  #style = StyleSheet.create({
    list: {
      height: 100,
      alignItems: 'center',
    },
  });
}
