import type { NextPage } from 'next'
import Hero from '@/components/hero'
import { motion } from 'framer-motion'

const features = [
  {
    title: "Luxurious Rooms",
    description: "Elegantly designed suites with breathtaking views",
    image: "https://images.unsplash.com/photo-1628870776167-b4b684441e10"
  },
  {
    title: "Fine Dining",
    description: "World-class cuisine in stunning settings",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
  },
  {
    title: "Premium Amenities",
    description: "State-of-the-art facilities for your comfort",
    image: "https://images.unsplash.com/photo-1587325033885-4ca8907eb390"
  }
]

const Home: NextPage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl mb-4">Welcome to Luxury</h2>
            <p className="font-montserrat text-gray-600 max-w-2xl mx-auto">
              Discover a haven of tranquility and sophistication at Embu Heights, 
              where exceptional service meets unparalleled comfort.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-playfair text-2xl mb-2">{feature.title}</h3>
                <p className="font-montserrat text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
