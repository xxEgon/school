package com.example.a4ic1.projektkoncowyfilipowski.Activities;

import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.Point;
import android.graphics.drawable.ColorDrawable;
import android.os.Environment;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import com.example.a4ic1.projektkoncowyfilipowski.Helpers.CustomImageView;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.DatabaseManager;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.Note;
import com.example.a4ic1.projektkoncowyfilipowski.R;

import java.io.File;

public class AlbumActivity2 extends AppCompatActivity {

    private TextView album2Text;
    private ImageButton bDelDir;
    private EditText input;
    private String name;
    private LinearLayout.LayoutParams lparams;
    private ScrollView svAlbum2;
    private LinearLayout linAlbum2;
    private String image_path_2;
    private String[] ImgPaths;
    private int licz;
    private DatabaseManager db;
    private int noteColor = Color.BLACK;

    @Override
    protected void onDestroy() {
        super.onDestroy();
        db.close();
    }

    @Override
    protected void onPause() {
        super.onPause();
        db.close();
    }

    private Bitmap betterImageDecode(String filePath) {

        Bitmap myBitmap;
        BitmapFactory.Options options = new BitmapFactory.Options();    //opcje przekształcania bitmapy
        options.inSampleSize = 4; // zmniejszenie jakości bitmapy 4x
        //
        myBitmap = BitmapFactory.decodeFile(filePath, options);
        return myBitmap;
    }
    @Override
    protected void onRestart() {
        super.onRestart();
        linAlbum2 = (LinearLayout) findViewById(R.id.linAlbum2);
        linAlbum2.removeAllViews();
        loadGallery();
    }

