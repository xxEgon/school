package com.example.a4ic1.projektkoncowyfilipowski.Activities;

import android.animation.ObjectAnimator;
import android.content.DialogInterface;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.graphics.Point;
import android.hardware.SensorManager;
import android.os.Environment;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.hardware.Camera;
import android.view.Display;
import android.view.MotionEvent;
import android.view.OrientationEventListener;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.a4ic1.projektkoncowyfilipowski.Helpers.CameraPreview;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.Kolo;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.Miniatura;
import com.example.a4ic1.projektkoncowyfilipowski.R;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class CameraActivity extends AppCompatActivity {

    private Camera camera;
    private int cameraId = -1;
    private CameraPreview cameraPreview;
    private FrameLayout frameLayout;

    private Spinner spinner;
    private ImageButton takePictureBtn;
    private ImageButton savePictureBtn;
    private ImageButton cancelPictureBtn;
    private ImageButton switchCamera;
    private ImageButton whiteCamera;
    private ImageButton expoCamera;
    private ImageButton colorCamera;
    private ImageButton sizeCamera;
    private Camera.Parameters camParams;
    private int r;

    private ArrayList<Miniatura> listMini = new ArrayList<>();
    private ArrayList<byte[]> listByte= new ArrayList<byte[]>() ;
    private Kolo kolo;

    private OrientationEventListener orientationEventListener;

    private double oldX;

    private boolean backCamera = true;

    private int getCameraId() {
        int cid = 0;
        int camerasCount = Camera.getNumberOfCameras(); // gdy więcej niż jedna kamera

        for (int i = 0; i < camerasCount; i++) {
            Camera.CameraInfo cameraInfo = new Camera.CameraInfo();
            Camera.getCameraInfo(i, cameraInfo);

            if (backCamera) {
                if (cameraInfo.facing == Camera.CameraInfo.CAMERA_FACING_BACK) {
                    cid = i;
                }
                Log.e("CameraActivity", "CAMERA ID " + cid);
            } else {
                if (cameraInfo.facing == Camera.CameraInfo.CAMERA_FACING_FRONT) {
                    cid = i;
                }
                Log.e("CameraActivity", "CAMERA ID 2 " + cid);
            }
        }
        return cid;
    }


    private void initCamera() {
        boolean cam = getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA);

        if (!cam) {
            // uwaga - brak kamery

        } else {

            // wykorzystanie danych zwróconych przez kolejną funkcję getCameraId()

            cameraId = getCameraId();
            // jest jakaś kamera!
            if (cameraId < 0) {
                //?? nie ma przedniej ??
                backCamera = true;
                initCamera();
            } else {
                camera = Camera.open(cameraId);
                Log.e("CameraActivity", "OPEN CAMERA " + cameraId);
            }

        }
    }

    private void initPreview() {
        cameraPreview = new CameraPreview(CameraActivity.this, camera);
        frameLayout = (FrameLayout) findViewById(R.id.frameLayCamera);
        frameLayout.removeAllViews();
        frameLayout.addView(cameraPreview);

        Display display = getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        r = size.y / 6;
        kolo = new Kolo(CameraActivity.this, size.x / 2, size.y / 2, r);
        frameLayout.addView(kolo);
    }

    private void setMiniaturyPositions() {
        Display display = getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        for(int i = 0;i < listMini.size();i++) {
            ObjectAnimator.ofFloat(listMini.get(i), View.TRANSLATION_X, (float) (size.x/2 + (r * Math.cos(Math.toRadians(i* (360/listMini.size())))))-(size.x/10))
                    .setDuration(150) //ms
                    .start();
            ObjectAnimator.ofFloat(listMini.get(i), View.TRANSLATION_Y, (float) (size.y/2 + (r * Math.sin(Math.toRadians(i* (360/listMini.size())))))-(size.x/10))
                    .setDuration(150) //ms
                    .start();
        }
    }

    private Bitmap rotateBitmap(Bitmap bitmap) {
        Matrix matrix = new Matrix();
        if(backCamera)
            matrix.postRotate(90);
        else
            matrix.postRotate(-90);
        Bitmap rotatedBitmap = Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight(), matrix, true);
        return rotatedBitmap;
    }

    void deleteMiniatura (View view) {
        int index = listMini.lastIndexOf(view);
        listMini.remove(view);
        listByte.remove(index);
        frameLayout.removeView(view);
        setMiniaturyPositions();
        if(listMini.size() == 0)
            spinner.setVisibility(View.INVISIBLE);

    }

    private Camera.PictureCallback camPictureCallback = new Camera.PictureCallback() {
        @Override
        public void onPictureTaken(byte[] data, Camera camera) {
            //cancelPictureBtn.setVisibility(View.VISIBLE);
            //savePictureBtn.setVisibility(View.VISIBLE);
            spinner.setVisibility(View.VISIBLE);

            // zapisz dane zdjęcia w tablicy typu byte[]
            // do poźniejszego wykorzystania
            // ponieważ zapis zdjęcia w galerii powinien być dopiero po akceptacji butonem
            Display display = getWindowManager().getDefaultDisplay();
            final Point size = new Point();
            display.getSize(size);

            final byte[] fdata = data;
            listByte.add(fdata);
            Bitmap bitmap = BitmapFactory.decodeByteArray(fdata, 0, data.length);

            Miniatura mini = new Miniatura(CameraActivity.this, Bitmap.createScaledBitmap(rotateBitmap(bitmap) , size.x/5, size.x/5, false), size.x/5, size.x/5, 2);
            mini.setX((float) ((size.x/2) -(size.x/10)));
            mini.setY((float) ((size.y/2) -(size.x/10)));

            mini.setOnTouchListener(new View.OnTouchListener() {
                @Override
                public boolean onTouch(View v, MotionEvent event) {
                    switch(event.getAction()) {
                        case MotionEvent.ACTION_DOWN:
                            oldX = event.getRawX();
                            break;
                        case MotionEvent.ACTION_MOVE:

                            v.setX(event.getRawX() - (size.x/10));
                            if(Math.abs(event.getRawX() - oldX) > 150) {
                                //Log.e("USUN", "no");
                                deleteMiniatura(v);
                            }
                            break;
                        case MotionEvent.ACTION_UP:
                            v.setX((int)oldX - (size.x/10));
                            oldX = 0;
                            break;
                    }
                    return false;
                }
            });
            mini.setOnLongClickListener(new View.OnLongClickListener() {
                @Override
                public boolean onLongClick(View v) {
                    final View view = v;
                    android.app.AlertDialog.Builder alert = new android.app.AlertDialog.Builder(CameraActivity.this);
                    alert.setTitle("Wybierz akcję:");
                    final String[] opcje = {"Podgląd zdjęcia", "Usuń bieżące", "Zapisz bieżące"};
                    alert.setItems(opcje, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            switch(which) {
                                case 0:
                                    byte[] t = listByte.get(listMini.lastIndexOf(view));
                                    Bitmap bitmap1 = BitmapFactory.decodeByteArray(t, 0, t.length);
                                    double szer = (size.x) * (2.0 / 3.0);
                                    double wys = (size.y) * (2.0 / 3.0);
                                    Miniatura podglad = new Miniatura(CameraActivity.this, Bitmap.createScaledBitmap(rotateBitmap(bitmap1) , (int) szer, (int) wys, false), (int) szer, (int) wys, 20);
                                    double szer2 = (size.x) * (1.0 / 3.0);
                                    double wys2 = (size.y) * (1.0 / 3.0);
                                    podglad.setX((int) szer2 / 2);
                                    podglad.setY((int) wys2 / 2);
                                    podglad.setOnClickListener(new View.OnClickListener() {
                                        @Override
                                        public void onClick(View v) {
                                            frameLayout.removeView(v);
                                        }
                                    });
                                    frameLayout.addView(podglad);
                                    break;
                                case 1:
                                    deleteMiniatura(view);
                                    break;
                                case 2:
                                    savePictureOnDisk(listByte.get(listMini.lastIndexOf(view)));
                                    break;
                            }
                        }
                    });
                    alert.show();
                    return false;
                }
            });
            frameLayout.addView(mini);
            listMini.add(mini);

            setMiniaturyPositions();
            Log.e("IMG", String.valueOf(listMini.size()));

