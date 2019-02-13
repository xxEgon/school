package com.example.a4ic1.projektkoncowyfilipowski.Activities;

import android.content.Intent;
import android.graphics.Point;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.Display;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;

import com.example.a4ic1.projektkoncowyfilipowski.Helpers.ImageData;
import com.example.a4ic1.projektkoncowyfilipowski.R;

import java.util.ArrayList;

public class CollageActivity extends AppCompatActivity {

    private ArrayList<ImageData> list = new ArrayList<>();
    private LinearLayout linLay;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_collage);

        linLay = (LinearLayout) findViewById(R.id.collageLinLay);

        int count = linLay.getChildCount();
        View v = null;
        for(int i= 0; i< count; i++) {
            final int licz = i;
            v = linLay.getChildAt(i);
            v.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Display display = getWindowManager().getDefaultDisplay();
                    Point size = new Point();
                    display.getSize(size);
                    RelativeLayout rl = (RelativeLayout) findViewById(R.id.collageContainerRelative);
                    int h = rl.getHeight();
                    size.y = h;
                    list.clear();
                    switch (licz) {
                        case 0:
                            list.add(new ImageData(0,0,size.x,size.y/2));
                            list.add(new ImageData(0,size.y/2,size.x,size.y/2));
                            break;
                        case 1:
                            list.add(new ImageData(0,0,size.x/2,size.y/2));
                            list.add(new ImageData(size.x/2,0,size.x/2,size.y/2));
                            list.add(new ImageData(0,size.y/2,size.x/2,size.y/2));
                            list.add(new ImageData(size.x/2,size.y/2,size.x/2,size.y/2));
                            break;
                        case 2:
                            list.add(new ImageData(0,0,2*(size.x/3),size.y/3));
                            list.add(new ImageData(2*(size.x/3),0,size.x/3,size.y/3));
                            list.add(new ImageData(0,size.y/3,size.x/3,size.y/3));
                            list.add(new ImageData(size.x/3,size.y/3,2*(size.x/3),size.y/3));
                            list.add(new ImageData(0,2*(size.y/3),2*(size.x/3),size.y/3));
                            list.add(new ImageData(2*(size.x/3),2*(size.y/3),size.x/3,size.y/3));
                            break;
                    }
                    Intent intent = new Intent(CollageActivity.this,EditCollageActivity.class);
                    intent.putExtra("list", list);
                    startActivity(intent);
                }
            });
        }


    }
}
