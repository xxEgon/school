package com.example.a4ic1.projektkoncowyfilipowski.Adapters;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.support.v4.graphics.BitmapCompat;
import android.support.v4.view.PagerAdapter;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.example.a4ic1.projektkoncowyfilipowski.Activities.NetworkActivity;
import com.example.a4ic1.projektkoncowyfilipowski.R;

import java.io.ByteArrayOutputStream;
import java.util.zip.Inflater;

/**
 * Created by Damian on 09-12-2017.
 */
public class MyPagerAdapter extends PagerAdapter {
    Context mContext;
    LayoutInflater inflater;
    private final Drawable[] GalImages;
    private final String[] date;
    private final String[] size;
    private final String[] name;
    private Boolean openInBrowser;

    public MyPagerAdapter(Context context, int length) {
        mContext = context;
        inflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        GalImages = new Drawable[length];
        date = new String[length];
        size = new String[length];
        name = new String[length];
    }

    private static int counter = 0;
    public int getCounter () {
        return counter;
    }
    public void resetCounter () {
        counter = 0;
    }
    public void addImage (Drawable loadImage, String date, String size, String name, Boolean openInBrowser)
    {
        this.openInBrowser = openInBrowser;
        GalImages[counter] = loadImage;
        this.date[counter] = date;
        this.size[counter] = size;
        this.name[counter] = name;
        counter++;
    }

//    private Bitmap betterImageDecode(String filePath) {
//
//        Bitmap myBitmap;
//        BitmapFactory.Options options = new BitmapFactory.Options();    //opcje przekształcania bitmapy
//        options.inSampleSize = 4; // zmniejszenie jakości bitmapy 4x
//        //
//        myBitmap = BitmapFactory.decodeFile(filePath, options);
//        return myBitmap;
//    }

    @Override
    public boolean isViewFromObject(View view, Object object) {
        return view == ((RelativeLayout) object);
    }

    @Override
    public int getCount() {
        return GalImages.length;
    }

    @Override
    public Object instantiateItem(ViewGroup container, final int position) {
        RelativeLayout v0 = (RelativeLayout) inflater.inflate(R.layout.mypage, container, false);
        ImageView imageView = (ImageView) v0.findViewById(R.id.page_photo);
        imageView.setImageDrawable(GalImages[position]);

        if(openInBrowser == Boolean.TRUE){
            imageView.setOnLongClickListener(new View.OnLongClickListener() {
                @Override
                public boolean onLongClick(View view) {
                    //Activity a = (Activity) context;
                    //context.openInBrowser(name[position]);

                    Intent intent = new Intent(
                    Intent.ACTION_VIEW,
                    Uri.parse("http://egon.net16.net/zdjecia/img/" + name[position]));
                    mContext.startActivity(intent);

                    return false;
                }
            });
        }


        //BitmapDrawable bmpDrawable = (BitmapDrawable) imageView.getDrawable();
        //Bitmap bmp = bmpDrawable.getBitmap();

        //Bitmap bmp = ((BitmapDrawable)GalImages[position]).getBitmap();

        //ByteArrayOutputStream out = new ByteArrayOutputStream();
        //bmp.compress(Bitmap.CompressFormat.JPEG, 100, out);

        //int size = out.size();

        //int size = BitmapCompat.getAllocationByteCount(bmp);

        //int size= 1024;

        TextView textView = (TextView) v0.findViewById(R.id.page_text);
        textView.setText("Data: " + date[position] + "\nRozmiar: " + size[position]);

        container.addView(v0);
        return v0;
    }

    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {
        container.removeView((RelativeLayout) object);
    }

    @Override
    public int getItemPosition(Object object) {
        return  POSITION_NONE;
    }
}