//            savePictureBtn.setOnClickListener(new View.OnClickListener() {
//                @Override
//                public void onClick(View view) {
//                    //savePictureOnDisk(fdata);
//                }
//            });
            // odswież (lub nie) kamerę (zapobiega to przycięciu się kamery po zrobieniu zdjęcia)
            camera.startPreview();

        }
    };

    void savePictureOnDisk2(byte[] fdata,String folderName, int licz) {
        try {
            File pic = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
            final File mojFolder = new File(pic.getPath() + "/Damian Filipowski");
            SimpleDateFormat dFormat = new SimpleDateFormat("yyyyMMdd_HHmmss");
            String d = dFormat.format(new Date());
            Bitmap map = BitmapFactory.decodeByteArray(fdata, 0, fdata.length);
            map = rotateBitmap(map);
            FileOutputStream fs = new FileOutputStream(mojFolder.getPath() + "/" + folderName + "/" + d + "-" + String.valueOf(licz) + ".jpg");
            map.compress(Bitmap.CompressFormat.JPEG, 100, fs);
            fs.close();
        } catch (IOException e) {
            e.printStackTrace();
            Log.e("CameraActivity", "NOT SAVED");
            Toast.makeText(CameraActivity.this, "PICTURE NOT SAVED!", Toast.LENGTH_SHORT).show();
        }
    }

    private void savePictureOnDisk(byte[] data) {
        AlertDialog.Builder alert = new AlertDialog.Builder(CameraActivity.this);
        alert.setTitle("Wybierz folder do zapisu");

        File pic = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        final File mojFolder = new File(pic.getPath() + "/Damian Filipowski");

        File[] dirs = mojFolder.listFiles();

        final String[] opcje = new String[dirs.length];

        for (int i = 0; i < dirs.length; i++) {
            opcje[i] = dirs[i].getName();
        }
        final byte[] fdata = data;
        alert.setItems(opcje, new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                savePictureOnDisk2(fdata, opcje[which], 0);
                cancelPictureBtn.setVisibility(View.INVISIBLE);
                savePictureBtn.setVisibility(View.INVISIBLE);
                camera.startPreview();
            }
        });
        alert.show();
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_camera);
        getSupportActionBar().hide();

        takePictureBtn = (ImageButton) findViewById(R.id.takePicture);
        savePictureBtn = (ImageButton) findViewById(R.id.savePicture);
        cancelPictureBtn = (ImageButton) findViewById(R.id.cancelPicture);
        switchCamera = (ImageButton) findViewById(R.id.switchCamera);
        whiteCamera = (ImageButton) findViewById(R.id.whiteCamera);
        expoCamera = (ImageButton) findViewById(R.id.expoCamera);
        colorCamera = (ImageButton) findViewById(R.id.colorCamera);
        sizeCamera = (ImageButton) findViewById(R.id.sizeCamera);
        spinner = (Spinner) findViewById(R.id.spinnerCamera);

        String[] tSpinner = {"[Opcje]", "Zapisz\nostatnie", "Zapisz\nwszystkie","Usuń\nwszystkie"};
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(
                CameraActivity.this,     // Context
                R.layout.row_spinner_camera,     // nazwa pliku xml naszego wiersza
                R.id.rowTextSpinner,         // id pola txt w wierszu
                tSpinner );         // tablica przechowująca dane

        spinner.setAdapter(adapter);

        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                switch(i) {
                    case 1:
                        savePictureOnDisk(listByte.get(listMini.size() - 1));
                        break;
                    case 2:
                        AlertDialog.Builder alert = new AlertDialog.Builder(CameraActivity.this);
                        alert.setTitle("Wybierz folder do zapisu wszystkich zdjęć");

                        File pic = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
                        final File mojFolder = new File(pic.getPath() + "/Damian Filipowski");

                        File[] dirs = mojFolder.listFiles();

                        final String[] opcje = new String[dirs.length];
                        for (int j = 0; j < dirs.length; j++) {
                            opcje[j] = dirs[j].getName();
                        }
                        alert.setItems(opcje, new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {
                                for(int j = 0 ;j < listMini.size(); j++) {
                                    savePictureOnDisk2(listByte.get(j), opcje[which], j);
                                    Log.e("save", String.valueOf(j));
                                }
                                camera.startPreview();
                            }
                        });
                        alert.show();
                        break;
                    case 3:
                        while(listMini.size() > 0)
                            deleteMiniatura(listMini.get(0));
                        break;
                }
                spinner.setSelection(0);
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });

        takePictureBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                camera.startPreview();
                camera.takePicture(null, null, camPictureCallback);
            }
        });

        cancelPictureBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                camera.startPreview();
                cancelPictureBtn.setVisibility(View.INVISIBLE);
                savePictureBtn.setVisibility(View.INVISIBLE);
            }
        });

        switchCamera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (camera != null) {
                    camera.stopPreview();
                    //linijka nieudokumentowana w API, bez niej jest crash przy wznawiamiu kamery
                    cameraPreview.getHolder().removeCallback(cameraPreview);
                    camera.release();
                    camera = null;
                }

                if (backCamera) {
                    Log.e("Camera", "BEFORE: BACK");
                    backCamera = false;
                } else {
                    Log.e("Camera", "BEFORE: FRONT");
                    backCamera = true;
                }

                if (camera == null) {
                    initCamera();
                    initPreview();
                }

                if (backCamera) {
                    Log.e("Camera", "AFTER: BACK");
                } else {
                    Log.e("Camera", "AFTER: FRONT");
                }

                //camera.startPreview();
                cancelPictureBtn.setVisibility(View.INVISIBLE);
                savePictureBtn.setVisibility(View.INVISIBLE);
                while(listMini.size() > 0)
                    deleteMiniatura(listMini.get(0));

            }
        });

        whiteCamera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                camParams = camera.getParameters();
                if (camParams != null) {
                    List<String> listWhite;
                    listWhite = camParams.getSupportedWhiteBalance();

                    final String[] arrayWhite = new String[listWhite.size()];

                    for (int i = 0; i < listWhite.size(); i++) {
                        arrayWhite[i] = listWhite.get(i);
                    }

                    AlertDialog.Builder alert = new AlertDialog.Builder(CameraActivity.this);
                    alert.setTitle("Wybierz balans bieli");
                    alert.setItems(arrayWhite, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            camParams.setWhiteBalance(arrayWhite[which]);
                            camera.setParameters(camParams);
                        }
                    });
                    alert.show();
                }
            }
        });
        expoCamera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                camParams = camera.getParameters();
                if (camParams != null) {
                    int minExpo = camParams.getMinExposureCompensation();
                    int maxExpo = camParams.getMaxExposureCompensation();
                    int stepExpo = (int) camParams.getExposureCompensationStep();
                    Log.e("stepExpo", stepExpo + " , "+ minExpo + " , " + maxExpo);



                    final String[] arrayExpo = new String[(Math.abs(maxExpo) + Math.abs(minExpo))/stepExpo + 1];

                    for (int i = 0; i < arrayExpo.length; i++) {
                        arrayExpo[i] = (minExpo + (i* stepExpo)) + "";
                    }

                    AlertDialog.Builder alert = new AlertDialog.Builder(CameraActivity.this);
                    alert.setTitle("Wybierz ekspozycję");
                    alert.setItems(arrayExpo, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            camParams.setExposureCompensation( new Integer(arrayExpo[which]) );
                            camera.setParameters(camParams);
                        }
                    });
                    alert.show();
                }
            }
        });
        colorCamera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                camParams = camera.getParameters();
                if (camParams != null) {
                    List<String> listColor;
                    listColor = camParams.getSupportedColorEffects();

                    final String[] arrayColor = new String[listColor.size()];

                    for (int i = 0; i < listColor.size(); i++) {
                        arrayColor[i] = listColor.get(i);
                    }

                    AlertDialog.Builder alert = new AlertDialog.Builder(CameraActivity.this);
                    alert.setTitle("Wybierz filtr");
                    alert.setItems(arrayColor, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            camParams.setColorEffect(arrayColor[which]);
                            camera.setParameters(camParams);
                        }
                    });
                    alert.show();
                }
            }
        });
        sizeCamera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                camParams = camera.getParameters();
                if (camParams != null) {
                    final List<Camera.Size> listSize;
                    listSize = camParams.getSupportedPictureSizes();

                    final String[] arraySize = new String[listSize.size()];

                    for (int i = 0; i < listSize.size(); i++) {
                        arraySize[i] = listSize.get(i).width + "x" + listSize.get(i).height;
                    }

                    AlertDialog.Builder alert = new AlertDialog.Builder(CameraActivity.this);
                    alert.setTitle("Wybierz rozmiar");
                    alert.setItems(arraySize, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            camParams.setPictureSize(listSize.get(which).width,listSize.get(which).height);
                            camera.setParameters(camParams);
                        }
                    });
                    alert.show();
                }
            }
        });

        final boolean[] poziomo = {false};
        final View[] buttonsToRotate = {switchCamera, whiteCamera, expoCamera, colorCamera, sizeCamera};

        orientationEventListener = new OrientationEventListener(this, SensorManager.SENSOR_DELAY_NORMAL) {
            @Override
            public void onOrientationChanged(int i) {
                // i zwraca kąt 0 - 360 stopni podczas obracania ekranem w osi Z
                // tutaj wykonaj animacje butonów i miniatur zdjęć
                //Log.e("obrot",String.valueOf(i));
                if(i>260 && i<290 && !poziomo[0]){
                    poziomo[0] = true;
                    for(int j = 0;j < listMini.size();j++)
                        ObjectAnimator.ofFloat(listMini.get(j), View.ROTATION, 90)
                                .setDuration(300)
                                .start();
                    for(int j = 0;j< buttonsToRotate.length;j++)
                        ObjectAnimator.ofFloat(buttonsToRotate[j], View.ROTATION, 90)
                                .setDuration(300)
                                .start();
                } else if((i > 350 || i < 10) && poziomo[0]){
                    poziomo[0] = false;
                    for(int j = 0;j < listMini.size();j++)
                        ObjectAnimator.ofFloat(listMini.get(j), View.ROTATION, 0)
                                .setDuration(300)
                                .start();
                    for(int j = 0;j< buttonsToRotate.length;j++)
                        ObjectAnimator.ofFloat(buttonsToRotate[j], View.ROTATION, 0)
                                .setDuration(300)
                                .start();
                }
            }
        };



    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.e("CameraActivity", "Pause camera");

        if (camera != null) {
            camera.stopPreview();
            //linijka nieudokumentowana w API, bez niej jest crash przy wznawiamiu kamery
            cameraPreview.getHolder().removeCallback(cameraPreview);
            camera.release();
            camera = null;
        }
        orientationEventListener.disable();
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.e("CameraActivity", "Resume camera");

        if (camera == null) {
            //zainicjalizuj kamerę od nowa
            // czyli uruchom funkcje initCamera() i initPreview()
            initCamera();
            initPreview();
        }
        if (orientationEventListener.canDetectOrientation()) {
            // Log - listener działa
            orientationEventListener.enable();
        } else {
            // Log - listener nie działa
        }

    }

    @Override
    protected void onRestart() {
        super.onRestart();
        Log.e("CameraActivity", "Restart camera");

    }
}



