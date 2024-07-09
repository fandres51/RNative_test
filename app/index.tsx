import React from "react";
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Product } from "../models/product";
import { ProductCard } from "../components/ProductCard";
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { urlString } from "@/api/url";

export default function Index() {

  const [isLoading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  useFocusEffect(
    React.useCallback(() => {
      // console.log(`${urlString}/products/`);
      setLoading(true);
      fetch(`${urlString}/products`, {
        headers: {
          'authorId': '1',
        }
      })
      .then((response) => response.json())
      .then((json) => setProducts(json))
      // .then((json) => console.log(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
}, [])
  );

// React.useEffect(() => {
//   fetch("http://10.0.2.2:3002/bp/products")
//     .then((response) => response.json())
//     .then((json) => setProducts(json.data))
//     .catch((error) => console.error(error))
//     .finally(() => setLoading(false));
// }, []);

function showDetails(item: Product) {
  router.push({
    pathname: `/${item.id}`,
    params: {
      id: item.id,
      name: item.name,
      description: item.description,
      logo: item.logo,
      date_release: String(item.date_release),
      date_revision: String(item.date_revision)
    }
  });
}

return (
  <View style={styles.container}>
    {
      isLoading ? <ActivityIndicator style={styles.spinner} size="large" color="#324673" /> :
        <View>
          <FlatList
            data={products.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))}
            renderItem={({ item, index }) => (
              <ProductCard
                name={item.name}
                id={item.id}
                style={
                  index === 0 ? styles.firstCard : {} &&
                    index === products.length - 1 ? styles.lastCard : {}
                }
                onPress={() => showDetails(item)}
              />
            )}
            ListHeaderComponent={
              <TextInput
                style={styles.searchBar}
                placeholder="Search..."
                onChangeText={text => setSearchTerm(text)}
                value={searchTerm}
              />
            }
          ></FlatList>
          <TouchableOpacity onPress={() => router.push('/add')}>
            <View style={styles.addBtn}>
              <Text>Agregar</Text>
            </View>
          </TouchableOpacity>
        </View>
    }
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  firstCard: {
    borderTopWidth: 1,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
  lastCard: {
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8
  },
  data: {
    flexDirection: "column",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 16,
    marginBottom: 32,
    marginTop: 8,
    borderRadius: 8,
    fontSize: 18,
  },
  addBtn: {
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    marginTop: 16,
    backgroundColor: '#ffdd00'
  },
  spinner: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});