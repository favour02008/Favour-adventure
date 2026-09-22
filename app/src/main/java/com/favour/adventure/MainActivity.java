package com.favour.adventure;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.provider.Settings;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends Activity {
    private TextView status;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        buildUi();
        updateNetworkStatus();
    }

    private void buildUi() {
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(36, 48, 36, 36);
        root.setGravity(Gravity.CENTER_HORIZONTAL);

        TextView title = new TextView(this);
        title.setText("📺 LG Cast Helper");
        title.setTextSize(30);
        title.setGravity(Gravity.CENTER);
        root.addView(title, matchWrap());

        TextView info = new TextView(this);
        info.setText("\nThis app helps you prepare your Android phone for casting to an LG TV.\n\n1. Connect your phone and TV to the same Wi‑Fi network.\n2. Turn on Screen Share / Screen Mirroring on the TV.\n3. Use your phone's Cast / Smart View / Screen Cast control to select the TV.\n\nThe app cannot create wireless mirroring if the phone or TV does not support a compatible casting protocol.");
        info.setTextSize(17);
        root.addView(info, matchWrap());

        status = new TextView(this);
        status.setTextSize(18);
        status.setPadding(0, 24, 0, 24);
        root.addView(status, matchWrap());

        Button wifi = new Button(this);
        wifi.setText("Open Wi‑Fi Settings");
        wifi.setOnClickListener(v -> startActivity(new Intent(Settings.ACTION_WIFI_SETTINGS)));
        root.addView(wifi, matchWrap());

        Button cast = new Button(this);
        cast.setText("Open Phone Cast Controls");
        cast.setOnClickListener(v -> openCastSettings());
        root.addView(cast, matchWrap());

        Button refresh = new Button(this);
        refresh.setText("Check Connection Again");
        refresh.setOnClickListener(v -> updateNetworkStatus());
        root.addView(refresh, matchWrap());

        setContentView(root);
    }

    private LinearLayout.LayoutParams matchWrap() {
        return new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        );
    }

    private void updateNetworkStatus() {
        ConnectivityManager cm =
            (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo info = cm.getActiveNetworkInfo();

        if (info != null && info.isConnected()) {
            status.setText("✅ Network connected. Make sure the LG TV is on the same Wi‑Fi.");
        } else {
            status.setText("⚠️ No active network connection. Connect to Wi‑Fi first.");
        }
    }

    private void openCastSettings() {
        String[] actions = {
            "android.settings.CAST_SETTINGS",
            "android.settings.WIRELESS_DISPLAY_SETTINGS"
        };

        for (String action : actions) {
            try {
                startActivity(new Intent(action));
                return;
            } catch (Exception ignored) {
            }
        }

        Toast.makeText(this,
            "Open your phone's Quick Settings and choose Cast, Smart View, or Screen Cast.",
            Toast.LENGTH_LONG).show();
    }
}