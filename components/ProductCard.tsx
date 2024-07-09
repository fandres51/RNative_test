import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons';

interface ProductCardProps {
    name: string;
    id: number | string;
    style: any;
    onPress: () => void;
}

export function ProductCard({ name, id, style, onPress }: ProductCardProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, style]}>
                <View style={styles.data}>
                    <Text style={styles.name}>{name}</Text>
                    <Text>{id}</Text>
                </View>
                <View>
                    <Entypo name="chevron-small-right" size={24} color="black" />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: "#bfbfbf",
        padding: 16,
    },
    data: {
        flexDirection: "column",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        maxWidth: 320
    }
});