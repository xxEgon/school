package com.example.a4ic1.projektkoncowyfilipowski.Helpers;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import java.util.ArrayList;

/**
 * Created by 4ic1 on 2017-10-06.
 */
public class DatabaseManager extends SQLiteOpenHelper{
    public DatabaseManager(Context context, String name, SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE notatki (_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 'title' TEXT, 'text' TEXT, 'color' TEXT, 'path' TEXT)");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS notatki");
        onCreate(db);
    }

    public void update(String id, String title, String text, String color) {
        SQLiteDatabase db = this.getWritableDatabase();

        ContentValues contentValues = new ContentValues();
        contentValues.put("title", title);
        contentValues.put("text", text);
        contentValues.put("color", color);

        db.update("notatki", contentValues, "_id = ? ", new String[]{id});
        db.close();
    }

    public int delete(String id){
        SQLiteDatabase db = this.getWritableDatabase();

        return db.delete("notatki",
                "_id = ? ",
                new String[]{id});
    }

    public boolean insert(String title, String text, String color, String path){

        SQLiteDatabase db = this.getWritableDatabase();

        ContentValues contentValues = new ContentValues();
        contentValues.put("title", title);
        contentValues.put("text", text);
        contentValues.put("color", color);
        contentValues.put("path", path);

        db.insertOrThrow("notatki", null, contentValues); // gdy insert się nie powiedzie, będzie błąd
        db.close();
        return true;
    }

    public ArrayList<Note> getAll(){

        SQLiteDatabase db = this.getReadableDatabase();
        ArrayList<Note> notes= new ArrayList<>();
        Cursor result = db.rawQuery("SELECT * FROM notatki" , null);
        while(result.moveToNext()){
            notes.add( new Note(
                    result.getString(result.getColumnIndex("title")),
                    result.getString(result.getColumnIndex("text")),
                    result.getString(result.getColumnIndex("color")),
                    result.getString(result.getColumnIndex("path")),
                    result.getString(result.getColumnIndex("_id"))
            ));
        }
        return notes;
    }
}
