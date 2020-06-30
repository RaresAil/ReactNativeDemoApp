import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import ProductItem from './ProductItem';

export default class Categories extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.#style.view}>
        <FlatList
          onScroll={this.props.onScroll}
          scrollEventThrottle={this.props.scrollEventThrottle}
          keyExtractor={(_, index) => `PROD_${index}`}
          contentContainerStyle={this.#style.list}
          ListHeaderComponent={this.props.header}
          data={this.props.data}
          numColumns={2}
          renderItem={({item, index}) => {
            return <ProductItem data={item} />;
          }}
          ListFooterComponent={this.props.footer}
        />
      </View>
    );
  }

  #style = StyleSheet.create({
    view: {
      flex: 1,
    },
    list: {
      paddingBottom: 30,
    },
  });
}
