import { StyleSheet } from "react-native";
import { Image } from "expo-image";  // Usa o componente de imagem do expo

// Define as propriedades que o componente irá receber
type Props = {
  imgSource: string;
  selectedImage?: string  // imgSource é uma string que será a fonte da imagem
};

// Função que define o componente ImageViewer
export default function ImageViewer({ imgSource, selectedImage }: Props) {
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

    return <Image source={imageSource} style={styles.image} />;
}

// Estilos aplicados à imagem
const styles = StyleSheet.create({
  image: {
    width: 320,  // Largura da imagem
    height: 440,  // Altura da imagem
    borderRadius: 18,  // Borda arredondada
  },
});
