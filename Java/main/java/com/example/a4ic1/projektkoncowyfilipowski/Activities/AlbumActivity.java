package com.example.a4ic1.projektkoncowyfilipowski.Activities;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Environment;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ListView;

import com.example.a4ic1.projektkoncowyfilipowski.R;

import java.io.File;

public class AlbumActivity extends AppCompatActivity {

    private ListView albumList;
    private String[] array;
    private ImageButton bAddDir;
    private EditText input;

    private void loadList () {
        albumList = (ListView) findViewById(R.id.albumList);
        bAddDir = (ImageButton) findViewById(R.id.bAddDir);

        File pic = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        File mojFolder = new File(pic.getPath() + "/Damian Filipowski");

        File[] dirs = mojFolder.listFiles();

        array = new String[dirs.length];

        for(int i =0;i<dirs.length;i++) {
            array[i] = dirs[i].getName();
        }

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(
                AlbumActivity.this,     // Context
                R.layout.row_layout,     // nazwa pliku xml naszego wiersza
                R.id.rowText,         // id pola txt w wierszu
                array );         // tablica przechowująca dane

        albumList.setAdapter(adapter);

        albumList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                //test
                Log.e("TAG","index = " + i);
                //Toast.makeText(AlbumActivity.this, "index = "+ i, Toast.LENGTH_SHORT).show();

                Intent intent = new Intent(AlbumActivity.this,AlbumActivity2.class);
                intent.putExtra("name", array[i]);
                startActivity(intent);

            }
        });
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        loadList();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_album);

        //getSupportActionBar().hide();

        loadList();

        bAddDir.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AlertDialog.Builder alert = new AlertDialog.Builder(AlbumActivity.this);
                alert.setTitle("Nowy folder");
                alert.setMessage("Podaj nazwę dla nowego folderu");
                //tutaj input
                input = new EditText(AlbumActivity.this);
                input.setText("Nowy Folder");
                alert.setView(input);
                //teraz butony jak poprzednio i
                //ok
                alert.setPositiveButton("Anuluj", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        //wyswietl which
                        dialog.dismiss();
                    }

                });
                //no
                alert.setNegativeButton("Utwórz", new DialogInterface.OnClickListener() {

                    public void onClick(DialogInterface dialog, int which) {
                        //wyswietl which
                        String dirName = input.getText().toString();

                        File pic = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
                        File newDir = new File(pic.getPath() + "/Damian Filipowski/" + dirName);
                        newDir.mkdirs();

                        loadList();
                    }
                });

                alert.show();


            }
        });


    }
}
