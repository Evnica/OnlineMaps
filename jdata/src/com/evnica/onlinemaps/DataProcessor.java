package com.evnica.onlinemaps;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Class: com.evnica.onlinemaps.DataProcessor
 * Version: 0.1
 * Created on 23.05.2016 with the help of IntelliJ IDEA (thanks!)
 * Author: Evnica
 * Description:
 */
public class DataProcessor
{
    static final String DATE_FORMAT = "yyyy-MM-dd'T'HHmm";

    public static List<String> readFile(String fileName) throws Exception
    {
        BufferedReader reader = new BufferedReader( new InputStreamReader( new FileInputStream( fileName ), "Cp1252" ) );
        String line;
        List<String> data = new ArrayList<>(  );
        while ((line = reader.readLine()) != null)
        {
            data.add( line );
        }
        if (data.size() > 1)
        {
            data.remove( 0 );
        }
        if ( data.get( data.size()-1 ).equals( "" ) )
        {
            data.remove( data.size()-1 );
        }

        return data;
    }



    public static List<Physician> convertToPhysicians(List<String> data)
    {
        List<Physician> physicianList = new ArrayList<>(  );
        Physician currentPhysician;
        String  monday = "2016-05-23",
                tuesday = "2016-05-24",
                wednesday = "2016-05-25",
                thursday = "2016-05-26",
                friday = "2016-05-27";
        DateTime start;
        DateTime end;
        String[] splitLine;
        String[] blockedHours;
        String[] times;
        int indexOfSpace;
        String startTime, endTime;

        for (String line: data)
        {
            currentPhysician = new Physician();
            splitLine = line.split( ";" );
            indexOfSpace = splitLine[0].indexOf( " " );
            currentPhysician.name = splitLine[2];
            currentPhysician.street = splitLine[3];
            currentPhysician.house = splitLine[4];
            currentPhysician.zip = splitLine[5];
            currentPhysician.place = splitLine[6];
            currentPhysician.healthCareProvider = splitLine[7];
            currentPhysician.longitude = Double.parseDouble( splitLine[0].substring( 6, indexOfSpace ) );
            currentPhysician.latitude = Double.parseDouble( splitLine[0].substring( indexOfSpace+1, splitLine[0].length() - 1 ) );

            blockedHours = splitLine[8].split( ", " );
            //[0]=-MD--F-: 800-1300, [1]= ---M---: 800-1200
            for (String part: blockedHours)
            {
                times = part.substring( part.indexOf( " " ) + 1 ).split( "-" );
                startTime = times[0];
                endTime = times[1];
                if ( startTime.length() == 3 )
                {
                    startTime = "0" + startTime;
                }
                if ( endTime.length() == 3 )
                {
                    endTime = "0" + endTime;
                }

                if (part.charAt( 1 ) == 'M')
                {
                    start = DateTime.parse( monday + 'T' + startTime, DateTimeFormat.forPattern(DATE_FORMAT) );
                    end = DateTime.parse( monday + 'T' + endTime, DateTimeFormat.forPattern( DATE_FORMAT ) );
                    physicianList.add( new Physician( currentPhysician, start, end ) );
                }
                if (part.charAt( 2 ) == 'D')
                {
                    start = DateTime.parse( tuesday + 'T' + startTime, DateTimeFormat.forPattern(DATE_FORMAT) );
                    end = DateTime.parse( tuesday + 'T' + endTime, DateTimeFormat.forPattern( DATE_FORMAT ) );
                    physicianList.add( new Physician( currentPhysician, start, end ) );
                }
                if (part.charAt( 3 ) == 'M')
                {
                    start = DateTime.parse( wednesday + 'T' + startTime, DateTimeFormat.forPattern(DATE_FORMAT) );
                    end = DateTime.parse( wednesday + 'T' + endTime, DateTimeFormat.forPattern( DATE_FORMAT ) );
                    physicianList.add( new Physician( currentPhysician, start, end ) );
                }
                if (part.charAt( 4 ) == 'D')
                {
                    start = DateTime.parse( thursday + 'T' + startTime, DateTimeFormat.forPattern(DATE_FORMAT) );
                    end = DateTime.parse( thursday + 'T' + endTime, DateTimeFormat.forPattern( DATE_FORMAT ) );
                    physicianList.add( new Physician( currentPhysician, start, end ) );
                }
                if (part.charAt( 5 ) == 'F')
                {
                    start = DateTime.parse( friday + 'T' + startTime, DateTimeFormat.forPattern(DATE_FORMAT) );
                    end = DateTime.parse( friday + 'T' + endTime, DateTimeFormat.forPattern( DATE_FORMAT ) );
                    physicianList.add( new Physician( currentPhysician, start, end ) );
                }
            }
        }
        return physicianList;
    }


    public static void writeToFile(List<Physician> physicianList, String filename) throws IOException
    {
        BufferedWriter writer = new BufferedWriter( new OutputStreamWriter( new FileOutputStream( filename ), "UTF-8" ));
        writer.write( "Name;PLZ;Ort;Strasse;Hausnummer;Kassen;Latitude;Longitude;Start;End\n" );

        for (Physician p: physicianList )
        {
            writer.write( p.toString() + "\n" );
        }

        writer.close();
    }


}
