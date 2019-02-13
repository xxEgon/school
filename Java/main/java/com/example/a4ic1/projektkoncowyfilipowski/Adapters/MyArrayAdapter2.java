package com.example.a4ic1.projektkoncowyfilipowski.Adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.a4ic1.projektkoncowyfilipowski.Helpers.DatabaseManager;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.Note;
import com.example.a4ic1.projektkoncowyfilipowski.R;

import org.w3c.dom.Text;

import java.util.ArrayList;

/**
 * Created by 4ic1 on 2017-11-17.
 */
public class MyArrayAdapter2 extends ArrayAdapter {

    private String[] _names;
    private Context _context;
    private int _resource;

    public MyArrayAdapter2(Context context, int resource, String[] objects) {
        super(context, resource, objects);

        this._names = objects;
        this._context = context;
        this._resource = resource;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        convertView = inflater.inflate(_resource, null);

        final int pos = position;

        if(pos == 0) {
            ImageView iv = (ImageView) convertView.findViewById(R.id.rowImage);
            iv.setImageResource(R.drawable.ic_chevron_right_black_48dp);
        }
        TextView tv = (TextView) convertView.findViewById(R.id.rowText);
        tv.setText(_names[pos]);

        return convertView;
    }
}
