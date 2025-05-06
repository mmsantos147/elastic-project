package com.elastic.aisearch.parser;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QueryNode {
    private String shouldContent = "";
    private List<String> mustNotContent = new ArrayList<>();
    private List<String> mustInContent = new ArrayList<>();
    private List<String> mustTitle = new ArrayList<>();
    private List<String> mustNotTitle = new ArrayList<>();
    private String minDate = "";
    private String maxDate = "";
    private String eqDate = "";
    private String minReadingTime = "";
    private String maxReadingTime = "";
    private String eqReadingTime = "";
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("<b>shouldContent:</b> ").append(shouldContent).append("</br>");
        sb.append("<b>mustNotContent:</b> </br>");
        for (String s : mustNotContent) {
            sb.append("  - ").append(s).append("</br>");
        }
        sb.append("<b>mustInContent:</b> </br>");
        for (String s : mustInContent) {
            sb.append("  - ").append(s).append("</br>");
        }
        sb.append("</br>");
        sb.append("<b>mustTitle:</b> ").append("</br>");
        for (String s : mustTitle) {
            sb.append("  - ").append(s).append("</br>");
        }
        sb.append("<b>mustNotTitle:</b> ")  .append("</br>");
        for (String s : mustNotTitle) {
            sb.append("  - ").append(s).append("</br>");
        }
        sb.append("</br>");
        sb.append("<b>minDate:</b> ").append(minDate).append("</br>");
        sb.append("<b>maxDate:</b> ").append(maxDate).append("</br>");
        sb.append("<b>eqDate:</b> ").append(eqDate).append("</br>");
        sb.append("</br>");
        sb.append("<b>minReadingTime:</b> ").append(minReadingTime).append("</br>");
        sb.append("<b>maxReadingTime:</b> ").append(maxReadingTime).append("</br>");
        sb.append("<b>eqReadingTime:</b> ").append(eqReadingTime).append("</br>");
        return sb.toString();
    }
 
}
