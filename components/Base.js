import React, { useEffect } from 'react'
import {
    View,
    StyleSheet,
    ImageBackground,
    Text,
    TouchableOpacity,
} from 'react-native'
import { useFonts } from 'expo-font'
import * as ScreenOrientation from 'expo-screen-orientation'
import { BlurView } from 'expo-blur'
import * as Animatable from 'react-native-animatable'

const ActN = () => {
    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)

        return () => {
            ScreenOrientation.unlockAsync()
        }
    }, [])

    const [fontsLoaded] = useFonts({
        Akaju: require('../assets/fonts/Akaju.otf'),
        Ocean: require('../assets/fonts/SuperOcean.ttf'),
    })

    if (!fontsLoaded) {
        return null
    }

    const animaciones = {
        animation: 'rotate',
        duration: 3000,
        easing: 'linear',
        iterationCount: 'infinite',
    }

    return (
        <ImageBackground
            source={require('../assets/Actfondos/wallpaper1.png')}
            style={styles.container}
        >
            <View style={{ marginLeft: 40, alignSelf: 'flex-start' }}>
                <Text style={styles.instructions1}>
                    Actividad 2: Rellenando Chocolatinas
                </Text>
            </View>
            <View style={styles.innerContainer}>
                <View style={styles.contenedorActividad}></View>
                <BlurView intensity={200} style={styles.blurPuntaje}>
                    <View>
                        <Text style={styles.txtpuntaje}>PUNTAJE</Text>
                    </View>
                    <View style={styles.viewScore}>
                        <Text style={{ fontSize: 40 }}>0</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Animatable.Image
                            {...animaciones}
                            style={styles.estampillas}
                            source={require('../assets/estampillas/estampillaAmarilla.png')}
                        />
                        <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
                            <Text style={styles.txtPuntajeInterno}> x </Text>
                            <Text style={styles.txtPuntajeInterno}>0</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Animatable.Image
                            {...animaciones}
                            style={styles.estampillas}
                            source={require('../assets/estampillas/estampillaAzul.png')}
                        />
                        <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
                            <Text style={styles.txtPuntajeInterno}> x </Text>
                            <Text style={styles.txtPuntajeInterno}>0</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Animatable.Image
                            {...animaciones}
                            style={styles.estampillas}
                            source={require('../assets/estampillas/estampillaMorada.png')}
                        />
                        <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
                            <Text style={styles.txtPuntajeInterno}> x </Text>
                            <Text style={styles.txtPuntajeInterno}>0</Text>
                        </View>
                    </View>
                </BlurView>
            </View>
            <View style={{ alignSelf: 'flex-end' }}>
                <TouchableOpacity style={styles.cajaBoton}>
                    <Text style={styles.TextoBoton}>--►</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    instructions1: {
        fontSize: 30,
        fontFamily: 'Akaju',
        color: '#da70d6',
        textAlign: 'left',
    },
    innerContainer: {
        flex: 0.96,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '90%',
    },
    contenedorActividad: {
        flexDirection: 'row',
        flex: 0.78,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 30,
    },
    blurPuntaje: {
        flex: 0.2,
        overflow: 'hidden',
        borderRadius: 30,
        alignItems: 'center',
    },
    viewScore: {
        alignItems: 'center',
        borderWidth: 2,
        width: '50%',
        borderRadius: 20,
    },
    estampillas: {
        width: 55,
        height: 55,
        resizeMode: 'stretch',
    },
    txtPuntajeInterno: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#06AED5',
    },
    txtpuntaje: {
        fontSize: 24,
        fontFamily: 'Ocean',
        color: '#06AED5',
        margin: 20,
    },
    cajaBoton: {
        backgroundColor: '#00bfff',
        borderRadius: 30,
        paddingVertical: 1,
        width: 50,
    },
    TextoBoton: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
})

export default ActN
