import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel, SelectSeparator, SelectGroup } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/config/api';
import { courses } from '@/data/courses';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await apiClient.post('contact', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        message: formData.message,
        subject: `Course Inquiry: ${formData.course || 'General'}`
      });

      if (response.success) {
        toast({
          title: "Message Sent Successfully!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: '', email: '', phone: '', course: '', message: '' });
      } else {
        throw new Error(response.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error Sending Message",
        description: error instanceof Error ? error.message : "Please try again later or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Number',
      details: ['041-8555815', '0300 6622815'],
      action: 'Call Now',
      link: 'tel:0418555815'
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['info@techhubfsd.com'],
      action: 'Send Email',
      link: 'mailto:info@techhubfsd.com'
    },
    {
      icon: MapPin,
      title: 'Our Location',
      details: [
        "357/A Choti, D Ground Block A People's Colony No 1, Faisalabad, Punjab 37000"
      ],
      action: 'View on Google Maps',
      link: 'https://www.google.com/maps?q=357/A+Choti,+D+Ground+Block+A+People\'s+Colony+No+1,+Faisalabad,+Punjab+37000'
    }
  ];

  // Organize courses by type from actual website data
  const freeCourses = courses.filter(course => course.type === 'Free');
  const paidCourses = courses.filter(course => course.type === 'Paid');

  return (
    <section className="w-full bg-background">
      <div className="w-full px-4 md:px-6 lg:px-8 pt-8 pb-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-[#B22429] bg-clip-text text-transparent">
              Contact
            </span>{" "}
            <span className="bg-[#032F65] bg-clip-text text-transparent">
              Us
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your tech journey? Get in touch with us for course information, 
            enrollment details, or any questions about our training programs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="hover-lift hover:shadow-xl transition-all duration-300 animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <MessageCircle className="text-primary" />
                Send us a Message
              </CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className="transition-all duration-300 focus:shadow-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="transition-all duration-300 focus:shadow-md"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+92 300 1234567"
                      className="transition-all duration-300 focus:shadow-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Course Interest</label>
                    <Select value={formData.course} onValueChange={(value) => setFormData({...formData, course: value})}>
                      <SelectTrigger className="w-full transition-all duration-300 focus:shadow-md">
                        <SelectValue placeholder="Select a course you're interested in" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="text-[#B22429] font-semibold">Free Courses (NAVTTC Funded)</SelectLabel>
                          {freeCourses.map(course => (
                            <SelectItem key={course.id} value={course.name}>
                              <div className="flex flex-col">
                                <span className="font-medium">{course.name}</span>
                                <span className="text-xs text-muted-foreground">{course.duration} • {course.level}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectSeparator />
                        <SelectGroup>
                          <SelectLabel className="text-[#032F65] font-semibold">Professional Paid Courses</SelectLabel>
                          {paidCourses.map(course => (
                            <SelectItem key={course.id} value={course.name}>
                              <div className="flex flex-col">
                                <span className="font-medium">{course.name}</span>
                                <span className="text-xs text-muted-foreground">{course.duration} • {course.level} • {course.fee}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectSeparator />
                        <SelectItem value="General Inquiry">
                          <span className="font-medium">General Inquiry</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your background, goals, and any specific questions..."
                    required
                    rows={4}
                    className="transition-all duration-300 focus:shadow-md"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-[#032F65] hover:shadow-lg transition-all duration-300 group disabled:opacity-50"
                >
                  <Send className={`mr-2 transition-transform ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'}`} size={20} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="group hover-lift hover:shadow-xl transition-all duration-300 animate-scale-in">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#032F65] p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="text-primary-foreground" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {info.title}
                      </h3>
                      <div className="space-y-1 text-muted-foreground">
                        {info.details.map((detail, idx) => (
                          info.link && (info.title === 'Phone Number' || info.title === 'Email Address') ? (
                            <a
                              key={idx}
                              href={info.link}
                              className="hover:text-primary transition-colors cursor-pointer block"
                            >
                              {detail}
                            </a>
                          ) : (
                            <p key={idx}>{detail}</p>
                          )
                        ))}
                      </div>
                      <a
                        href={info.link}
                        target={info.title === 'Our Location' ? '_blank' : '_self'}
                        rel={info.title === 'Our Location' ? 'noopener noreferrer' : undefined}
                        className="inline-block"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        >
                          {info.action}
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
