import { type Room } from "@/lib/schema"
import { motion } from "framer-motion"
import Link from 'next/link'
import Image from 'next/image'

interface RoomCardProps {
  room: Room
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group bg-white rounded-lg overflow-hidden shadow-sm"
    >
      <Link href={`/rooms/${room.id}`}>
        <div className="relative h-64">
          <Image
            src={room.imageUrl}
            alt={room.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        
        <div className="p-6">
          <h3 className="font-playfair text-2xl mb-2">{room.name}</h3>
          <p className="font-montserrat text-gray-600 mb-4 line-clamp-2">
            {room.description}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-primary font-montserrat font-semibold">
              KES {room.price} per night
            </span>
            <span className="text-sm text-gray-500">
              Up to {room.capacity} guests
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
