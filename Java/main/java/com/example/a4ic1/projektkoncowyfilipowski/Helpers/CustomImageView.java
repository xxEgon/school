package com.example.a4ic1.projektkoncowyfilipowski.Helpers;

import android.content.Context;
import android.graphics.Bitmap;
import android.view.View;
import android.widget.ImageView;

/**
 * Created by 4ic1 on 2017-09-29.
 */
public class CustomImageView extends ImageView implements View.OnClickListener{
    public CustomImageView(Context context, int id, Bitmap bmp) {
        super(context);

        this.setImageBitmap(bmp);
        this.setScaleType(ImageView.ScaleType.CENTER_CROP);
        this.setId(id);

        //setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {

    }
}
