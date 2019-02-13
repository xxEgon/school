package com.example.a4ic1.projektkoncowyfilipowski.Helpers;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.Toast;

import com.example.a4ic1.projektkoncowyfilipowski.Activities.ImageActivity;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

/**
 * Created by 4ic1 on 2017-12-01.
 */
public class UploadFoto extends AsyncTask<String, Void, String> {

    private ProgressDialog pDialog;
    private Context context;
    private String response;
    private byte[] tImage;

    public UploadFoto(Context _context, byte[] _tImage) {
        context = _context;
        tImage = _tImage;
    }

    @Override
    protected String doInBackground(String... params) {
        HttpPost httpPost = new HttpPost("http://egon.net16.net/zdjecia/index.php"); // URL_SERWERA proponuję zapisać w osobnej klasie np Settings w postaci stałej
        // ODCZYT -> http://egon.net16.net/zdjecia/img/
        
        httpPost.setEntity(new ByteArrayEntity(tImage)); // bytes - nasze zdjęcie przekonwertowane na byte[]
        DefaultHttpClient httpClient = new DefaultHttpClient(); // klient http
        HttpResponse httpResponse = null; // obiekt odpowiedzi z serwera
        try {
            httpResponse = httpClient.execute(httpPost); // wykonanie wysłania
            String result = EntityUtils.toString(httpResponse.getEntity(), HTTP.UTF_8); // odebranie odpowiedzi z serwera, którą potem wyświetlimy w onPostExecute
            response = result;
        }
        catch (Exception e) {
            Toast.makeText(context, "ERROR: PICTURE NOT UPLOADED", Toast.LENGTH_SHORT).show();
        }
        return null;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        pDialog = new ProgressDialog(context);
        pDialog.setMessage("Uploading...");
        pDialog.setCancelable(false);
        pDialog.show();
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        pDialog.dismiss();
        Toast.makeText(context, "SUCCESS", Toast.LENGTH_SHORT).show();
        //response= s;
        //Toast.makeText(context, response, Toast.LENGTH_SHORT).show();
        //Log.e("RESPONSE", response);
    }


}
