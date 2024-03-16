package com.example.hirportal01.email;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;

public class SendMail {
        public void sendEmail() throws MessagingException {
                Properties props = new Properties();
                props.put("mail.smtp.host", "smtp.gmail.com");
                props.put("mail.smtp.socketFactory.port", "465");
                props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
                props.put("mail.smtp.auth", "true");
                props.put("mail.smtp.port", "465");

                Session session = Session.getDefaultInstance(props,
                        new javax.mail.Authenticator() {
                                protected PasswordAuthentication getPasswordAuthentication() {
                                        return new PasswordAuthentication("", "");
                                }
                        });

                Message message = new MimeMessage(session);
                message.setFrom(new InternetAddress("email@gmail.com"));
                message.setRecipients(Message.RecipientType.TO,
                        InternetAddress.parse("hodiszilard89@gmail.com"));
                message.setSubject("Teszt email");
                message.setText("Ez egy tesztüzenet.");

                Transport.send(message);
        }
}


