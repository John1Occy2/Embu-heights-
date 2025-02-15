import type { NextPage } from 'next'
import { useQuery } from "@tanstack/react-query"
import { type Room } from "@/lib/schema"
import RoomCard from "@/components/room-card"
import { Skeleton } from "@/components/ui/skeleton"

const Rooms: NextPage = () => {
  const { data: rooms, isLoading } = useQuery<Room[]>({
    queryKey: ["/api/rooms"]
  })

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl mb-4">Our Luxury Rooms</h1>
          <p className="font-montserrat text-gray-600 max-w-2xl mx-auto">
            Each room is thoughtfully designed to provide the ultimate comfort
            and luxury during your stay.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms?.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Rooms
