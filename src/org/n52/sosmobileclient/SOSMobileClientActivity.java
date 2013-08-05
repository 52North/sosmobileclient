package org.n52.sosmobileclient;

import org.apache.cordova.DroidGap;
import android.os.Bundle;

public class SOSMobileClientActivity extends DroidGap {
    @Override
    public void onCreate(Bundle savedInstanceState) {
    	//super.setIntegerProperty("splashscreen", R.drawable.ic_launcher);
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html", 2000);
    }
}
