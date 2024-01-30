import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Help: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.step}>
                <Text style={styles.stepNumber}>1</Text>
                <Text style={styles.stepText}>
                    Pilih menu daftar.
                </Text>
            </View>
            <View style={styles.step}>
                <Text style={styles.stepNumber}>2</Text>
                <Text style={styles.stepText}>
                    Masukan username dan password.
                </Text>
            </View>
            <View style={styles.step}>
                <Text style={styles.stepNumber}>3</Text>
                <Text style={styles.stepText}>
                    Tekan icon kamera, lalu fotokan KTP anda.
                </Text>
            </View>
            <View style={styles.step}>
                <Text style={styles.stepNumber}>4</Text>
                <Text style={styles.stepText}>
                    Masukan kewarganegaraan dan alamat.
                </Text>
            </View>
            <View style={styles.step}>
                <Text style={styles.stepNumber}>5</Text>
                <Text style={styles.stepText}>
                    Klik daftar dan tunggu prosesnya selesai.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    step: {
      flexDirection: 'row',
      alignItems: 'flex-start', // Mengatur agar semua elemen berada di atas
      marginBottom: 16,
    },
    stepNumber: {
      fontSize: 21,
      fontWeight: 'bold',
      marginRight: 12,
      color: '#3498db', // Warna biru
      alignSelf: 'flex-start', // Mengatur nomor di atas
    },
    stepText: {
      fontSize: 14,
      lineHeight: 24,
      alignSelf: 'flex-start', // Mengatur teks di atas
      marginTop: 2
    },
  });

export default Help;
