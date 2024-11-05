import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet, ScrollView, ImageSourcePropType, ImageBackground } from 'react-native';
import * as Speech from 'expo-speech';
import * as ScreenOrientation from 'expo-screen-orientation';

const frutilla = require('../assets/images/frutilla.png');
const banana = require('../assets/images/banana.png');
const limon = require('../assets/images/limon.png');
const uva = require('../assets/images/uva.png');
const manzana = require('../assets/images/manzana.png');
const pera = require('../assets/images/pera.png');
const fondo = require('../assets/images/fases1.png');
const mesa = require('../assets/images/mesa.png');


type Posicion = "Arriba" | "Abajo" | "Izquierda" | "Derecha";
type Objeto = {
  imagen: ImageSourcePropType;
  nombre: string;
  color: string;
  categoria: string;
  posicion: Posicion;  // Usamos el tipo Posicion aquí
};

type OpcionProps = {
  titulo: string;
  opciones: string[];
  onSeleccionar: (seleccion: string) => void;
  categoria: keyof Objeto;
  seleccionCorrecta: string;
  seleccion: string | null;
  nivel: any;
};

// Componente principal de la actividad
const ActividadQueSoy: React.FC = () => {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    iniciarActividad();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const [nivel, setNivel] = useState(1);
  const [errores, setErrores] = useState(0);
  const [objeto, setObjeto] = useState<Objeto>({
    imagen: frutilla,
    nombre: 'Dulce',
    color: 'Rojo',
    categoria: 'Fruta',
    posicion: 'Arriba',
  });
  const [selecciones, setSelecciones] = useState<{ [key: string]: string | null }>({
    nombre: null,
    color: null,
    categoria: null,
    posicion: null,
  });

  const iniciarActividad = () => {
    Speech.speak("Cual es su sabor?");
  };

  const manejarOpcionSeleccionada = (categoria: keyof Objeto, seleccion: string) => {
    const esCorrecto = verificarRespuesta(categoria, seleccion);
  
    setSelecciones((prev) => {
      const nuevasSelecciones = { ...prev, [categoria]: seleccion };
  
      // Verificar si todas las respuestas son correctas después de actualizar el estado
      if (esCorrecto && Object.keys(nuevasSelecciones).every(key => nuevasSelecciones[key as keyof Objeto] === objeto[key as keyof Objeto])) {
        Alert.alert("¡Correcto!", `¡Bien hecho! Avanzaste al nivel ${nivel + 1 }/5`);
        avanzarNivel();
      } else if (!esCorrecto) {
        setErrores((prevErrores) => prevErrores + 1);
        if (errores >= 9) {
          reiniciarNivel();
        }
      }
  
      return nuevasSelecciones;
    });
  };
  const verificarRespuesta = (categoria: keyof Objeto, seleccion: string): boolean => {
    return objeto[categoria] === seleccion;
  };

  const reiniciarNivel = () => {
    if(nivel === 1){
    setErrores(0);
  
    setSelecciones({ nombre: null, color: null, categoria: null, posicion: null });
    cambiarObjeto();
    }
    else{
      setNivel((prev) => prev - 1)
    setErrores(0);
    setSelecciones({ nombre: null, color: null, categoria: null, posicion: null });
    cambiarObjeto();
    }
    
  };

  const avanzarNivel = () => {
    if(nivel === 5){
      Alert.alert("¡Felicidades!", "¡Has completado el juego!");
      setNivel(0);
      setErrores(0);
      cambiarObjeto();

    }else{
      setNivel((prev) => prev + 1);
      setErrores(0);
      cambiarObjeto();

    }
  };

  const cambiarObjeto = () => {
    const nuevosObjetos: Objeto[] = [
      { nombre: 'Ácido', color: 'Verde', categoria: 'Fruta', posicion: 'Derecha', imagen: limon },
      { nombre: 'Ácido', color: 'Verde', categoria: 'Fruta', posicion: 'Abajo', imagen: limon },
      { nombre: 'Dulce', color: 'Amarillo', categoria: 'Fruta', posicion: 'Arriba', imagen: banana },
      { nombre: 'Dulce', color: 'Rojo', categoria: 'Fruta', posicion: 'Izquierda', imagen: manzana },
      { nombre: 'Ácido', color: 'Verde', categoria: 'Fruta', posicion: 'Arriba', imagen: limon },
      { nombre: 'Dulce', color: 'Purpura', categoria: 'Fruta', posicion: 'Derecha', imagen: uva },
      { nombre: 'Dulce', color: 'Verde', categoria: 'Fruta', posicion: 'Abajo', imagen: pera },
      { nombre: 'Dulce', color: 'Verde', categoria: 'Fruta', posicion: 'Derecha', imagen: pera },
      { nombre: 'Dulce', color: 'Purpura', categoria: 'Fruta', posicion: 'Abajo', imagen: uva },
      { nombre: 'Dulce', color: 'Amarillo', categoria: 'Fruta', posicion: 'Izquierda', imagen: banana },
      { nombre: 'Dulce', color: 'Purpura', categoria: 'Fruta', posicion: 'Izquierda', imagen: uva },
      { nombre: 'Dulce', color: 'Purpura', categoria: 'Fruta', posicion: 'Derecha', imagen: uva },
      { nombre: 'Dulce', color: 'Rojo', categoria: 'Fruta', posicion: 'Arriba', imagen: manzana },
      { nombre: 'Ácido', color: 'Verde', categoria: 'Fruta', posicion: 'Izquierda', imagen: limon },
      { nombre: 'Dulce', color: 'Rojo', categoria: 'Fruta', posicion: 'Derecha', imagen: manzana },
      { nombre: 'Dulce', color: 'Rojo', categoria: 'Fruta', posicion: 'Abajo', imagen: manzana },
      { nombre: 'Dulce', color: 'Verde', categoria: 'Fruta', posicion: 'Arriba', imagen: pera },
      { nombre: 'Dulce', color: 'Amarillo', categoria: 'Fruta', posicion: 'Abajo', imagen: banana },
      { nombre: 'Dulce', color: 'Verde', categoria: 'Fruta', posicion: 'Izquierda', imagen: pera },
      { nombre: 'Dulce', color: 'Amarillo', categoria: 'Fruta', posicion: 'Derecha', imagen: banana },
    ];
    const nuevoObjeto = nuevosObjetos[Math.floor(Math.random() * nuevosObjetos.length)];
    setObjeto(nuevoObjeto);
    setSelecciones({ nombre: null, color: null, categoria: null, posicion: null });
  };

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.nivelContainer}>
          <Text style={styles.nivelTexto}>Nivel: {nivel}/5</Text>
        </View>
        <View style={styles.nivelErrores}>
          <Text style={styles.nivelTexto}>Errores: {errores}/10</Text>
        </View>
        <Text style={styles.instrucciones}>
          Presiona el parlante del lado izquierdo de cada recuadro amarillo, luego de escuchar la pregunta, escoge cual es la opcion que describe el objeto que se encuentra encerrado en el circulo.
        </Text>
        <View style={styles.tableContainer}>
          <Image source={mesa} style={styles.mesa} />
          <Image source={objeto.imagen} style={[styles.objeto, posicionStyles[objeto.posicion]]} />
        </View>
        <View style={styles.opcionesContainer}>
          <Opcion
            titulo="¿Cuál es su sabor?"
            opciones={["Dulce", "Amargo", "Salado", "Ácido"]}
            onSeleccionar={(seleccion) => manejarOpcionSeleccionada("nombre", seleccion)}
            categoria="nombre"
            seleccionCorrecta={objeto.nombre}
            seleccion={selecciones.nombre}
            nivel={nivel}
          />
          <Opcion
            titulo="¿Qué es?"
            opciones={["Color", "Animal", "Fruta", "Ropa"]}
            onSeleccionar={(seleccion) => manejarOpcionSeleccionada("categoria", seleccion)}
            categoria="categoria"
            seleccionCorrecta={objeto.categoria}
            seleccion={selecciones.categoria}
            nivel={nivel}
          />
          <Opcion
            titulo="¿De qué color es?"
            opciones={["Purpura", "Amarillo", "Rojo", "Verde"]}
            onSeleccionar={(seleccion) => manejarOpcionSeleccionada("color", seleccion)}
            categoria="color"
            seleccionCorrecta={objeto.color}
            seleccion={selecciones.color}
            nivel={nivel}
          />
          <Opcion
            titulo="Está __ de la mesa"
            opciones={["Arriba", "Abajo", "Derecha", "Izquierda"]}
            onSeleccionar={(seleccion) => manejarOpcionSeleccionada("posicion", seleccion)}
            categoria="posicion"
            seleccionCorrecta={objeto.posicion}
            seleccion={selecciones.posicion}
            nivel={nivel}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const Opcion: React.FC<OpcionProps> = ({ titulo, opciones, onSeleccionar, categoria, seleccionCorrecta, seleccion, nivel }) => {
  const [mostrarOpciones, setMostrarOpciones] = useState(true);

  useEffect(() => {
    setMostrarOpciones(true); // Resetea al cambiar de nivel
  }, [nivel]);

  const manejarSeleccion = (opcion: string) => {
    if (opcion === seleccionCorrecta) {
      setMostrarOpciones(false); // Oculta opciones incorrectas si es correcta
    } else {
      setMostrarOpciones(true); // Muestra todas las opciones si es incorrecta
    }
    onSeleccionar(opcion);
  };

  return (
    <View style={styles.opcion}>
      <TouchableOpacity onPress={() => Speech.speak(titulo)} style={styles.bocinaContainer}>
        <Text style={styles.titulo}>🔊 {titulo}</Text>
      </TouchableOpacity>
      <View style={styles.opcionesGrid}>
        {opciones.map((opcion, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.botonOpcion,
              seleccion === opcion && opcion === seleccionCorrecta ? styles.opcionCorrecta : 
              seleccion === opcion && opcion !== seleccionCorrecta ? styles.opcionIncorrecta : 
              !mostrarOpciones && opcion !== seleccionCorrecta ? styles.opcionOculta : null,
            ]}
            onPress={() => manejarSeleccion(opcion)}
          >
            <Text style={styles.opcionTexto}>{opcion}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


const posicionStyles: { [key in Posicion]: any } = {
  Arriba: { position: 'absolute', top: -20, left: '7%' },
  Abajo: { position: 'absolute', bottom: 0, left: '7%' },
  Izquierda: { position: 'absolute', left: -30, top: '40%' },
  Derecha: { position: 'absolute', right: -30, top: '40%' },
}

const styles = StyleSheet.create({

  opcionIncorrecta: {
    backgroundColor: 'red', // Opcional: fondo rojo para incorrectas
  },
  opcionOculta: {
    opacity: 0, // Ocultar opción incorrecta
  },
  background: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
    tableContainer: {
    flexDirection: 'row', // Alineación horizontal de los elementos dentro del contenedor
    justifyContent: 'center', // Centra los elementos horizontalmente
    alignItems: 'center', // Centra los elementos verticalmente
    marginBottom: -10, // Margen inferior para separar de otros elementos
    position: 'relative', // Permite posicionar el objeto de manera absoluta dentro de este contenedor
  },
  mesa: { width: 140, height: 60, resizeMode: 'contain' }, // Reducido el tamaño de la mesa
  objeto: { width: 40, height: 40, borderRadius: 30 }, // Reducido el tamaño del objeto
  container: { 
    flexGrow: 1, 
    padding: 0, 
    backgroundColor: '#FFF5E1', 
    alignItems: 'center', 
    justifyContent: 'center',
    minHeight: '100%', 
    
  },
  instrucciones: { 
    textAlign: 'center', 
    fontSize: 12, // Reducido el tamaño de fuente
    color: '#34495e', 
    marginBottom: 14,
    paddingHorizontal: 70, 
    marginTop:4
  },
  nivelContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#f1c40f',
    padding: 4,
    borderRadius: 5,
    
  },
  nivelErrores: {
    
    position: 'absolute',
    top: 7,
    right: 5,
    backgroundColor: '#e74c3c',
    padding: 4,
    borderRadius: 5,
  },
  nivelTexto: { fontSize: 12, color: '#fff' },
  opcionesContainer: { 
    marginVertical: 8, 
    padding:0,  
    marginTop:8,
    flexDirection: 'row', // Alineación horizontal de los elementos
    flexWrap: 'wrap', // Permite que los elementos se envuelvan en múltiples filas
    justifyContent: 'space-between', // Espaciado entre columnas
  },
  opcion: { marginHorizontal: 10 },
  bocinaContainer: { marginBottom: 5 },
  titulo: { 
    fontSize: 14, // Reducido el tamaño de fuente del título
    textAlign: 'center' 
  },
  opcionesGrid: { 
    flexDirection: 'row', // Alineación horizontal de los elementos
    flexWrap: 'wrap', // Permite que los elementos se envuelvan en múltiples filas
    justifyContent: 'space-between', // Distribuye el espacio uniformemente entre los elementos
    alignItems: 'center',
    margin: 6,
     // Centra los elementos verticalmente
  },
  botonOpcion: {
    backgroundColor: '#e67e22',
    padding: 5,
    margin: 2,
    borderRadius: 5,
    flex: 1,
    minWidth: '45%', // Reducido el ancho mínimo para que se ajusten mejor
  },
  opcionTexto: { 
    textAlign: 'center', 
    color: '#fff',
    fontSize: 10, // Reducido el tamaño de fuente de la opción
  },
  opcionCorrecta: { backgroundColor: '#2ecc71' }, // Color verde para la opción correcta
});

export default ActividadQueSoy;