    private void loadGallery() {
        db = new DatabaseManager(
                AlbumActivity2.this, // activity z galerią zdjęć
                "NotatkiFilipowskiDamian.db", // nazwa bazy
                null,
                4 //wersja bazy, po zmianie schematu bazy należy ją zwiększyć
        );

        File pic = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        File thisDir = new File(pic.getPath() + "/Damian Filipowski/" + name);

        Display display = getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        //Log.e("DS", size.x + "");
        //Log.e("DS", size.y + "");
        lparams = new LinearLayout.LayoutParams(size.x, size.y / 3);

        int i = 0;
        int j = 0;

        int liczImg = 0;

        for (File file : thisDir.listFiles()) {
            if (file.isFile()) {
                liczImg++;
            }
        }
        ImgPaths = new String[liczImg];

        boolean lastLong = false;
        if (liczImg % 2 == 1) {
            lastLong = true;
        }
       // Log.e("DS4", lastLong + "");
        licz = 1;

        LinearLayout linLay = null;
        for (File file : thisDir.listFiles()) {
            if (file.isFile()) {

                final String imagepath = file.getPath();
                Bitmap bmp = betterImageDecode(imagepath);
                image_path_2 = imagepath;
                ImgPaths[licz-1] = imagepath;
                //Log.e("DS5", imagepath + ", " + ImgPaths[licz-1]);


//                final ImageView imageV = new ImageView(AlbumActivity2.this);
//                imageV.setImageBitmap(bmp); // wstawienie bitmapy do ImageView
//                imageV.setScaleType(ImageView.ScaleType.CENTER_CROP);
//                imageV.setId(licz-1);
                final CustomImageView imageV = new CustomImageView(AlbumActivity2.this, licz-1, bmp);


                if (lastLong && liczImg == licz) {
                    linLay = new LinearLayout(AlbumActivity2.this);
                    linLay.setOrientation(LinearLayout.HORIZONTAL);
                    linLay.setLayoutParams(lparams);
                    //Log.e("DS3", liczImg + ", " + licz);
                    imageV.setLayoutParams(lparams);
                    linLay.addView(imageV);
                    linAlbum2.addView(linLay);
                } else {
                    if (j == 0) {
                        if (i == 0) {
                            linLay = new LinearLayout(AlbumActivity2.this);
                            linLay.setOrientation(LinearLayout.HORIZONTAL);
                            linLay.setLayoutParams(lparams);

                            double szer = (size.x) * (1.0 / 3.0);
                            //Log.e("DS1", szer + "");
                            imageV.setLayoutParams(new LinearLayout.LayoutParams((int) szer, size.y / 3));
                            linLay.addView(imageV);
                        }
                        if (i == 1) {
                            double szer = (size.x) * (2.0 / 3.0);
                            //Log.e("DS2", szer + "");
                            imageV.setLayoutParams(new LinearLayout.LayoutParams((int) szer, size.y / 3));

                            linLay.addView(imageV);
                            linAlbum2.addView(linLay);
                        }
                    } else {
                        if (i == 0) {
                            linLay = new LinearLayout(AlbumActivity2.this);
                            linLay.setOrientation(LinearLayout.HORIZONTAL);
                            linLay.setLayoutParams(lparams);

                            double szer = (size.x) * (2.0 / 3.0);
                            //Log.e("DS2", szer + "");
                            imageV.setLayoutParams(new LinearLayout.LayoutParams((int) szer, size.y / 3));

                            linLay.addView(imageV);
                        } else if (i == 1) {
                            double szer = (size.x) * (1.0 / 3.0);
                            //Log.e("DS1", szer + "");
                            imageV.setLayoutParams(new LinearLayout.LayoutParams((int) szer, size.y / 3));

                            linLay.addView(imageV);
                            linAlbum2.addView(linLay);
                        }
                    }
                }

                //Log.e("Album2", imagepath + ", " + image_path_2);
                imageV.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        Intent intent = new Intent(AlbumActivity2.this,ImageActivity.class);
                        intent.putExtra("imagePath", ImgPaths[view.getId()]);
                        startActivity(intent);
                    }
                });
                imageV.setOnLongClickListener(new View.OnLongClickListener() {
                    @Override
                    public boolean onLongClick(View v) {
                        final View v1 = v;

                        final View view = View.inflate(AlbumActivity2.this, R.layout.dialog_add_note, null);

                        LinearLayout viewColor = (LinearLayout) view.findViewById(R.id.dialogAddNotesColors);

                        int[] colorTab= {Color.RED, Color.GREEN, Color.BLUE, Color.MAGENTA};

                        for(int i=0;i<4;i++) {
                            Button colorBtn = new Button(AlbumActivity2.this);
                            colorBtn.setBackgroundColor(colorTab[i]);
                            colorBtn.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,
                                    LinearLayout.LayoutParams.MATCH_PARENT,
                                    0.25f));
                            colorBtn.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View view) {
                                    noteColor = ((ColorDrawable) view.getBackground()).getColor();
                                }
                            });
                            viewColor.addView(colorBtn);
                        }

                        AlertDialog.Builder alert = new AlertDialog.Builder(AlbumActivity2.this);
                        alert.setTitle("Dodaj notatkę");
                        alert.setMessage("Podaj tytuł, treść oraz kolor");
                        alert.setView(view);
                        alert.setPositiveButton("Anuluj", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {
                                dialog.dismiss();
                            }

                        });
                        alert.setNegativeButton("Utwórz", new DialogInterface.OnClickListener() {

                            public void onClick(DialogInterface dialog, int which) {
                                //wyswietl which
                                EditText etTitle = (EditText) view.findViewById(R.id.dialogAddNotesTitle);
                                EditText etText = (EditText) view.findViewById(R.id.dialogAddNotesText);
                                db.insert(String.valueOf(etTitle.getText()), String.valueOf(etText.getText()), String.valueOf(noteColor) ,ImgPaths[v1.getId()]);
                                //Note note = new Note(String.valueOf(etTitle.getText()), String.valueOf(etText.getText()), String.valueOf(noteColor) ,ImgPaths[v1.getId()]);
                                //db.insert(note.getTitle(), note.getText(), note.getColor(), note.getPath());
                                //Log.e("NOTE", String.valueOf(etTitle.getText()) + " - " + String.valueOf(etText.getText()) + " - " + String.valueOf(noteColor) + " - " + ImgPaths[v1.getId()]);
                            }
                        });

                        alert.show();

                        return false;
                    }
                });

                licz++;
                i++;
                if (i >= 2) {
                    i = 0;
                    if (j == 1)
                        j = 0;
                    else
                        j = 1;
                }
            }
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_album2);

        getSupportActionBar().hide();

        Bundle bundle = getIntent().getExtras();
        name = bundle.getString("name").toString();

        svAlbum2 = (ScrollView) findViewById(R.id.svAlbum2);
        linAlbum2 = (LinearLayout) findViewById(R.id.linAlbum2);
        bDelDir = (ImageButton) findViewById(R.id.bDelDir);

        bDelDir.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AlertDialog.Builder alert = new AlertDialog.Builder(AlbumActivity2.this);
                alert.setTitle("Usuń folder");
                alert.setMessage("Potwierdź usunięcie folderu \"" + name + "\"");
                alert.setPositiveButton("Anuluj", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
                alert.setNegativeButton("Usuń", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {

                        File pic = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
                        File del = new File(pic.getPath() + "/Damian Filipowski/" + name);
                        for (File file : del.listFiles()) {
                            file.delete();
                        }
                        del.delete();
                        finish();
                    }
                });

                alert.show();
            }
        });

        loadGallery();


    }
}
