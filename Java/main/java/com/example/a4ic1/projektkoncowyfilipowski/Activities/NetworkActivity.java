package com.example.a4ic1.projektkoncowyfilipowski.Activities;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;

import com.example.a4ic1.projektkoncowyfilipowski.Helpers.GetJson;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.Networking;
import com.example.a4ic1.projektkoncowyfilipowski.R;

public class NetworkActivity extends AppCompatActivity {

    private ViewPager viewPager1;

//    public void openInBrowser (String url) {
//        Log.e("open", url);
//        //open(url);
//    }
//
//    public void open (String url) {
//        Intent intent = new Intent(
//        Intent.ACTION_VIEW,
//        Uri.parse("http://egon.net16.net/zdjecia/img/" + url));
//        startActivity(intent);
//    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_network);
        getSupportActionBar().hide();

        viewPager1 = (ViewPager) findViewById(R.id.networkPager);

        Networking net = new Networking();
        if(net.isConnected(NetworkActivity.this)) {
            new GetJson(NetworkActivity.this, viewPager1, true).execute();
        } else {
            AlertDialog.Builder alert = new AlertDialog.Builder(NetworkActivity.this);
            alert.setTitle("Uwaga!");
            alert.setCancelable(true);
            alert.setMessage("Brak połączenia z siecią");
            alert.show();
        }

    }
}
