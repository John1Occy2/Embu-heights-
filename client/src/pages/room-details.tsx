import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { type Room } from "@shared/schema";
import BookingForm from "@/components/booking-form";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function RoomDetails() {
  const { id } = useParams();
  const { data: room, isLoading } = useQuery<Room>({
    queryKey: [`/api/rooms/${id}`]
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="h-[500px] w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={room.imageUrl}
              alt={room.name}
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="font-playfair text-4xl">{room.name}</h1>
            <p className="font-montserrat text-gray-600">{room.description}</p>
            
            <div className="space-y-4">
              <h3 className="font-playfair text-2xl">Room Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-montserrat font-semibold">Price</p>
                  <p className="text-primary">KES {room.price} per night</p>
                </div>
                <div>
                  <p className="font-montserrat font-semibold">Capacity</p>
                  <p>{room.capacity} guests</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-playfair text-2xl">Amenities</h3>
              <ul className="grid grid-cols-2 gap-2">
                {room.amenities.map((amenity) => (
                  <li key={amenity} className="font-montserrat text-gray-600">
                    • {amenity}
                  </li>
                ))}
              </ul>
            </div>

            <BookingForm roomId={room.id} price={room.price} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}