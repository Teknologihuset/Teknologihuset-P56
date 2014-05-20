package no.teknologihuset.epost;

import no.haagensoftware.contentice.spi.StoragePlugin;
import no.teknologihuset.handlers.BookingInquiryAssembler;
import no.teknologihuset.handlers.data.BookingInquiry;
import org.apache.log4j.Logger;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.net.PasswordAuthentication;
import java.util.Properties;

/**
 * Created by jhsmbp on 19/02/14.
 */
public class EpostThread implements Runnable {
    private static final Logger logger = Logger.getLogger(EpostThread.class.getName());

    private BookingInquiry bookingInquiry;
    private StoragePlugin storagePlugin;
    private String host;

    public EpostThread(String host, BookingInquiry bookingInquiry, StoragePlugin storagePlugin) {
        this.host = host;
        this.bookingInquiry = bookingInquiry;
        this.storagePlugin = storagePlugin;
    }

    @Override
    public void run() {
        if (bookingInquiry != null) {
            if (sendEmailWithoutSSL(bookingInquiry.getSubject(), bookingInquiry.getMessage())) {
                storagePlugin.setSubCategory(host, "emailsSent", bookingInquiry.getId(), BookingInquiryAssembler.convertBookingInquiryToSubCategory(bookingInquiry));
                storagePlugin.deleteSubcategory(host, "emailsNotSent", bookingInquiry.getId());
            }
        }
    }

    private boolean sendEmailWithoutSSL(String emailSubject, String emailMessage) {
        boolean success = true;

        String host = "smtp.powertech.no";
        int port = 25;
        String username = "";
        String password = "";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "false");
        props.put("mail.smtp.starttls.enable", "false");
        props.put("mail.smtp.host", host);

        logger.info("Creating email session");
        Session session = Session.getInstance(props);

        try {
            logger.info("Creating transport");

            Transport transport = session.getTransport("smtp");

            logger.info("Connecting");
            transport.connect(host, port, null, null);

            logger.info("Sending email...");
            Transport.send(buildMessage(session, emailSubject, emailMessage));
        } catch (MessagingException e) {
            e.printStackTrace();
            success = false;
        }

        logger.info("Email send success: " + success);

        return success;
    }

    private Message buildMessage(Session session, String emailSubject, String emailMessage) throws AddressException, MessagingException {
        Message message = new MimeMessage(session);
        message.setHeader("Content-Type", "text/plain");
        message.setFrom(new InternetAddress("vert@teknologihuset.no"));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("vert@teknologihuset.no, joachim@haagen-software.no"));
        message.setSubject(emailSubject);
        message.setText(emailMessage);


        return message;
    }
}
