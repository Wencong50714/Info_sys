package Tmp.pojo;

import lombok.Data;

import java.io.Serializable;

@Data
public class Song implements Serializable {
    private int id;
    private int singerId;
    private String title;
    private int star;
}
