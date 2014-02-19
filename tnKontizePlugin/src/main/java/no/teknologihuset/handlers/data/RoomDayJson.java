package no.teknologihuset.handlers.data;

import no.teknologihuset.calendar.RoomDay;
import no.teknologihuset.calendar.RoomEvent;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by jhsmbp on 12/9/13.
 */
public class RoomDayJson {
    private String id;
    private Integer dayOfWeek;
    private Integer roomWeek;
    private Integer roomYear;
    private Integer roomMonth;
    private Integer dayOfMonth;
    private String room;
    private List<String> roomEvents;
    private List<String> halfdayEvents;
    private String fulldayEvent;

    public RoomDayJson() {
    }

    public RoomDayJson(RoomDay roomDay) {
        this.id = roomDay.getId();
        this.dayOfWeek = roomDay.getDayOfWeek();
        this.roomWeek = roomDay.getRoomWeek();
        this.roomYear = roomDay.getRoomYear();
        this.roomMonth = roomDay.getRoomMonth();
        this.dayOfMonth = roomDay.getDayOfMonth();
        this.room = roomDay.getRoom();
        this.roomEvents = new ArrayList<>();
        for (RoomEvent roomEvent : roomDay.getRoomEvents()) {
            this.roomEvents.add(roomEvent.getId());
        }
        this.halfdayEvents = new ArrayList<>();
        for (RoomEvent roomEvent : roomDay.getHalfdayEvents()) {
            this.halfdayEvents.add(roomEvent.getId());
        }
        fulldayEvent = roomDay.getFulldayEvent().getId();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(Integer dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public Integer getRoomWeek() {
        return roomWeek;
    }

    public void setRoomWeek(Integer roomWeek) {
        this.roomWeek = roomWeek;
    }

    public Integer getRoomYear() {
        return roomYear;
    }

    public void setRoomYear(Integer roomYear) {
        this.roomYear = roomYear;
    }

    public Integer getRoomMonth() {
        return roomMonth;
    }

    public void setRoomMonth(Integer roomMonth) {
        this.roomMonth = roomMonth;
    }

    public Integer getDayOfMonth() {
        return dayOfMonth;
    }

    public void setDayOfMonth(Integer dayOfMonth) {
        this.dayOfMonth = dayOfMonth;
    }

    public List<String> getRoomEvents() {
        return roomEvents;
    }

    public void setRoomEvents(List<String> roomEvents) {
        this.roomEvents = roomEvents;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }
}
