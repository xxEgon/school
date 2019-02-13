package com.example.a4ic1.projektkoncowyfilipowski.Activities;

import android.content.Intent;
import android.content.res.AssetManager;
import android.graphics.Color;
import android.graphics.Typeface;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.example.a4ic1.projektkoncowyfilipowski.Helpers.MyColorPicker;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.PreviewText;
import com.example.a4ic1.projektkoncowyfilipowski.R;

public class LettersActivity extends AppCompatActivity {

    private String[] tFonts;
    private LinearLayout linLetters;
    private RelativeLayout canLetters;
    private EditText editLetters;
    private Typeface lastTF;
    private String lastTFstring;
    private ImageButton saveLetters;
    private ImageButton changeColor;
    private ImageButton changeBorder;
    private RelativeLayout containerLetters;

    private int colorText = Color.RED;
    private int colorBorder = Color.YELLOW;

    public void removeColorPicker (View v) {
        containerLetters.removeView(v);
    }

    public void changeColor (int WHICH_COLOR, int color) {
        if(color != 0) {
            switch (WHICH_COLOR) {
                case 0:
                    colorText = color;
                    break;
                case 1:
                    colorBorder = color;
                    break;
            }
            canLetters.removeAllViews();
            PreviewText prev = new PreviewText(LettersActivity.this, lastTF, String.valueOf(editLetters.getText()), 100, colorText, colorBorder);
            canLetters.addView(prev);
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_letters);
        getSupportActionBar().hide();

        linLetters = (LinearLayout) findViewById(R.id.linLetters);
        canLetters = (RelativeLayout) findViewById(R.id.canLetters);
        editLetters = (EditText) findViewById(R.id.editLetters);
        saveLetters = (ImageButton) findViewById(R.id.bSaveLetters);
        changeColor = (ImageButton) findViewById(R.id.colorText);
        containerLetters = (RelativeLayout) findViewById(R.id.containerLetters);
        changeBorder = (ImageButton) findViewById(R.id.colorTextBorder);

        try {
            AssetManager assetManager = getAssets();
            tFonts = assetManager.list("fonts"); // fonts to nazwa podfolderu w assets

            lastTFstring = tFonts[0];

            for(int i =0 ;i< tFonts.length;i++) {
                TextView tv = new TextView(LettersActivity.this);
                tv.setText("Zażółć gęślą jaźń");
                Typeface tf= Typeface.createFromAsset(getAssets(),"fonts/"+tFonts[i]);
                tv.setTypeface (tf);
                tv.setTextColor(Color.BLACK);
                tv.setTextSize(30);
                final int finalI = i;
                tv.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        canLetters.removeAllViews();
                        Typeface tf= Typeface.createFromAsset(getAssets(),"fonts/"+tFonts[finalI]);
                        PreviewText prev= new PreviewText(LettersActivity.this, tf, String.valueOf(editLetters.getText()), 100, colorText, colorBorder);
                        lastTF = tf;
                        lastTFstring = tFonts[finalI];
                        canLetters.addView(prev);
                    }
                });
                linLetters.addView(tv);

                if(i==0)
                    lastTF = tf;
            }

        }
        catch (Exception e) {

        }

        TextWatcher textWatcher = new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void afterTextChanged(Editable editable) {
                canLetters.removeAllViews();
                PreviewText prev= new PreviewText(LettersActivity.this, lastTF, String.valueOf(editLetters.getText()), 100, colorText, colorBorder);
                canLetters.addView (prev);
            }
        };
        editLetters.addTextChangedListener(textWatcher);

        saveLetters.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent();
                intent.putExtra("text", String.valueOf(editLetters.getText()));
                intent.putExtra("font", lastTFstring);
                intent.putExtra("color", colorText);
                intent.putExtra("colorBorder", colorBorder);
                setResult(100, intent);
                finish();
            }
        });

        changeColor.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                MyColorPicker colorPicker = new MyColorPicker(LettersActivity.this, 0);
                containerLetters.addView(colorPicker);
                //Log.e("CH_C", "klik");
            }
        });
        changeBorder.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                MyColorPicker colorPicker = new MyColorPicker(LettersActivity.this, 1);
                containerLetters.addView(colorPicker);
                //Log.e("CH_C", "klik");
            }
        });

    }
}
