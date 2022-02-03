import { supabase } from "./supabase";

/**
 * Method to get all the bookings
 * @param filters object containing filters
 * @returns supabase query
 */
export const getAllBookings = async (filters: any) => {
    let query = supabase
        .from("bookings")
        .select("from, to, rooms, guest_id (given_name, family_name), guests!inner(*)")
    if (filters?.name) {
        query.ilike('guests.given_name', `%${filters.name}%`)
    }
    if (filters?.room?.length > 0) {
        query.contains('rooms', [`${filters.room.toString()}`])
    }
    return query
}

/**
 * Method to get all rooms
 * @returns supabase query
 */
export const getAllRooms = async () => {
    return supabase.from("rooms").select("*")
  
}
 * Method to get bookings by date range
 * @param from Date
 * @param to Date
 * @returns supabase query
 */
export const getBookingsByDate = async (from: Date | null | string, to: Date | null | string) => {
    return supabase.rpc('all_users', { date_from: from, date_to: to })
}

/**
 * Method to add a new booking
 * @param data Booking object
 * @returns supabase query
 */
export const addBooking = async (data: object) => {
    return supabase
        .from("bookings")
        .insert([{ ...data }]);
}