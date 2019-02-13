package com.example.a4ic1.projektkoncowyfilipowski.Helpers;

import android.content.Context;
import android.os.AsyncTask;
import android.support.v4.view.ViewPager;
import android.util.Log;
import android.view.View;

import com.example.a4ic1.projektkoncowyfilipowski.Adapters.MyPagerAdapter;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by 4ic1 on 2017-12-08.
 */
public class GetJson extends AsyncTask<String, Void, String> {
    private JSONArray allImagesJson = null; //obiekt JSONArray
    private ArrayList<ImageD> listImage = new ArrayList<>();
    private Context context;
    private ViewPager viewPager1;
    private Boolean openInBrowser;

    public GetJson(Context context, View viewPager1, Boolean openInBrowser) {
        this.context = context;
        this.viewPager1 = (ViewPager) viewPager1;
        this.openInBrowser = openInBrowser;
    }

    @Override
    protected String doInBackground(String... params) {
        HttpPost httpPost = new HttpPost("http://egon.net16.net/zdjecia/download.php");
        DefaultHttpClient httpClient = new DefaultHttpClient();
        HttpResponse httpResponse = null;
        try {
            httpResponse = httpClient.execute(httpPost);
        } catch (IOException e) {
            e.printStackTrace();
        }
        String jsonString = null;
        try {
            jsonString = EntityUtils.toString(httpResponse.getEntity(), HTTP.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
        }
        Log.e("RESPONSE", jsonString);
//jesli jsonString nie jest pusty wtedy parsujemy go na obiekt JSON
        JSONObject jsonObj = null;
        try {
            jsonObj = new JSONObject(jsonString);
        } catch (JSONException e) {
            e.printStackTrace();
        }

//a potem rozbijamy na tablicę obiektów
        try {
            allImagesJson = jsonObj.getJSONArray("ImagesList");
        } catch (JSONException e) {
            e.printStackTrace();
        }


//teraz mogę pobierać dane for-em z elementów tej tablicy

        for (int i = 0; i < allImagesJson.length(); i++) {

            // obiekty po kolei
            JSONObject object = null;
            try {
                object = allImagesJson.getJSONObject(i);
            } catch (JSONException e) {
                e.printStackTrace();
            }

            // poszczególne pola
            String imageName = null;
            try {
                imageName = object.getString("imageName");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            String imageSaveTime = null;
            try {
                imageSaveTime = object.getString("imageSaveTime");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            String imageSize = null;
            try {
                imageSize = object.getString("imageSize");
            } catch (JSONException e) {
                e.printStackTrace();
            }

            //tutaj dodaj do ArrayList-y obiekt klasy ImageData
            listImage.add(new ImageD(imageName, imageSaveTime, imageSize));

            //Log.e("RESPONSE", jsonString);
        }

        return null;
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        MyPagerAdapter myPagerAdapter = new MyPagerAdapter(context, listImage.size());
        myPagerAdapter.resetCounter();
        for (int i = 0; i < listImage.size(); i++) {
            //wywoływanie pobierania
            new LoadImageTask(context, viewPager1, listImage.size(), myPagerAdapter, listImage.get(i).getImageSaveTime(), listImage.get(i).getImageSize(), listImage.get(i).getImageName(), openInBrowser).execute("http://egon.net16.net/zdjecia/img/" + listImage.get(i).getImageName());
        }
        //Log.e("count", String.valueOf(myPagerAdapter.getCount()));
        viewPager1.setAdapter(myPagerAdapter);
        myPagerAdapter.notifyDataSetChanged();
    }
}
