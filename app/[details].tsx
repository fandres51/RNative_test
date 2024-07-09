import React from "react";
import ConfirmationModal from "@/components/ConfirmationModal";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
import { Product } from "@/models/product";
import { urlString } from "@/api/url";

export default function Details() {

  const prod: Product = useLocalSearchParams() as unknown as Product;
  const [modalVisible, setModalVisible] = React.useState(false);

  function deleteItem(): void {
    fetch(`${urlString}/products/?id=${prod.id}`, { 
        method: 'DELETE',
        headers: {
          'authorId': '1'
        }
      })
      .then(res => console.log(res))
      .catch(error => console.error(error))
      .finally(() => {
        router.navigate('/');
      });
  }

  function goToEdit(): void {
    router.push({
      pathname: '/update',
      params: {
        id: prod.id,
        name: prod.name,
        description: prod.description,
        logo: prod.logo,
        date_release: String(prod.date_release),
        date_revision: String(prod.date_revision)
      }
    });
  }

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.title}>{prod.id}</Text>
          <Text style={styles.subtitle}>Información extra</Text>
        </View>
        <View style={styles.dataSegment}>
          <Text>Nombre:</Text>
          <Text style={styles.data}>{prod.name}</Text>
        </View>
        <View style={styles.dataSegment}>
          <Text>Descripción:</Text>
          <Text style={styles.data}>{prod.description}</Text>
        </View>
        <View style={styles.dataSegment}>
          <Text>Logo:</Text>
          {/* <Text style={styles.data}>{prod.logo}</Text> */}
        </View>
        <View style={styles.image}>
          <Image source={require('../assets/images/visa.png')} style={{ width: 200, height: 100 }} />
        </View>
        <View style={styles.dataSegment}>
          <Text>Fecha de liberación:</Text>
          <Text style={styles.data}>{String(prod.date_release)}</Text>
        </View>
        <View style={styles.dataSegment}>
          <Text>Fecha de revisión:</Text>
          <Text style={styles.data}>{String(prod.date_revision)}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => goToEdit()}>
          <View style={[styles.button, { backgroundColor: '#e9ecf3' }]}>
            <Text>Editar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={[styles.button, { backgroundColor: '#d50707' }]}>
            <Text style={{ color: 'white' }}>Eliminar</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ConfirmationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        name={prod.name}
        onConfirm={deleteItem}
      ></ConfirmationModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 30,
    justifyContent: 'space-between'
  },
  dataSegment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    marginHorizontal: 16
  },
  title: {
    fontSize: 35,
    marginTop: 32
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 64
  },
  data: {
    fontSize: 15,
    fontWeight: 'bold',
    maxWidth: 210,
    textAlign: "right"
  },
  button: {
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    marginTop: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32
  }
})
