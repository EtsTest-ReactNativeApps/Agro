# Kronia

## Installation
Clone this repository and import into **Android Studio**
```bash
git clone https://github.com/thebigshotsam/Agro.git
```

## Extra Visual documentation

Check out the video of what is Kronia and how it works here: https://drive.google.com/file/d/1D2Hb0gD__yu_bjLrxsbiCLj2GT-6Nd4t/view?usp=sharing

Download the app: https://drive.google.com/file/d/11g6SQpSv4O7lo9cWtr-7e8M1FVO3nx2y/view?usp=sharing

Check out our Machine Learning and Backend implementation: https://github.com/KroniaPytorch/KroniaModels

# React Native Configuration 
https://reactnative.dev/docs/environment-setup


# Screenshots
<img src="Screenshots/Screenshot (10).png" alt="phone image" width="200px" />
<img src="Screenshots/Screenshot (11).png" alt="phone image" width="200px" />
<img src="Screenshots/Screenshot (12).png" alt="phone image" width="400px" />
<img src="Screenshots/Screenshot (13).png" alt="phone image" width="200px" />
<img src="Screenshots/Screenshot (14).png" alt="phone image" width="200px" />
<img src="Screenshots/Screenshot (15).png" alt="phone image" width="400px" />

# Client Side Architecture
<img src="Screenshots/Blank diagram (1).png" alt="phone image" width="1080px" />


# What does this app do?
Kronia is an agritech android mobile application that works to automate the existing farming practices and agriculture methodologies, leveraging the potential of computer vision and AI built on top of Pytorch framework.


# Libraries this app uses:

1. "@react-native-community/art": "^1.2.0",
2. "@react-native-community/geolocation": "^2.0.2",
3. "@react-native-community/masked-view": "^0.1.11",
4. "@react-native-firebase/app": "^12.9.2",
5. "@react-native-firebase/auth": "^12.9.2",
6. "@react-native-firebase/database": "^12.9.2",
7. "@react-native-firebase/storage": "^12.9.2",
8. "axios": "^0.23.0",
9. "galio-framework": "^0.8.0",
10. "react": "17.0.2",
11. "react-native": "0.66.1",
12. "react-native-camera": "3.40.0",
13. "react-native-elements": "^3.4.2",
14. "react-native-geolocation-service": "^5.3.0-beta.3",
15. "react-native-gesture-handler": "^1.10.3",
16. "react-native-get-location": "^2.1.2",
17. "react-native-image-picker": "^4.1.2",
18. "react-native-indicator": "^1.2.2",
19. "react-native-location": "^2.5.0",
20. "react-n ative-material-ripple": "^0.9.1",
21. "react-native-modal": "^13.0.0",
22. "react-native-paper": "4.9.1",
23. "react-native-reanimated": "1.13.2",
24. "react-native-safe-area-context": "3.2.0",
25. "react-native-screens": "3.3.0",
26. "react-native-sliding-up-down-panels": "1.0.0",
27. "react-native-status-bar-height": "^2.6.0",
28. "react-native-svg": "^12.1.1",


# Setup

1. Clone or download this repo.
2. This app runs off a Firebase backend. It uses realtime firebase database and authentication api's. 
3. The database rules and storage rules can also be imported into Firebase, those files are also located in the server folder. 
(For more info on getting your own server up and running, check outhttps://reactnative.dev/
4. There is google-services.json file inside app directory to use with the app. It is used to configure firebase with the react native modules and links it with the native modules of the android. 


# [OPTIONAL setup] 
1. If you wish to build a release version you will need to create your own keystore file and edit the password values in the following file - (create a version of the file without the .sample extension): release-keystore.properties.sample
2. Write **yarn install** on the terminal in the project directory
## Build variants
Use the Android Studio  with debug and release build types

1. run **yarn android** for building debug apk and then executing it on via metro server of react native by entering **yarn start**.
2. run **cd android** to navigate to android directory and then run **./gradlew assembleRelease** to build signed apk


## Generating signed APK
From Android Studio:
1. ***Build*** menu
2. ***Generate Signed APK...***
3. Fill in the keystore information *(you only need to do this once manually and then let Android Studio remember it)*

