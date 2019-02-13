package com.example.a4ic1.projektkoncowyfilipowski.Helpers;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.view.View;

/**
 * Created by 4ic1 on 2017-10-27.
 */
public class Kolo extends View{
    private Canvas canvas;
    private int x;
    private int y;
    private int r;
    public Kolo(Context context, int _x, int _y, int _r) {
        super(context);
        canvas = new Canvas();
        x= _x;
        y= _y;
        r= _r;
        draw(canvas);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
        paint.setAntiAlias(true);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(1);
        paint.setColor(Color.argb(150, 255, 255, 255)); // lub paint.setColor(Color.RED);
        canvas.drawCircle(x, y, r, paint); //x y r
    }
}
