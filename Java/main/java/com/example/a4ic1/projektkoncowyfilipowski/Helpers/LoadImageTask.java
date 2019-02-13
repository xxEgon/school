package com.example.a4ic1.projektkoncowyfilipowski.Helpers;

import android.app.ProgressDialog;
import android.content.Context;
import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.support.v4.view.ViewPager;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;


import com.example.a4ic1.projektkoncowyfilipowski.Adapters.MyPagerAdapter;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;

/**
 * Created by 4ic1 on 2017-12-08.
 */
public class LoadImageTask extends AsyncTask<String, Void, String> {
    private Drawable loadedImage;
    private ProgressDialog pDialog;
    private Context context;
    private ViewPager viewPager1;
    private MyPagerAdapter myPagerAdapter;
    private String date;
    private String size;
    private String name;
    private File file;
    private Boolean openInBrowser;

    public LoadImageTask(Context context, View viewPager1, int length, MyPagerAdapter myPagerAdapter, String date, String size,String name, Boolean openInBrowser) {
        this.context = context;
        this.viewPager1 = (ViewPager) viewPager1;
        this.myPagerAdapter = myPagerAdapter;
        this.date = date;
        this.size = size;
        this.name = name;
        this.openInBrowser = openInBrowser;
    }

    public Drawable LoadImageFromWeb(String url) {

        InputStream inputStream = null;
        try {
            inputStream = (InputStream) new URL(url).getContent();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return Drawable.createFromStream(inputStream, "filename.jpg");
    }

    @Override
    protected String doInBackground(String... params) {
        loadedImage = LoadImageFromWeb(params[0]);
//        URL url = null;
//        try {
//            url = new URL(params[0]);
//        } catch (MalformedURLException e) {
//            e.printStackTrace();
//        }
//        Log.e("url", String.valueOf(params[0]));
//        try {
//            file = new File(url.toURI());
//        } catch(URISyntaxException e) {
//            file = new File(url.getPath());
//        }
//        //FileUtils.copyURLToFile(url, f);
        return null;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        pDialog = new ProgressDialog(context);
        pDialog.setMessage("Downloading...");
        pDialog.setCancelable(false);
        pDialog.show();
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        pDialog.dismiss();

        //double fileSize = file.length()/1024;
        //Log.e("filelength", String.valueOf(fileSize));

        myPagerAdapter.addImage(loadedImage, date, size, name,  openInBrowser);
        myPagerAdapter.notifyDataSetChanged();
    }
}