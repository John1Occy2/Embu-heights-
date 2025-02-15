import { motion } from "framer-motion";

const amenities = [
  {
    title: "Spa & Wellness",
    image: "https://images.unsplash.com/photo-1668911128139-4db2cc34aa5f",
    description: "Rejuvenate your body and mind in our world-class spa"
  },
  {
    title: "Fine Dining",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    description: "Experience culinary excellence in our restaurants"
  },
  {
    title: "Fitness Center",
    image: "https://images.unsplash.com/photo-1587325033885-4ca8907eb390",
    description: "State-of-the-art equipment for your workout needs"
  },
  {
    title: "Swimming Pool",
    image: "https://images.unsplash.com/photo-1445991842772-097fea258e7b",
    description: "Take a refreshing dip in our infinity pool"
  }
];

export default function Amenities() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-4xl mb-4">Hotel Amenities</h1>
          <p className="font-montserrat text-gray-600 max-w-2xl mx-auto">
            Discover our range of premium facilities designed to make your stay
            exceptional and memorable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <div className="relative h-64">
                <img
                  src={amenity.image}
                  alt={amenity.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-2xl mb-2">{amenity.title}</h3>
                <p className="font-montserrat text-gray-600">
                  {amenity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
