import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551632436-cbf8dd35adfa')] 
                   bg-cover bg-center"
        style={{
          filter: "brightness(0.7)"
        }}
      />
      
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative container mx-auto px-6 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <h1 className="font-playfair text-5xl md:text-7xl leading-tight mb-6">
            Luxury Redefined in Embu
          </h1>
          <p className="font-montserrat text-lg md:text-xl mb-8 opacity-90">
            Experience unparalleled comfort and elegance at Embu Heights,
            where every stay becomes an unforgettable memory.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-primary text-white px-8 py-3 rounded-md
                     font-montserrat text-sm tracking-wide"
          >
            Book Your Stay
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
