import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Help: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.step}>
                <Text style={styles.stepNumber}>1</Text>
                <Text style={styles.stepText}>
                    Basahi tangan dengan air bersih.
                </Text>
            </View>
            <View style={styles.step}>
                <Text style={styles.stepNumber}>2</Text>
                <Text style={styles.stepText}>
                    Gunakan sabun dan gosok tangan secara menyeluruh.
                </Text>
            </View>
            <View style={styles.step}>
                <Text style={styles.stepNumber}>3</Text>
                <Text style={styles.stepText}>
                    Bersihkan bagian dalam jari-jari.
                </Text>
            </View>
            <View style={styles.step}>
                <Text style={styles.stepNumber}>4</Text>
                <Text style={styles.stepText}>
                    Gosok telapak tangan dan punggung tangan.
                </Text>
            </View>
            <View style={styles.step}>
                <Text style={styles.stepNumber}>5</Text>
                <Text style={styles.stepText}>
                    Bilas tangan dengan air bersih hingga bersih.
                </Text>
            </View>
            <View style={styles.step}>
                <Text style={styles.stepNumber}>6</Text>
                <Text style={styles.stepText}>
                    Keringkan tangan dengan handuk atau kertas.
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
