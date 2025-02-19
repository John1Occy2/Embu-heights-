
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Hero() {
  return (
    <div className="relative h-screen">
      {/* African pattern overlay */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580392925771-766fea7fb3c3')] 
                   bg-cover bg-center"
        style={{
          filter: "brightness(0.6)"
        }}
      />

      {/* Decorative pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4854D' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative container mx-auto px-6 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <h1 className="font-playfair text-5xl md:text-7xl leading-tight mb-6">
            Experience African Luxury in Embu
          </h1>
          <p className="font-montserrat text-lg md:text-xl mb-8 opacity-90">
            Where traditional African hospitality meets modern comfort,
            creating an unforgettable stay in the heart of Kenya.
          </p>
          <div className="flex gap-4">
            <Link href="/rooms">
              <motion.a
                whileHover={{ scale: 1.05 }}
                className="inline-block bg-primary text-white px-8 py-3 rounded-md
                          font-montserrat text-sm tracking-wide transform transition-all
                          hover:bg-opacity-90 hover:shadow-lg cursor-pointer"
              >
                Book Your Stay
              </motion.a>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => window.location.href = "/__repl"}
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-md
                        font-montserrat text-sm tracking-wide transform transition-all
                        hover:bg-white hover:text-primary hover:shadow-lg"
            >
              Login / Sign Up
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
