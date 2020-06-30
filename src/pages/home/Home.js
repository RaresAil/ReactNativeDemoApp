import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

import Header from './components/Header';
import Categories from './components/Categories';
import Products from './components/Products';

import Colors from '../../styles/Colors';
import config from '../../config';

import SAL1Image from '../../images/sal1.png';
import SAL2Image from '../../images/sal2.png';
import SLI1Image from '../../images/slice1.png';
import DRI1Image from '../../images/dri1.png';
import DES1Image from '../../images/des1.png';

class Home extends Component {
  constructor(props) {
    super(props);

    this.defaultProducts = [
      {
        name: 'Vegetable Salad Brocolli',
        category: 'Veges',
        price: '56,11',
        currency: 'RON',
        icon: SAL2Image,
      },
      {
        name: 'Udon with Peanut Dressing',
        category: 'Veges',
        price: '43,15',
        currency: 'RON',
        icon: SAL1Image,
      },
      {
        name: 'Pizza Slice',
        category: 'Snaks',
        price: '6,49',
        currency: 'RON',
        icon: SLI1Image,
      },
      {
        name: 'Café au Lait',
        category: 'Drinks',
        price: '14,99',
        currency: 'RON',
        icon: DRI1Image,
      },
      {
        name: 'Chocolate Cake Slice',
        category: 'Desert',
        price: '9,99',
        currency: 'RON',
        icon: DES1Image,
      },
    ];

    this.state = {
      slideAnimation: new Animated.Value(0),
      bagActive: false,

      selectedCategory: 'All',
      products: this.defaultProducts,
    };

    const screenHeight = Dimensions.get('window').height;

    this.mainViewAnim = this.state.slideAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [125, screenHeight * 0.75],
    });
    this.downViewAnim = this.state.slideAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [
        125 - config.safeAreaInsets.bottom,
        screenHeight * 0.75 - config.safeAreaInsets.bottom,
      ],
    });
  }

  #openBag = () => {
    if (this.state.bagActive) {
      return;
    }
    this.#canScroll = false;

    Animated.timing(this.state.slideAnimation, {
      toValue: 1,
      duration: 750,
      useNativeDriver: false,
      easing: Easing.back(),
    }).start(() => {
      this.#canScroll = true;
    });

    this.setState({
      bagActive: true,
    });
  };

  #lastScroll = 0;
  #canScroll = true;
  #stopEvent = false;
  #mainViewScroll = e => {
    if (!this.state.bagActive || this.#stopEvent || !this.#canScroll) {
      return;
    }

    const scrollY = e.nativeEvent.contentOffset.y;
    if (this.#lastScroll > scrollY || this.#lastScroll < scrollY) {
      this.#stopEvent = true;
      this.setState({
        bagActive: false,
      });
      Animated.timing(this.state.slideAnimation, {
        toValue: 0,
        duration: 750,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }).start(() => {
        this.#stopEvent = false;
      });
    }
    this.#lastScroll = scrollY;
  };

  #updateProducts = products => {
    return products;
  };

  #onCategorySelect = name => {
    const data = [...new Set(this.defaultProducts.map(x => x.category))];
    if (!data.includes(name)) {
      this.setState({
        selectedCategory: 'All',
        products: this.defaultProducts,
      });
      return;
    }

    const foundProducts = this.defaultProducts.filter(x => x.category === name);

    this.setState({
      selectedCategory: name,
      products: foundProducts,
    });
  };

  render() {
    return (
      <>
        <Animated.View
          style={[
            this.#styles.viewMain,
            {
              marginBottom: this.mainViewAnim,
            },
          ]}>
          <Products
            onScroll={this.#mainViewScroll}
            scrollEventThrottle={16}
            header={
              <>
                <Header />
                <Categories
                  onSelect={this.#onCategorySelect}
                  selected={this.state.selectedCategory}
                  data={[...new Set(this.defaultProducts.map(x => x.category))]}
                />
              </>
            }
            data={this.#updateProducts(this.state.products)}
          />
        </Animated.View>
        <View style={this.#styles.viewDown}>
          <TouchableWithoutFeedback onPress={this.#openBag}>
            <SafeAreaView>
              <Animated.View
                style={[
                  this.#styles.downContainer,
                  {
                    height: this.downViewAnim,
                  },
                ]}>
                <Text style={this.#styles.downText}>Your Bag</Text>
              </Animated.View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </View>
      </>
    );
  }

  #styles = StyleSheet.create({
    viewMain: {
      backgroundColor: Colors.White,
      flex: 1,
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,
      position: 'relative',
      zIndex: 1,
      overflow: 'hidden',
    },
    viewDown: {
      backgroundColor: Colors.Black,
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 0,
      flexDirection: 'column-reverse',
    },
    downText: {
      color: Colors.White,
      fontSize: 18,
      fontWeight: '600',
    },
    downContainer: {
      backgroundColor: Colors.None,
      paddingHorizontal: 20,
      paddingTop: (125 - config.safeAreaInsets.bottom) / 2 - 10,
    },
  });
}

export default Home;
