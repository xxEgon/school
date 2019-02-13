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
public class PreviewText extends View {
    private Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private String _text;
    private int _size;
    private int _colorText;
    private int _borderColor;

    public PreviewText(Context context, Typeface tf, String text, int size, int colorText, int borderColor) {
        super(context);

        _text = text;
        _size = size;
        _colorText = colorText;
        _borderColor = borderColor;
        paint.reset();            // czyszczenie
        paint.setAntiAlias(true);    // wygładzanie
        paint.setTextSize(size);        // wielkość fonta
        paint.setTypeface(tf);  // czcionka
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        paint.setStyle(Paint.Style.FILL);
        paint.setColor(_colorText);
        canvas.drawText(_text, 0, _size - (_size/4), paint);

        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(5);
        paint.setColor(_borderColor);
        canvas.drawText(_text, 0, _size - (_size/4), paint);

    }

    // obiekt ustawiający kolor, czcionkę, tło i inne parametry View
}
