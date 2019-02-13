package com.example.a4ic1.projektkoncowyfilipowski.Activities;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.annotation.StringRes;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.TextView;

import com.example.a4ic1.projektkoncowyfilipowski.Adapters.MyArrayAdapter;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.DatabaseManager;
import com.example.a4ic1.projektkoncowyfilipowski.Helpers.Note;
import com.example.a4ic1.projektkoncowyfilipowski.R;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class NotesActivity extends AppCompatActivity {

    ListView notesListV;
    private DatabaseManager db;

    public void load (final ArrayList<Note> list) {

        final MyArrayAdapter adapter = new MyArrayAdapter(
                NotesActivity.this,
                R.layout.row_note_layout,
                list
        );
        notesListV.setAdapter(adapter);

        notesListV.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {
            @Override
            public boolean onItemLongClick(AdapterView<?> parent, View view, final int position, final long id) {
                final int p = position;
                //final int i = (int)(id + 0);
                AlertDialog.Builder alert = new AlertDialog.Builder(NotesActivity.this);
                alert.setTitle("Notatka");
                final String[] opcje = {"Usuń","Aktualizuj","Sortuj wg tytułu","Sortuj wg koloru","Sortuj wg nazwy zdjęcia"};
                alert.setItems(opcje, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        ArrayList<Note> sortedList = db.getAll();
                        switch(opcje[which]) {
                            case "Usuń":
                                db.delete(list.get(p).getId());
                                load(db.getAll());
                                break;
                            case "Aktualizuj":
                                Intent intent = new Intent(NotesActivity.this,EditNoteActivity.class);
                                intent.putExtra("id", list.get(p).getId());
                                intent.putExtra("title", list.get(p).getTitle());
                                intent.putExtra("text", list.get(p).getText());
                                intent.putExtra("color", list.get(p).getColor());
                                startActivity(intent);
                                break;
                            case "Sortuj wg tytułu":
                                Collections.sort(sortedList, new Comparator<Note>() {
                                    @Override
                                    public int compare(Note a, Note b) {
                                        return a.getTitle().compareTo(b.getTitle());
                                    }
                                });
                                break;
                            case "Sortuj wg koloru":
                                Collections.sort(sortedList, new Comparator<Note>() {
                                    @Override
                                    public int compare(Note a, Note b) {
                                        return a.getColor().compareTo(b.getColor());
                                    }
                                });
                                break;
                            case "Sortuj wg nazwy zdjęcia":
                                Collections.sort(sortedList, new Comparator<Note>() {
                                    @Override
                                    public int compare(Note a, Note b) {
                                        return a.getPath().compareTo(b.getPath());
                                    }
                                });
                                break;
                        }
                        if(which != 0 && which != 1) {
                            load(sortedList);
                        }
                    }
                });
                alert.show();
                return false;
            }
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notes);

        db = new DatabaseManager(
                NotesActivity.this, // activity z galerią zdjęć
                "NotatkiFilipowskiDamian.db", // nazwa bazy
                null,
                4 //wersja bazy, po zmianie schematu bazy należy ją zwiększyć
        );

        notesListV = (ListView) findViewById(R.id.notesList);

        load(db.getAll());
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        load(db.getAll());
    }

}



