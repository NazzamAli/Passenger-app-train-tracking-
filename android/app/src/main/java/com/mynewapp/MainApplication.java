package com.mynewapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.imagepicker.ImagePickerPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.storage.RNFirebaseStoragePackage; // <-- Add this line

import java.util.Arrays;
import java.util.List;
import io.invertase.firebase.RNFirebasePackage;

import io.invertase.firebase.auth.RNFirebaseAuthPackage; 
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; // <-- Add this line

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            
           
            new ImagePickerPackage(),
            new MapsPackage(),
            new RNSoundPackage(),
            new RNSpinkitPackage(),
            new RNFirebasePackage(),
            new VectorIconsPackage(),
            new RNFirebaseAuthPackage(),
             new RNFirebaseFirestorePackage(), // <-- Add this line
               new RNFirebaseStoragePackage() // <-- Add this line
            
             
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
