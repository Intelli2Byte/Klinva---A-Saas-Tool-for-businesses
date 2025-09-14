import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ContactInquiry } from '@/entities/ContactInquiry';
import { SendEmail } from '@/integrations/Core';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service_interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
      await ContactInquiry.create(formData);

      // Send email notification
      await SendEmail({
        to: 'hello@klinva.com',
        subject: `New Contact Inquiry from ${formData.name}`,
        body: `
          New contact inquiry received:
          
          Name: ${formData.name}
          Email: ${formData.email}
          Company: ${formData.company}
          Phone: ${formData.phone}
          Service Interest: ${formData.service_interest}
          
          Message:
          ${formData.message}
        `
      });

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service_interest: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    setIsSubmitting(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-12"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8">
              Your message has been received. We'll get back to you within 24 hours.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              Send Another Message
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Let's Start Your
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {" "}Transformation
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to unlock your business potential? Get in touch with our experts 
            and discover how we can drive your success forward.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl h-12 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl h-12 transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <Input
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl h-12 transition-colors"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl h-12 transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interest
                    </label>
                    <Select
                      value={formData.service_interest}
                      onValueChange={(value) => handleInputChange('service_interest', value)}
                    >
                      <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl h-12">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consulting">Strategic Consulting</SelectItem>
                        <SelectItem value="development">Technology Solutions</SelectItem>
                        <SelectItem value="analytics">Data Analytics</SelectItem>
                        <SelectItem value="strategy">Business Strategy</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      rows={6}
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-colors resize-none"
                      placeholder="Tell us about your project and how we can help..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 h-14 text-lg font-medium rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="mr-2 w-5 h-5" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Ready to take the next step? Our team of experts is standing by to discuss 
                your unique challenges and develop a customized solution that drives real results.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Email Us</div>
                  <div className="text-gray-600">hello@klinva.com</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Call Us</div>
                  <div className="text-gray-600">+1 (555) 123-4567</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Visit Us</div>
                  <div className="text-gray-600">123 Business Ave, Suite 100<br />New York, NY 10001</div>
                </div>
              </motion.div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
              <h4 className="font-bold text-gray-900 mb-3">Response Time</h4>
              <p className="text-gray-700 leading-relaxed">
                We typically respond to all inquiries within 24 hours during business days. 
                For urgent matters, please call us directly at the number above.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}