import * as React from "react";
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  View as DefaultView,
  useColorScheme,
} from "react-native";
import { View } from "../components/themed/Themed";
import MyText from "../components/MyText";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../constants/colors";
//Vector Icons
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function Agreement() {
  const [selected, setSelected] = React.useState(false);
  const navigation = useNavigation();
  const theme = useColorScheme();

  async function handleOnContinue() {
    await AsyncStorage.setItem("@firstLaunch", "true");
    navigation.navigate("Onboarding");
  }

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 10 }}>
      <MyText type="title" style={{ marginTop: 10 }}>
        Términos y condiciones
      </MyText>
      <ScrollView
        style={{
          marginVertical: 20,
          height: "60%",
          // borderWidth: 1,
          // borderColor: theme === "dark" ? "white" : "black",
          // borderRadius: 10,
          // paddingHorizontal: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        {termsAndConditions.map((term, index) => {
          const isSubheader = term.hasOwnProperty("subheader");

          return (
            <View
              key={index}
              style={
                isSubheader ? styles.subheaderContainer : styles.itemContainer
              }
            >
              {isSubheader ? (
                <MyText type="caption" style={{ fontWeight: "bold" }}>
                  {term.subheader}
                </MyText>
              ) : (
                <>
                  <MyText type="caption" style={{ fontWeight: "bold" }}>
                    {term.title}
                  </MyText>
                  <MyText type="caption">{term.description}</MyText>
                </>
              )}
            </View>
          );
        })}
      </ScrollView>
      <Pressable
        onPress={() => setSelected(!selected)}
        style={{
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {selected ? (
          <AntDesign
            name="checkcircle"
            size={24}
            color={Colors.light.tabIconSelected}
          />
        ) : (
          <Entypo name="circle" size={24} color={"gray"} />
        )}
        <MyText style={{ marginLeft: 10 }}>
          He leído y acepto los términos y condiciones.
        </MyText>
      </Pressable>
      <MyButton
        style={{ opacity: selected ? 1 : 0.2 }}
        title="Continuar"
        disabled={!selected}
        onPress={handleOnContinue}
      />
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  subheader: {},
  itemContainer: {
    marginVertical: 13,
  },
});

