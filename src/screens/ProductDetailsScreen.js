import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { CartContext } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';

const ProductDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);

  // Safe product access
  const product = route?.params?.product;

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigation.navigate('MainTabs', {
      screen: 'Cart',
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.image} />

        <View style={styles.details}>
          <Text style={styles.name}>{product.name}</Text>

          <Text style={styles.price}>₹ {product.price}</Text>

          <Text style={styles.rating}>⭐ {product.rating}</Text>

          <Text style={styles.sectionTitle}>Product Description</Text>

          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Bottom Add to Cart */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },

  details: {
    padding: 15,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  price: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 8,
  },

  rating: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },

  description: {
    fontSize: 15,
    color: '#444',
    marginTop: 5,
    lineHeight: 22,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },

  cartButton: {
    backgroundColor: '#111110',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  cartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
