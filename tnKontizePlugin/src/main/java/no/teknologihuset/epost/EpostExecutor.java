package no.teknologihuset.epost;

import no.haagensoftware.contentice.spi.StoragePlugin;
import no.teknologihuset.handlers.data.BookingInquiry;

import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * Created by jhsmbp on 19/02/14.
 */
public class EpostExecutor {
    private static EpostExecutor instance = null;

    private ScheduledThreadPoolExecutor threadPool = null;
    private SendRemainingEmailsThread sendRemainingEmailsThread = null;

    private EpostExecutor() {
        threadPool = new ScheduledThreadPoolExecutor(10);
    }

    public static EpostExecutor getInstance() {
        if (instance == null) {
            instance = new EpostExecutor();
        }

        return instance;
    }

    public boolean sendEmail(BookingInquiry bookingInquiry, StoragePlugin storagePlugin) {
        threadPool.schedule(new EpostThread(bookingInquiry, storagePlugin), 0, TimeUnit.MILLISECONDS);

        sendRemainingEmails(storagePlugin);

        return true;
    }

    public void sendRemainingEmails(StoragePlugin storagePlugin) {
        if (sendRemainingEmailsThread == null) {
            sendRemainingEmailsThread = new SendRemainingEmailsThread(storagePlugin);
            threadPool.scheduleAtFixedRate(sendRemainingEmailsThread, 0, 10000, TimeUnit.MILLISECONDS);
        }
    }
}
