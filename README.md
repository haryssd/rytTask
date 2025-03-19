## Face ID Authentication Testing Instructions

This app uses Face ID for secure authentication. Since the app was developed on Windows, Face ID functionality requires additional steps to test:

### Option 1: Using macOS 
If you have access to a Mac, you can fully test the Face ID functionality:

1. Clone the repository
2. Install dependencies: `npm install`
3. Install development client: `npx expo install expo-dev-client`
4. Create a development build: `npx expo prebuild`
5. Run on iOS: `npx expo run:ios`

This will build a native iOS app with proper Face ID permissions and allow testing on a simulator or device.

### Option 2: Using Expo Go 
If testing with Expo Go on iOS:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the app: `npx expo start`
4. Scan the QR code with your iOS device

If Option 2 doesn't work where QR Code can't be scan, try to uninstall the expo-dev-client dependencies:
1. `npm uninstall expo-dev-client`
2. Install depencies: `npm install`
3. Start the app: `npx expo start --clear`

**Note**: When using Expo Go, Face ID authentication will default to passcode authentication instead.
