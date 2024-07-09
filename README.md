Este documento proporciona una guía paso a paso sobre cómo ejecutar el proyecto de React Native usando Expo después de descargar el repositorio desde GitHub.

## Prerrequisitos

Asegúrate de tener instalados los siguientes programas en tu máquina:

1. **Node.js**: Puedes descargarlo e instalarlo desde [nodejs.org](https://nodejs.org/).
2. **Expo CLI**: Si aún no lo tienes instalado, puedes instalarlo globalmente ejecutando:

   ```bash
   npm install -g expo-cli
   ```

## Pasos para Ejecutar el Proyecto

### 1. Clonar el Repositorio

Primero, clona el repositorio desde GitHub a tu máquina local. 

```bash
git clone https://github.com/fandres51/prueba-react-native.git
```

### 2. Instalar las Dependencias

Instala todas las dependencias necesarias del proyecto usando `npm`

```bash
npm install
```
### 3. Iniciar el Servidor de Desarrollo de Expo

Inicia el servidor de desarrollo de Expo.

```bash
npm run start
```

### 4. Ejecutar la Aplicación en un Dispositivo o Emulador

Después de iniciar el servidor de desarrollo, Expo te proporcionará un código QR.

- **En un dispositivo físico**:
  1. Descarga la aplicación Expo Go desde la [App Store](https://apps.apple.com/us/app/expo-go/id982107779) (iOS) o [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US) (Android).
  2. Abre Expo Go y escanea el código QR que aparece en tu terminal o en la página web que se abrió.

- **En un emulador**:
  - **iOS**: Si estás en macOS y tienes Xcode instalado, selecciona "Run on iOS simulator" en la interfaz de Expo.
  - **Android**: Si tienes Android Studio instalado, asegúrate de tener un emulador en funcionamiento y selecciona "Run on Android device/emulator".
