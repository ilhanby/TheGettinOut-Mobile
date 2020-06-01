package com.thegettinout;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; 
import android.os.Bundle; 

public class MainActivity extends ReactActivity {
  
  @Override
  protected String getMainComponentName() {
    return "TheGettinOut";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this,true);
    super.onCreate(savedInstanceState);
  }
  
}
