package org.capacitor.quasar.app;

import android.os.Build;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // 启用 WebView 的跨域请求
    WebView webView = this.bridge.getWebView();
    WebSettings webSettings = webView.getSettings();
    webSettings.setAllowUniversalAccessFromFileURLs(true);
  }
}
