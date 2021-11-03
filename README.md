# Agro

This is an example Android Application README to show briefly the sections your app README should contain.

## Installation
Clone this repository and import into **Android Studio**
```bash
git clone https://github.com/thebigshotsam/Agro.git
```

## Configuration
[![BuddyBuild](https://dashboard.buddybuild.com/api/statusImage?appID=57bde66fa530dc0100e902b3&branch=master&build=latest)](https://dashboard.buddybuild.com/apps/57bde66fa530dc0100e902b3/build/latest)

Check out the blog post here: http://riggaroo.co.za/book-dash-android-app/

Download the app: https://play.google.com/store/apps/details?id=org.bookdash.android

Open Beta Testing Group: https://play.google.com/apps/testing/org.bookdash.android

Book Dash is an Android App for the NPO where you can download books in different languages for free.


# Screenshots
<img src="art/booklisting.jpg" alt="phone image" width="200px" />
<img src="art/bookdetail.jpg" alt="phone image" width="200px" />
<img src="art/reading_book.jpg" alt="phone image" width="400px" />



# What does this app do?
It is an open source Android application that allows people to download children's story books. The books are available
in different languages such as English, Sepedi, Zulu, Afrikaans etc. The books are free to distribute and translate.

Read more about Book Dash here:
http://bookdash.org/


# Libraries this app uses:

1. MaterialHelpTutorial - https://github.com/spongebobrf/MaterialIntroTutorial
2. FabButton - https://github.com/ckurtm/FabButton
3. Firebase - https://firebase.google.com/ 
4. Fabric - https://fabric.io/dashboard
5. Glide Image Loading - https://github.com/bumptech/glide

# Setup

1. Clone or download this repo.
2. This app runs off a Firebase backend. You will need to generate your firebase backend. To do this, navigate to https://firebase.google.com/ and sign up. Create a project called 
"Book Dash" (or what ever you want to call it). 
3. Navigate to "Database", select the three dots and then select "Import JSON". Select the file [server/book-dash-a93c3-export.json](server/book-dash-a93c3-export.json). 
Allow Firebase to import the data. You will also then need to place books in the storage container on firebase. You can find an example book located here: 
[server/simaandsiza-en.zip](server/simaandsiza-en.zip). Navigate to your Firebase console, and click storage, create a folder for the books and place them in there. 
You can then set the download URL of one of the books to use the book you have just uploaded to firebase storage in the STORAGE_PREFIX object.
 Within each zip file for a book, there is a file called bookdetails.json, this file is used to describe the images used and the number of pages in a book. 
In FirebaseConfig class you will need to change the base url of your book storage in the variable named - 
4. The database rules and storage rules can also be imported into Firebase, those files are also located in the server folder. 
(For more info on getting your own server up and running, check out https://github.com/bookdash/bookdash-backend-admin-portal
5. You will need to generate your own google-services.json file to use with the app. Navigate to the Firebase project settings dashboard. You should see an option to download the 
google-services.json file. This must then be placed into the app folder of this project. 


# [OPTIONAL setup] 
1. If you wish to build a release version you will need to create your own keystore file and edit the password values in the following file - (create a version of the file without the .sample extension): release-keystore.properties.sample
2. Setup a Fabric Account. https://fabric.io/dashboard
3. Get your Fabric API Key and Client key, change it in the file: /app/fabric-sample.properties and rename the file to fabric.properties

## Build variants
Use the Android Studio *Build Variants* button to choose between **production** and **staging** flavors combined with debug and release build types


## Generating signed APK
From Android Studio:
1. ***Build*** menu
2. ***Generate Signed APK...***
3. Fill in the keystore information *(you only need to do this once manually and then let Android Studio remember it)*

## Maintainers
This project is mantained by:
* [Federico Ramundo](http://github.com/framundo)


## Contributing

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -m 'Add some feature')
4. Run the linter (ruby lint.rb').
5. Push your branch (git push origin my-new-feature)
6. Create a new Pull Request