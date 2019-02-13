package com.example.a4ic1.projektkoncowyfilipowski.Activities;

import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;

import com.example.a4ic1.projektkoncowyfilipowski.Helpers.DatabaseManager;
import com.example.a4ic1.projektkoncowyfilipowski.R;

public class EditNoteActivity extends AppCompatActivity {

    private EditText etTitle;
    private EditText etText;
    private LinearLayout linColors;
    private Button bAccept;
    private Button bCancel;
    private String noteColor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_note);

        Bundle bundle = getIntent().getExtras();
        final String sID = bundle.getString("id").toString();
        final String sTitle = bundle.getString("title").toString();
        final String sText = bundle.getString("text").toString();
        final String sColor = bundle.getString("color").toString();

        etTitle = (EditText) findViewById(R.id.EditNoteTitle);
        etText = (EditText) findViewById(R.id.EditNoteText);
        linColors = (LinearLayout) findViewById(R.id.EditNoteColors);
        bAccept = (Button) findViewById(R.id.EditNoteAccept);
        bCancel = (Button) findViewById(R.id.EditNoteCancel);

        etTitle.setText(sTitle);
        etTitle.setTextColor(Integer.parseInt(sColor));
        etText.setText(sText);

        noteColor = sColor;

        int[] colorTab= {Color.RED, Color.GREEN, Color.BLUE, Color.MAGENTA};

        for(int i=0;i<4;i++) {
            Button colorBtn = new Button(EditNoteActivity.this);
            colorBtn.setBackgroundColor(colorTab[i]);
            colorBtn.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    0.25f));
            colorBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    noteColor = String.valueOf(((ColorDrawable) view.getBackground()).getColor());
                    etTitle.setTextColor(Integer.parseInt(String.valueOf(((ColorDrawable) view.getBackground()).getColor())));
                }
            });
            linColors.addView(colorBtn);
        }

        bCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });
        bAccept.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                DatabaseManager db = new DatabaseManager(
                        EditNoteActivity.this, // activity z galerią zdjęć
                        "NotatkiFilipowskiDamian.db", // nazwa bazy
                        null,
                        4 //wersja bazy, po zmianie schematu bazy należy ją zwiększyć
                );
                db.update(sID, String.valueOf(etTitle.getText()), String.valueOf(etText.getText()), noteColor);
                finish();
            }
        });
    }
}
