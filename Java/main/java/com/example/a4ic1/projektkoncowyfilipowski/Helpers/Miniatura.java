package com.example.a4ic1.projektkoncowyfilipowski.Helpers;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.widget.ImageView;
import android.widget.LinearLayout;

/**
 * Created by 4ic1 on 2017-10-27.
 */
public class Miniatura extends ImageView {

    private Bitmap smallBmp;
    private int size;
    private int size2;
    private int stroke;
    public Miniatura(Context context, Bitmap smallBmp, int _size, int _size2, int _stroke) {
        super(context);
        size = _size;
        size2 = _size2;
        stroke = _stroke;
        this.setImageBitmap(smallBmp);
        this.setScaleType(ImageView.ScaleType.CENTER_CROP);
        this.setLayoutParams( new LinearLayout.LayoutParams(size, size2));
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
        paint.setAntiAlias(true);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(stroke);
        paint.setColor(Color.argb(150, 255, 255, 255)); // lub paint.setColor(Color.RED);
        canvas.drawRect( 0,0 ,size ,size2 , paint);
    }
}
