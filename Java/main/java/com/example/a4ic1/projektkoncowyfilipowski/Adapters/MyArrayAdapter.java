package com.example.a4ic1.projektkoncowyfilipowski.Adapters;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.a4ic1.projektkoncowyfilipowski.Activities.AlbumActivity2;
import com.example.a4ic1.projektkoncowyfilipowski.Activities.NotesActivity;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.DatabaseManager;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.Note;
import com.example.a4ic1.projektkoncowyfilipowski.R;

import java.util.ArrayList;

/**
 * Created by Damian on 13-10-2017.
 */
public class MyArrayAdapter extends ArrayAdapter{

    public ArrayList<Note> _list;
    private Context _context;
    private int _resource;
    private DatabaseManager db;
    //private int licz = 0;

    public MyArrayAdapter(Context context, int resource, ArrayList objects) {
        super(context, resource, objects);

        this._list = objects;
        this._context = context;
        this._resource = resource;

    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        convertView = inflater.inflate(_resource, null);

        final int pos = position;

        db = new DatabaseManager(
                _context, // activity z galerią zdjęć
                "NotatkiFilipowskiDamian.db", // nazwa bazy
                null,
                4 //wersja bazy, po zmianie schematu bazy należy ją zwiększyć
        );

        TextView tv1 = (TextView) convertView.findViewById(R.id.rowNoteText1);
        tv1.setText(_list.get(position).getId());

        TextView tv2 = (TextView) convertView.findViewById(R.id.rowNoteText2);
        tv2.setText(_list.get(position).getTitle());
        tv2.setTextColor(Integer.parseInt(_list.get(position).getColor()));

        TextView tv3 = (TextView) convertView.findViewById(R.id.rowNoteText3);
        tv3.setText(_list.get(position).getText());

        TextView tv4 = (TextView) convertView.findViewById(R.id.rowNoteText4);
        String s = _list.get(position).getPath().replace("/storage/emulated/0/Pictures", "");
        tv4.setText(s);

        //licz++;


        ImageView iv1 = (ImageView) convertView.findViewById(R.id.rowNoteImage);
        iv1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // klik w obrazek
            }
        });
        return convertView;
    }
}
