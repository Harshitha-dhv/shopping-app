import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { categories } from '../data/categories';
import CategoryCard from '../components/CategoryCard';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const CategoriesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.heading}>Categories</Text>
      </View>

      {/* Category List */}
      <FlatList
        data={categories}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryCard item={item} navigation={navigation} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});