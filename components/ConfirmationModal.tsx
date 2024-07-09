import React from "react";
import { Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';

export default function ConfirmationModal(props: any) {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => props.onClose()}
        >
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <View style={styles.cancelIcon}>
                        <Feather name="x" size={24} color="black" onPress={()=>props.onClose()}/>
                    </View>
                    <Text style={styles.modalText}>¿Estás seguro de eliminar el producto {props.name}?</Text>
                    <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: "#ffdd00" }}
                        onPress={() => {
                            props.onConfirm();
                        }}
                    >
                        <Text style={styles.textStyle}>Confirmar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: "#e9ecf3" }}
                        onPress={() => {
                            props.onClose();
                        }}
                    >
                        <Text style={styles.textStyle}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        backgroundColor: "white",
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        padding: 35,
        elevation: 5,
        width: '100%'
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 8,
        padding: 16,
        marginTop: 16
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        paddingVertical: 24,
        marginVertical: 8,
        textAlign: "center",
        fontSize: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#d9d9d9'
    },
    cancelIcon: {
        alignItems: 'flex-end',
        marginBottom: 16
    }
});