package com.example.a4ic1.projektkoncowyfilipowski.Helpers;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * Created by 4ic1 on 2017-11-10.
 */
public class ImageData implements Serializable{

    private int x;
    private int y;
    private int w;
    private int h;

    public ImageData(int x, int y, int w, int h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getW() {
        return w;
    }

    public int getH() {
        return h;
    }

}
