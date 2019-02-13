package com.example.a4ic1.projektkoncowyfilipowski.Activities;

import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.example.a4ic1.projektkoncowyfilipowski.Adapters.MyArrayAdapter;
import com.example.a4ic1.projektkoncowyfilipowski.Adapters.MyArrayAdapter2;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.Networking;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.PreviewText;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.Ramka;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.UploadFoto;
import com.example.a4ic1.projektkoncowyfilipowski.R;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ImageActivity extends AppCompatActivity {

    private ImageView imageVImage;
    private String imagePath;
    private ImageButton bDelImage;
    private String imagePath2;
    private File del;
    private ImageButton bEditImage;
    private int zoom;
    private ListView imageLV;
    private RelativeLayout imageContainer;
    private DrawerLayout drawerImage;
    private FrameLayout frameLayout;

    private Bitmap betterImageDecode(String filePath) {

        Bitmap myBitmap;
        BitmapFactory.Options options = new BitmapFactory.Options();    //opcje przekształcania bitmapy
        //options.inSampleSize = 0; // zmniejszenie jakości bitmapy 4x
        //
        myBitmap = BitmapFactory.decodeFile(filePath, options);
        return myBitmap;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_image);
        getSupportActionBar().hide();

        Bundle bundle = getIntent().getExtras();
        final String imagePath = bundle.getString("imagePath").toString();
        imagePath2 = imagePath;

        imageVImage = (ImageView) findViewById(R.id.imageVImage);
        bDelImage = (ImageButton) findViewById(R.id.bDelImage);
        bEditImage = (ImageButton) findViewById(R.id.bEditImage);
        imageLV = (ListView) findViewById(R.id.imageLV);
        imageContainer = (RelativeLayout) findViewById(R.id.imageContainer);
        drawerImage = (DrawerLayout) findViewById(R.id.drawerImage);
        frameLayout = (FrameLayout) findViewById(R.id.frameLayImage);

        //Log.e("ImageP", imagePath );
        Bitmap bmp = betterImageDecode(imagePath);

        imageVImage.setImageBitmap(bmp);

        bDelImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                AlertDialog.Builder alert = new AlertDialog.Builder(ImageActivity.this);
                alert.setTitle("Usuń zdjęcie");
                del = new File(imagePath2);
                alert.setMessage("Potwierdź usunięcie zdjęcia \"" + del.getName() + "\"");
                alert.setPositiveButton("Anuluj", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
                alert.setNegativeButton("Usuń", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        del.delete();
                        finish();
                    }
                });

                alert.show();
            }
        });

        bEditImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(ImageActivity.this, "Edit Image", Toast.LENGTH_SHORT).show();
            }
        });

        zoom = 0;
        int i = 0;
        imageVImage.setOnClickListener(new View.OnClickListener() {
            int i = 0;

            @Override
            public void onClick(View v) {
                i++;
                Handler handler = new Handler();
                Runnable r = new Runnable() {
                    @Override
                    public void run() {
                        i = 0;
                    }
                };
                if (i == 1) {
                    //Single click
                    handler.postDelayed(r, 250);
                } else if (i == 2) {
                    //Toast.makeText(ImageActivity.this, "Double Click", Toast.LENGTH_SHORT).show();
                    switch (zoom) {
                        case 0:
                            imageVImage.setScaleType(ImageView.ScaleType.CENTER_CROP);
                            break;
                        case 1:
                            imageVImage.setScaleType(ImageView.ScaleType.CENTER);
                            break;
                        case 2:
                            imageVImage.setScaleType(ImageView.ScaleType.FIT_CENTER);
                            break;
                    }
                    zoom++;
                    if (zoom >= 3) {
                        zoom = 0;
                    }
                }
            }
        });

        final String[] array= {"Fonts", "Upload", "Share"};

        final MyArrayAdapter2 adapter = new MyArrayAdapter2(
                this,
                R.layout.row_layout,
                array
        );
        imageLV.setAdapter(adapter);

        imageLV.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                switch(i){
                    case 0:
                        Intent intent = new Intent(ImageActivity.this, LettersActivity.class);
                        startActivityForResult(intent, 100);
                        break;
                    case 1:
                        Networking net = new Networking();
                        if(!net.isConnected(ImageActivity.this)) {
                            AlertDialog.Builder alert = new AlertDialog.Builder(ImageActivity.this);
                            alert.setTitle("Uwaga!");
                            alert.setCancelable(true);
                            alert.setMessage("Brak połączenia z siecią");
                            alert.show();
                        }else {
                            Bitmap map = betterImageDecode(imagePath2);
                            ByteArrayOutputStream stream = new ByteArrayOutputStream();
                            map.compress(Bitmap.CompressFormat.PNG, 100, stream);
                            UploadFoto uploadFoto = new UploadFoto(ImageActivity.this, stream.toByteArray());
                            uploadFoto.execute();
                        }
                        break;
                    case 2:
                        Intent share = new Intent(Intent.ACTION_SEND);
                        share.setType("image/jpeg"); //typ danych który chcemy współdzielić
                        SimpleDateFormat dFormat = new SimpleDateFormat("yyyyMMdd_HHmmss");
                        String d = dFormat.format(new Date());
                        String tempFileName = "temp.jpg"; // dodaj bieżąca datę do nazwy pliku

                        try {
                            String pic = Environment.getExternalStorageDirectory().getPath();
                            Bitmap bmp = betterImageDecode(imagePath2);
                            FileOutputStream fs = new FileOutputStream(pic + "/" + tempFileName);
                            bmp.compress(Bitmap.CompressFormat.JPEG, 100, fs);
                            fs.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                            Log.e("ImageActivity", "NOT SAVED");
                            Toast.makeText(ImageActivity.this, "PICTURE NOT SAVED!", Toast.LENGTH_SHORT).show();
                        }

//teraz utwórz tymczasowy plik (obiekt File), który potem będzie współdzielony
//wpisz do niego przekonwertowaną na byte[] bitmapę pobraną ze zdjęcia (patrz poprzednie lekcje)
//zapisz tymczasowy plik na dysku na karcie SD w znanej sobie lokalizacji

                        share.putExtra(Intent.EXTRA_STREAM, Uri.parse("file:///sdcard/temp.jpg")); //pobierz plik i podziel się nim:
                        startActivity(Intent.createChooser(share, "Podziel się plikiem!")); //pokazanie okna share

                        break;
                }
            }
        });


    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if(resultCode == 100) {
            drawerImage.closeDrawer(GravityCompat.START);

            Bundle extras = data.getExtras();
            String fontName = (String) extras.get("font");
            String text = (String) extras.get("text");
            int colorText = (int) extras.get("color");
            int colorBorder = (int) extras.get("colorBorder");

            Log.e("IKS", fontName + "|" + text);

            Typeface tf= Typeface.createFromAsset(getAssets(),"fonts/"+fontName);
            PreviewText prev= new PreviewText(ImageActivity.this, tf, text, 200, colorText, colorBorder);

            Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
            Rect rect = new Rect();
            paint.setTextSize(200);
            paint.setTypeface(tf);
            paint.getTextBounds(text, 0, text.length(), rect);

            RelativeLayout rl = new RelativeLayout(ImageActivity.this);
            frameLayout.addView(rl);

            rl.addView(prev);

            rl.getLayoutParams().width = rect.width();
            rl.getLayoutParams().height = rect.height();

            Log.e("WYMIARY", String.valueOf(rl.getLayoutParams().width) +" | "+ String.valueOf(rl.getLayoutParams().height)  +" | "+ String.valueOf(prev.getLayoutParams().width) +" | "+ String.valueOf(prev.getLayoutParams().height));

            final float[] startX = {0};
            final float[] startY = {0};
            final float[] X = {0};
            final float[] Y = {0};

            rl.setOnTouchListener(new View.OnTouchListener() {
                @Override
                public boolean onTouch(View v, MotionEvent event) {
                    final RelativeLayout view = (RelativeLayout) v;
                    Ramka ramka = new Ramka(ImageActivity.this, v.getLayoutParams().width, v.getLayoutParams().height);
                    switch(event.getAction()) {
                        case MotionEvent.ACTION_DOWN:
                            view.addView(ramka);
                            startX[0] = event.getRawX() - X[0];
                            startY[0] = event.getRawY() - Y[0];
                            break;
                        case MotionEvent.ACTION_MOVE:
                            X[0] = event.getRawX() - startX[0];
                            Y[0] = event.getRawY() - startY[0];
                            v.setX(X[0]);
                            v.setY(Y[0]);
                            break;
                        case MotionEvent.ACTION_UP:
                            view.removeViewAt(1);
                            break;
                    }
                    return true;
                }
            });
        }

    }
}
