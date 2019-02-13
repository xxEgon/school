package com.example.a4ic1.projektkoncowyfilipowski.Activities;

import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.example.a4ic1.projektkoncowyfilipowski.Helpers.ImageData;
import com.example.a4ic1.projektkoncowyfilipowski.R;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class EditCollageActivity extends AppCompatActivity {

    private FrameLayout  collageContainer;
    private ImageView nowImage;
    private ImageButton bSaveCollage;

    void saveCollageOnDisk(Bitmap map) {
        try {
            File pic = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
            final File mojFolder = new File(pic.getPath() + "/Damian Filipowski/Kolaże");
            mojFolder.mkdirs();
            SimpleDateFormat dFormat = new SimpleDateFormat("yyyyMMdd_HHmmss");
            String d = dFormat.format(new Date());
            FileOutputStream fs = new FileOutputStream(mojFolder.getPath() +"/"+ d + ".jpg");
            map.compress(Bitmap.CompressFormat.JPEG, 100, fs);
            fs.close();
            Toast.makeText(EditCollageActivity.this, "SAVING...", Toast.LENGTH_SHORT).show();
        } catch (IOException e) {
            e.printStackTrace();
            Log.e("EditCollageActivity", "NOT SAVED");
            Toast.makeText(EditCollageActivity.this, "PICTURE NOT SAVED!", Toast.LENGTH_SHORT).show();
        }
        finally {
            finish();
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_collage);

        bSaveCollage = (ImageButton) findViewById(R.id.bSaveCollage);
        bSaveCollage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                collageContainer.setDrawingCacheEnabled(true);
                Bitmap b = collageContainer.getDrawingCache(true);
                saveCollageOnDisk(b);
            }
        });

        ArrayList<ImageData> list = (ArrayList<ImageData>) getIntent().getSerializableExtra("list");

        collageContainer = (FrameLayout) findViewById(R.id.collageContainer);

        for(int i = 0;i< list.size();i++) {
            ImageView iv = new ImageView(EditCollageActivity.this);
            iv.setX(list.get(i).getX());
            iv.setY(list.get(i).getY());
            iv.setLayoutParams(new LinearLayout.LayoutParams(list.get(i).getW()-1,list.get(i).getH()-1));
            iv.setBackgroundColor(Color.WHITE);
            iv.setImageResource(R.drawable.ic_add_black_48dp);
            iv.setScaleType(ImageView.ScaleType.CENTER);
            collageContainer.addView(iv);

            iv.setOnLongClickListener(new View.OnLongClickListener() {
                @Override
                public boolean onLongClick(View v) {
                    final String[] array = {"Wybierz z galerii", "Zrób zdjęcie"};
                    nowImage = (ImageView) v;
                    AlertDialog.Builder alert = new AlertDialog.Builder(EditCollageActivity.this);
                    alert.setTitle("Wybierz opcję");
                    alert.setItems(array, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            switch(which) {
                                case 0:
                                    Intent intent = new Intent(Intent.ACTION_PICK);
                                    intent.setType("image/*");
                                    startActivityForResult(intent, 100); // 100 - stała wartość, która posłuży do identyfikacji tej akcji
                                    break;
                                case 1:
                                    Intent intent2 = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                                    //jeśli jest dostępny aparat
                                    if (intent2.resolveActivity(getPackageManager()) != null) {
                                        startActivityForResult(intent2, 200); // 200 - jw
                                    }
                                    break;
                            }
                        }
                    });
                    alert.show();
                    return false;
                }
            });
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(resultCode != 0){
            switch (requestCode) {
                case 100:
                    try {
                        Uri imgData = data.getData();
                        InputStream stream = getContentResolver().openInputStream(imgData);
                        Bitmap b = BitmapFactory.decodeStream(stream);
                        nowImage.setImageBitmap(b);
                    } catch (IOException ex) {
                    }
                    break;
                case 200:
                    Bundle extras = data.getExtras();
                    Bitmap bi = (Bitmap) extras.get("data");
                    nowImage.setImageBitmap(bi);
                    break;
            }
            nowImage.setScaleType(ImageView.ScaleType.CENTER_CROP);
        }
    }
}
