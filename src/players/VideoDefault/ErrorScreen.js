import React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native'
import { colors, boxStyle } from '../../commons'

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.blue,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 12
    },
    buttonText: {
        color: colors.white,
        fontSize: 14
    },
    text: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 10
    },
});

export default ErrorBox = ({reload}) => (
    <View style={boxStyle}>
        <Text 
            style={styles.text}
        >
            NÃO FOI POSSÍVEL REPRODUZIR A MÍDIA
        </Text>
        <TouchableOpacity 
            onPress={reload}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Recarregar</Text>
        </TouchableOpacity>
    </View>
)