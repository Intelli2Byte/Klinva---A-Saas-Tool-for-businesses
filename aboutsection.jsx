import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Target, Lightbulb, Globe } from 'lucide-react';

const stats = [
  { number: "500+", label: "Global Clients", icon: Globe },
  { number: "98%", label: "Success Rate", icon: Target },
  { number: "15+", label: "Years Experience", icon: Award },
  { number: "1000+", label: "Projects Delivered", icon: Lightbulb }
];

const values = [
  {
    title: "Innovation First",
    description: "We stay ahead of industry trends, continuously evolving our methodologies to deliver cutting-edge solutions that give you a competitive advantage."
  },
  {
    title: "Results Driven",
    description: "Every strategy we develop is designed with measurable outcomes in mind. We don't just plan – we execute and deliver tangible results."
  },
  {
    title: "Partnership Approach",
    description: "We become an extension of your team, working closely with your stakeholders to ensure alignment and shared success throughout our engagement."
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main About Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Pioneering 
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {" "}Excellence
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              For over 15 years, Klinva has been at the forefront of business transformation, 
              helping companies navigate complex challenges and achieve unprecedented growth.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our multidisciplinary team of strategists, technologists, and industry experts 
              brings together deep domain knowledge with innovative thinking to create solutions 
              that don't just solve today's problems – they prepare you for tomorrow's opportunities.
            </p>

            <div className="space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&crop=entropy&auto=format"
                alt="Klinva team collaboration"
                className="rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-3xl" />
            </div>
            
            {/* Floating Stats Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border"
            >
              <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
              <div className="text-sm text-gray-600">Global Clients</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border"
            >
              <div className="text-3xl font-bold text-green-600 mb-1">98%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}