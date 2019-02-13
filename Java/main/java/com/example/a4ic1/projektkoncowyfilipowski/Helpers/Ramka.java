package com.example.a4ic1.projektkoncowyfilipowski.Helpers;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.view.View;
import android.widget.TextView;

/**
 * Created by 4ic1 on 2017-11-17.
 */
public class Ramka extends View {
    private Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private int _sizeX;
    private int _sizeY;

    public Ramka(Context context, int sizeX, int sizeY) {
        super(context);

        _sizeX = sizeX;
        _sizeY = sizeY;
        paint.reset();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        paint.setStyle(Paint.Style.STROKE);
        paint.setColor(Color.YELLOW);
        canvas.drawRect(0,0, _sizeX, _sizeY, paint);
    }

    // obiekt ustawiający kolor, czcionkę, tło i inne parametry View
}