const termsAndConditions = [
  {
    title: "1. Introducción",
    description:
      "Bienvenido a Dudda, la plataforma en línea que conecta a profesores particulares con estudiantes y padres de familia. Al utilizar nuestros servicios, usted acepta cumplir con los siguientes términos y condiciones. Si no acepta estos términos y condiciones, no utilice nuestros servicios.",
  },
  {
    subheader: "2. Uso de los servicios  ",
  },
  {
    title: "2.1 Registro",
    description:
      "Para utilizar nuestros servicios, debe crear una cuenta en nuestra plataforma proporcionando información personal precisa y completa. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña, así como de todas las actividades que se realicen en su cuenta. Además, para registrarse en Dudda como profesor es necesario haber cumplido la mayoría de edad.",
  },
  {
    //TODO: Fix this
    title: "2.2 Clases y pagos",
    description:
      "Los usuarios pueden agendar una clase en línea y pagar un precio fijo por hora de clase enseñada a través de nuestra plataforma de pago asociada. Los profesores recibirán la paga total acumulada durante la semana el día viernes.",
  },
  {
    title: "2.3 Cancelaciones y reembolsos",
    description:
      "Si necesita cancelar una clase, puede hacerlo sin penalización siempre y cuando sea con una anticipación de 48 horas. En caso de cancelar con menos de 48 horas de anticipación, se aplicará una suspensión temporal que no le permitirá programar nuevas clases ni dar clases por un tiempo determinado. Si el usuario tiene muchas cancelaciones seguidas o tiene una falta injustificada, se puede sancionar con la eliminación de la cuenta y prohibición de crear nuevas con los mismos datos.",
  },
  {
    title: "2.4 Contenido",
    description:
      "Todo el contenido generado por el usuario en nuestra plataforma, incluyendo comentarios y evaluaciones de los profesores, deben cumplir con nuestras pautas de uso y no violar los derechos de propiedad intelectual de terceros. Nos reservamos el derecho de moderar y eliminar cualquier contenido que consideremos inapropiado.",
  },
  {
    title: "2.5 Seguridad y privacidad",
    description:
      "Nos comprometemos a proteger su información personal y financiera almacenándola de forma encriptada en nuestra base de datos de Firebase de Google. También tomamos medidas de seguridad para evitar cualquier acceso no autorizado a su información.",
  },
  {
    title: "2.6 Videoclases",
    description:
      "Todas las clases serán filmadas y revisadas como control de calidad. Las únicas plataformas permitidas para las videoclases serán Google Meet, Zoom y Teams.",
  },
  {
    title: "2.7 Clases y Exclusividad",
    description:
      "Para programar una clase con un usuario de Dudda, los profesores deberán hacerlo a través de la aplicación. Cualquier intento de realizar la reprogramación fuera de la aplicación se considerará una infracción grave de los términos y condiciones de uso, y podrá resultar en la terminación permanente de la cuenta del usuario. Es importante que los usuarios sigan el proceso de reprogramación establecido en la aplicación para garantizar una experiencia segura y satisfactoria en Dudda.",
  },
  {
    subheader: "3. Responsabilidades",
  },
  {
    title: "3.1 Responsabilidades de los profesores",
    description:
      "Los profesores son responsables de proporcionar clases de alta calidad en línea a los estudiantes. Además, deben cumplir con todas las regulaciones y requisitos aplicables en su jurisdicción. Ausentarse a una clase es una falta grave que será sancionada con la suspensión permanente de la cuenta.",
  },
  {
    title: "3.2 Responsabilidades de los estudiantes",
    description:
      "Los estudiantes son responsables de pagar el precio acordado por la clase y de asistir a la clase programada en línea. También deben cumplir con las pautas de uso de nuestra plataforma.",
  },
  {
    title: "3.3 Responsabilidades de Dudda",
    description:
      "Nos comprometemos a proporcionar una plataforma de alta calidad y segura para conectar profesores particulares con estudiantes. Sin embargo, no somos responsables de la calidad del contenido enseñado por los profesores o de la asistencia de los estudiantes a las clases programadas.",
  },
  {
    title: "4. Contacto",
    description:
      "Los usuarios pueden contactar a nuestro servicio al cliente a través de un número de WhatsApp proporcionado en la plataforma. También proporcionamos una guía detallada que cubre la mayoría de los problemas comunes.",
  },
  {
    title: "5. Propiedad intelectual",
    description:
      "Los usuarios son responsables de garantizar que cualquier contenido que publiquen en nuestra plataforma no infrinja los derechos de propiedad intelectual de terceros. Al publicar contenido en nuestra plataforma, otorga a Dudda una licencia no exclusiva, transferible, sublicenciable, libre de regalías y mundial para usar, copiar, reproducir, procesar, adaptar, modificar, publicar, transmitir, mostrar y distribuir dicho contenido en cualquier medio o forma ahora conocida o desarrollada en el futuro.",
  },
  {
    title: "6. Ley aplicable",
    description:
      "Estos términos y condiciones se rigen por las leyes de la República del Perú. Cualquier disputa o reclamo relacionado con nuestros servicios se resolverá en un tribunal competente de la República del Perú.",
  },
  {
    title: "7. Terminación de cuenta",
    description:
      "Dudda se reserva el derecho de terminar cualquier cuenta de usuario que incumpla estos términos y condiciones. En caso de terminación de cuenta, toda la información de la cuenta del usuario será eliminada de nuestra base de datos a excepción de información general que nos permitirá identificar si una misma persona intenta crear otra cuenta.",
  },
  {
    title: "8. Modificaciones",
    description:
      "Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Si realizamos cambios importantes, le notificaremos por correo electrónico o mediante un aviso destacado en nuestra plataforma. Al utilizar nuestros servicios, acepta estos términos y condiciones en su totalidad. Si tiene alguna pregunta o inquietud sobre estos términos y condiciones, comuníquese con nuestro servicio al cliente.",
  },
];
