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
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 8
    },
    buttonText: {
        color: colors.white,
        fontSize: 14
    },
    text: {
        color: colors.white,
        fontSize: 11,
        fontWeight: 'bold',
        marginVertical: 4
    },
});

export default ErrorScreen = ({reload}) => (
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