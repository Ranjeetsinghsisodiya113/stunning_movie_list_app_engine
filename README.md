# stunning_movie_list_app_engine  

//  require that must have react-native setup like node ,android studio,jdk all thing setuped with envirnment path and system path  then

// how to run it your system follow below instructions

//  unzip project   or your can clone it form github

// go to project directory  using editor vscode

// npm install --force

// cd android 

// .\gradlew clean

// cd ..        

// npx react-native run-android


How to make apk 

after run the project

run  below this command in project directory 

 npx react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res

go to android folder using

cd android

and then copy this command
./gradlew assembleDebug

here our apk resides 

stunning_movie_list_app_engine\android\app\build\outputs\apk\debug




