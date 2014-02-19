package no.teknologihuset.handlers;

import com.google.gson.Gson;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.FullHttpRequest;
import no.haagensoftware.contentice.handler.ContenticeHandler;
import no.teknologihuset.epost.EpostExecutor;
import no.teknologihuset.handlers.data.BookingInquiry;
import no.teknologihuset.handlers.data.BookingInquiryObject;

/**
 * Created by jhsmbp on 1/21/14.
 */
public class BookingInquiriesHandler extends ContenticeHandler {
    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, FullHttpRequest fullHttpRequest) throws Exception {
        String jsonReturn = "";

        String messageContent = getHttpMessageContent(fullHttpRequest);

        if (isPost(fullHttpRequest) && messageContent != null) {
            BookingInquiryObject bookingInquiry = new Gson().fromJson(messageContent, BookingInquiryObject.class);

            if (bookingInquiry != null && bookingInquiry.getBookingInquiry() != null &&
                    bookingInquiry.getBookingInquiry().getFirmanavn() != null &&
                    bookingInquiry.getBookingInquiry().getEvents().size() > 0) {

                bookingInquiry.getBookingInquiry().setId(bookingInquiry.getBookingInquiry().getFirmanavn() + "_" + System.currentTimeMillis());
                bookingInquiry.getBookingInquiry().setSubject("Ny Reservasjonsforespørsel fra: " + bookingInquiry.getBookingInquiry().getFirmanavn());

                StringBuilder message = new StringBuilder();
                message.append("firmanavn: " + bookingInquiry.getBookingInquiry().getFirmanavn()).append("\n");
                message.append("epost: " + bookingInquiry.getBookingInquiry().getEpost()).append("\n");
                message.append("tlf: " + bookingInquiry.getBookingInquiry().getTlf()).append("\n");
                message.append("beskrivelse: " + bookingInquiry.getBookingInquiry().getBeskrivelse()).append("\n");
                message.append("bevertning: " + bookingInquiry.getBookingInquiry().getOenskerBevertning()).append("\n");
                message.append("events: \n");
                for (String event: bookingInquiry.getBookingInquiry().getEvents()) {
                    message.append(event).append("\n");
                }
                bookingInquiry.getBookingInquiry().setMessage(message.toString());

                getStorage().setSubCategory("emailsNotSent", bookingInquiry.getBookingInquiry().getId(), BookingInquiryAssembler.convertBookingInquiryToSubCategory(bookingInquiry.getBookingInquiry()));

                EpostExecutor.getInstance().sendRemainingEmails(getStorage());

                jsonReturn = "{\"bookingInquiry\": {}}";
            }
        }

        writeContentsToBuffer(channelHandlerContext, jsonReturn, "application/json");
    }
}
