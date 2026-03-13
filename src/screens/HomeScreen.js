import React, { useContext, useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { products } from '../data/products';
import { categories } from '../data/categories';
import { banners } from '../data/banners';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';

import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import Banner from '../components/Banner';

const HomeScreen = ({ navigation }) => {
  const { wishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Home',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Wishlist')}
          style={{ marginRight: 15 }}
        >
          <View>
            <Text style={{ fontSize: 28,paddingHorizontal:7}}>❤️</Text>
            {wishlist.length > 0 && (
              <View style={styles.wishlistBadge}>
                <Text style={styles.wishlistBadgeText}>
                  {wishlist.length}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, wishlist]);

  const renderHeader = () => (
    <View>
      {/* BANNERS */}
      <FlatList
        data={banners}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Banner item={item} navigation={navigation} />}
      />

      {/* SEARCH BAR */}
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => navigation.navigate('Search', { products })}
      >
        <Icon name="search" size={18} color="gray" />
        <Text style={styles.searchText}>Search for products</Text>
      </TouchableOpacity>

      {/* CATEGORIES */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryCard item={item} navigation={navigation} />
        )}
      />

      <Text style={styles.sectionTitle}>Featured Products</Text>
    </View>
  );

  return (
    <FlatList
      data={products.slice(0, 6)}
      numColumns={2}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <ProductCard item={item} addToCart={addToCart} />}
      ListHeaderComponent={renderHeader}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginHorizontal: 15,
    marginTop: 10,
    paddingHorizontal: 12,
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  searchText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#777',
  },
  wishlistBadge: {
    position: 'absolute',
    right: -2,
    top: -2,
    backgroundColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 5,
    minWidth: 18,
    alignItems: 'center',
  },
  wishlistBadgeText: {
    color: 'white',
    fontSize:10,
  },
});