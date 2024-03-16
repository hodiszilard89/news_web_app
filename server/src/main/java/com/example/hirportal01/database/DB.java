//package com.example.hirportal01.database;
//
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.SQLException;
//import java.sql.Statement;
//import java.util.logging.Level;
//import java.util.logging.Logger;
//
//public class DB {
//    //final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
//    final String URL ="jdbc:mysql://localhost:3306/proba?user=root&password=";
//    final String USER_NAME="root";
//    final String PASSWORD="";
//
//    Connection conn = null;
//    public DB(){
//        //connect to database
//        try{
//            conn = DriverManager.getConnection(URL);
//            System.out.println("kapcsolat létrejött");
//        }
//        catch(SQLException ex){
//            System.out.println(ex);
//        }
//
//        //create statement if connect is not null
//        if (conn!=null){
//            try {
//                Statement createStatement = conn.createStatement();
//            }catch (SQLException ex){
//                Logger.getLogger(DB.class.getName()).log(Level.SEVERE, null, ex);
//            }
//        }
//    }
//}
