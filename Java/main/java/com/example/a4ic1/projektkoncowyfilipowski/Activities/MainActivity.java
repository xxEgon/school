package com.example.a4ic1.projektkoncowyfilipowski.Activities;

import android.content.Intent;
import android.os.Environment;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;

import com.example.a4ic1.projektkoncowyfilipowski.Adapters.MyPagerAdapter;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.GetJson;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.ImageD;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.Networking;
import com.example.a4ic1.projektkoncowyfilipowski.R;

import java.io.File;
import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    private LinearLayout mainAlbumy;
    private LinearLayout mainZdjecie;
    private LinearLayout mainNotatki;
    private LinearLayout mainKolaz;
    private LinearLayout mainSiec;
    private ViewPager viewPager1;

    public File mojFolder;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mainAlbumy = (LinearLayout) findViewById(R.id.mainAlbumy);
        mainZdjecie = (LinearLayout) findViewById(R.id.mainZdjecie);
        mainNotatki = (LinearLayout) findViewById(R.id.mainNotatki);
        mainKolaz = (LinearLayout) findViewById(R.id.mainKolaz);
        mainSiec = (LinearLayout) findViewById(R.id.mainSiec);
        viewPager1 = (ViewPager) findViewById(R.id.viewPager1);

        mainKolaz.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this,CollageActivity.class);
                startActivity(intent);
            }
        });

        mainAlbumy.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Log.e("Klik", "Kliczek");

                Intent intent = new Intent(MainActivity.this,AlbumActivity.class);
                startActivity(intent);
            }
        });
        mainZdjecie.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Log.e("Klik", "Kliczek");

                Intent intent = new Intent(MainActivity.this,CameraActivity.class);
                startActivity(intent);
            }
        });
        mainNotatki.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this,NotesActivity.class);
                startActivity(intent);
            }
        });
        mainSiec.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this,NetworkActivity.class);
                startActivity(intent);
            }
        });

        File pic = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
//        File fmov = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES);
//        File down = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
//        File dcim = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM);

        //pic.getPath(); // pełna ścieżka
        mojFolder = new File(pic.getPath() + "/Damian Filipowski");

        if(!(mojFolder.exists()) || !(mojFolder.isDirectory())) {
            mojFolder = new File(pic.getPath()+ "/Damian Filipowski");
            mojFolder.mkdirs();
        }

        String[] array = new String[]{"Ludzie","Miejsca","Rzeczy"};

        for(int i = 0;i< array.length;i++) {
            File mojPodfolder = new File(mojFolder.getPath() + "/" + array[i]);
            if(!(mojPodfolder.exists()) || !(mojPodfolder.isDirectory()))
                mojPodfolder.mkdirs();
        }

        Networking net = new Networking();
        if(net.isConnected(MainActivity.this)) {
            new GetJson(MainActivity.this, viewPager1, false).execute();
        } else {
            AlertDialog.Builder alert = new AlertDialog.Builder(MainActivity.this);
            alert.setTitle("Uwaga!");
            alert.setCancelable(true);
            alert.setMessage("Brak połączenia z siecią");
            alert.show();
        }

        //MyPagerAdapter myPagerAdapter = new MyPagerAdapter(MainActivity.this);

        //viewPager1.setAdapter(myPagerAdapter);

    }
}
