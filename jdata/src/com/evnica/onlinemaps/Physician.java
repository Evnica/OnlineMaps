package com.evnica.onlinemaps;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;


/**
 * Class: com.evnica.onlinemaps.Physician
 * Version: 0.1
 * Created on 23.05.2016 with the help of IntelliJ IDEA (thanks!)
 * Author: Evnica
 * Description:
 */
public class Physician
{
    String name, street, house, place, zip, healthCareProvider;
    Double latitude, longitude;
    DateTime start;
    DateTime end;
    static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormat.forPattern( "yyyy-MM-dd'T'HH:mm:ss'Z'" );

    public Physician(){}

    public Physician( Physician anotherPhysician, DateTime start, DateTime end )
    {
        this.name = anotherPhysician.name;
        this.street = anotherPhysician.street;
        this.house = anotherPhysician.house;
        this.place = anotherPhysician.place;
        this.zip = anotherPhysician.zip;
        this.healthCareProvider = anotherPhysician.healthCareProvider;
        this.latitude = anotherPhysician.latitude;
        this.longitude = anotherPhysician.longitude;
        this.start = start;
        this.end = end;
    }

    @Override
    public String toString()
    {
        return name + ";" + zip + ";" + place + ";" + street + ";" + house + ";" + healthCareProvider + ";"
                + latitude + ";" + longitude + ";" + start.toString( DATE_TIME_FORMATTER ) + ";" + end.toString( DATE_TIME_FORMATTER );
    }
}
