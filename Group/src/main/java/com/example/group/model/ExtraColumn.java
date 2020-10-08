package com.example.group.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Table;

@Embeddable
@Table(name = "extra_column")
public class ExtraColumn {
    private String type;
    private int extraNum;


//    @Column(name="field")
    private String extraString;


    private String extraFormula;

    public String getExtraFormula() {
        return extraFormula;
    }

    public void setExtraFormula(String extraFormula) {
        this.extraFormula = extraFormula;
    }


    public String getExtraString() {
        return extraString;
    }

    public void setExtraString(String extraString) {
        this.extraString = extraString;
    }



    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getExtraNum() {
        return extraNum;
    }

    public void setExtraNum(int extraNum) {
        this.extraNum = extraNum;
    }
}
