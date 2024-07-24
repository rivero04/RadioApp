import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ImageBackground,
  Linking, // Importa Linking para manejar enlaces
} from 'react-native';
import Sound from 'react-native-sound';

const App = (): React.JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Sound | null>(null);

  useEffect(() => {
    Sound.setCategory('Playback');
    const soundInstance = new Sound(
      'http://204.197.245.100:8280/;',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          Alert.alert('Error', 'Error al cargar el stream de audio');
          return;
        }
      },
    );

    setSound(soundInstance);

    return () => {
      soundInstance.release();
    };
  }, []);

  const handlePlayPause = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play(success => {
          if (!success) {
            Alert.alert('Error', 'Sincronizando audio, porfavor espere');
          }
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Función para abrir WhatsApp con un mensaje
  const handleOpenWhatsApp = () => {
    const phoneNumber = '092881520'; // Número de teléfono
    const message = '¡Hola! Quiero enviar un mensaje a la radio.';
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message,
    )}`;

    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'No se pudo abrir WhatsApp');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('./assets/images/background.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.content}>
          <Text style={styles.frase}>¡Disfruta de la mejor música y</Text>
          <Text style={styles.frase2}>programación en nuestra radio!</Text>
          <Image
            source={require('./assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.liveText}>EN VIVO AQUÍ!</Text>
          <TouchableOpacity onPress={handlePlayPause} style={styles.button}>
            <Image
              source={
                isPlaying
                  ? require('./assets/images/pause.png')
                  : require('./assets/images/play.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.message}>¡HAZTE OÍR EN LA RADIO!</Text>
          <Text style={styles.message2}>Envíanos tus mensajes</Text>
          <View style={styles.messageContainer}>
            <TouchableOpacity
              onPress={handleOpenWhatsApp}
              style={styles.whatsappButton}>
              <Text style={styles.message3}>al</Text>
              <Text style={styles.message4}>092 881 520 </Text>
              <Image
                source={require('./assets/images/wpp.png')}
                style={styles.wpp}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Radio Acuarela. Todos los derechos reservados.
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FBE7',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  frase: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  frase2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginTop: 10,
  },
  logo: {
    width: 300,
    height: 150,
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    width: 80,
    height: 80,
  },
  liveText: {
    fontSize: 25,
    marginTop: 15,
    color: '#ff5722',
    fontWeight: 'bold',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  message: {
    fontSize: 20,
    color: '#388E3C',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  message2: {
    fontSize: 20,
    color: '#1976D2',
    fontWeight: 'bold',
    marginTop: 15,
    marginRight: 10,
  },
  message3: {
    fontSize: 20,
    color: '#1976D2',
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 20,
  },
  message4: {
    fontSize: 20,
    color: '#1976D2',
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wpp: {
    width: 35,
    height: 35,
    marginLeft: 10,
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
  },
  footerText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default App;
