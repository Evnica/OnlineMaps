package com.evnica.onlinemaps;

import org.junit.Test;

import java.util.List;

/**
 * Class: DataProcessorTest
 * Version: 0.1
 * Created on 23.05.2016 with the help of IntelliJ IDEA (thanks!)
 * Author: Evnica
 * Description:
 */
public class DataProcessorTest
{
    @Test
    public void readFile() throws Exception
    {
        List<String> data = DataProcessor.readFile( "../jdata/tables/AMDN.csv" );
        data.forEach( System.out::println );
    }

    @Test
    public void convertToPhysicians() throws Exception
    {
        List<String> data = DataProcessor.readFile( "../jdata/tables/AMDN.csv" );
        List<Physician> physicianList = DataProcessor.convertToPhysicians( data );
        System.out.println(physicianList.size());
        DataProcessor.writeToFile( physicianList, "../jdata/tables/sortedAM.csv" );
    }

}