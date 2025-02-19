import { type Room } from "@shared/schema";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Video } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/cart", { roomId: room.id });
    },
    onSuccess: () => {
      toast({
        title: "Added to cart",
        description: "Room has been added to your cart.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add room to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleVirtualTour = (e: React.MouseEvent) => {
    e.preventDefault();
    if (room.virtualTourUrl) {
      window.open(room.virtualTourUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group bg-white rounded-lg overflow-hidden shadow-sm"
    >
      <Link href={`/rooms/${room.id}`}>
        <a className="block">
          <div className="relative h-64">
            <img
              src={room.imageUrl}
              alt={room.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {room.isBooked && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-montserrat font-semibold px-4 py-2 bg-primary rounded-md">
                  Currently Booked
                </span>
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="font-playfair text-2xl mb-2">{room.name}</h3>
            <p className="font-montserrat text-gray-600 mb-4 line-clamp-2">
              {room.description}
            </p>

            <div className="flex justify-between items-center mb-4">
              <span className="text-primary font-montserrat font-semibold">
                KES {room.price} per night
              </span>
              <span className="text-sm text-gray-500">
                Up to {room.capacity} guests
              </span>
            </div>
          </div>
        </a>
      </Link>

      <div className="px-6 pb-6 flex gap-2">
        {room.virtualTourUrl && (
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleVirtualTour}
          >
            <Video className="w-4 h-4 mr-2" />
            Virtual Tour
          </Button>
        )}

        <Button
          variant="default"
          className="flex-1"
          onClick={(e) => {
            e.preventDefault();
            if (!room.isBooked) {
              addToCartMutation.mutate();
            }
          }}
          disabled={room.isBooked || addToCartMutation.isPending}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </motion.div>
  );
}