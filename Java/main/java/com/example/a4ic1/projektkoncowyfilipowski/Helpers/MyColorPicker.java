package com.example.a4ic1.projektkoncowyfilipowski.Helpers;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;

import com.example.a4ic1.projektkoncowyfilipowski.Activities.LettersActivity;
import com.example.a4ic1.projektkoncowyfilipowski.R;

/**
 * Created by Damian on 30-11-2017.
 */
public class MyColorPicker extends RelativeLayout{

    private RelativeLayout relativeLayout;
    private int color = 0;
    private int WHICH_COLOR;

    public MyColorPicker(Context context, int _WHICH_COLOR ) {
        super(context);
        WHICH_COLOR = _WHICH_COLOR;
        init(context);
    }

    private void init (final Context context) {
        //relativeLayout = new RelativeLayout(context);
        this.setLayoutParams(new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        this.setBackgroundColor(Color.argb(220, 0, 0, 0));

        final ImageView iv = new ImageView(context);
        iv.setImageResource(R.drawable.picker);
        iv.setLayoutParams(new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        iv.setDrawingCacheEnabled(true);
        this.addView(iv);

        ImageButton ibAccept = new ImageButton(context);
        ibAccept.setImageResource(R.drawable.ic_done_black_48dp);
        ibAccept.setLayoutParams(new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        this.addView(ibAccept);

        ImageButton ibCancel = new ImageButton(context);
        ibCancel.setImageResource(R.drawable.ic_clear_black_48dp);
        RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        params.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
        ibCancel.setLayoutParams(params);
        this.addView(ibCancel);

        final View that = this;

        ibCancel.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                ((LettersActivity) context).removeColorPicker(that);
            }
        });

        ibAccept.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                ((LettersActivity) context).changeColor(WHICH_COLOR, color);
            }
        });

        iv.setOnTouchListener(new OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                switch(motionEvent.getAction()) {
                    case MotionEvent.ACTION_MOVE:
                    Bitmap bmp = iv.getDrawingCache();
                        color = bmp.getPixel((int)motionEvent.getX(), (int)motionEvent.getY());
                        Log.e("kolor", String.valueOf(color));
                        break;
                }
                return true;
            }
        });


    }

}
