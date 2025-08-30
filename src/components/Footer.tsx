import React from 'react';
import { MapPin, Phone, Mail, ArrowRight, Facebook, Instagram, ExternalLink, User, Globe, Linkedin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Free Courses', href: '/courses/free' },
    { label: 'Paid Courses', href: '/courses/paid' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' }
  ];

  const courses = [
    { name: 'Web Development Training', link: '/course/full-stack-development' },
    { name: 'Cyber Security Training', link: '/course/cyber-security' },
    { name: 'Digital Marketing Training', link: '/course/digital-marketing-paid' },
    { name: 'Graphic Design Course', link: '/course/graphic-designing' },
    { name: 'Video Editing Course', link: '/course/video-editing' },
    { name: 'Shopify Course', link: '/course/shopify' },
    { name: 'Office Management Course', link: '/course/office-management' },
    { name: 'Cloud Computing Course', link: '/course/cloud-computing-aws-azure' }
  ];

  const socialLinks = [
    {
      icon: Facebook,
      label: 'Facebook',
      href: 'https://www.facebook.com/Techhubfsd/',
      external: true,
      hoverColor: 'hover:bg-[#1877F2]'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://www.instagram.com/techhub_innovation/',
      external: true,
      hoverColor: 'hover:bg-[#E4405F]'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/tech-hub-systems-pvt-limited-faisalabad/',
      external: true,
      hoverColor: 'hover:bg-[#0077B5]'
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      href: 'https://wa.me/923006622815',
      external: true,
      hoverColor: 'hover:bg-[#25D366]'
    },
  ];


  return (
    <footer className="bg-foreground text-background py-16">
      <div className="px-4 md:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div>
                <h1 className="font-display font-bold text-xl text-background">Tech-Hub</h1>
                <p className="text-sm text-muted opacity-80">Faisalabad</p>
              </div>
            </div>
            <p className="text-muted mb-6 leading-relaxed text-left">
              Tech-Hub is the leading computer training institute in Faisalabad, offering expert-led IT courses in programming, cybersecurity, digital marketing, and many more. With experienced faculty, we deliver practical IT training and professional development to prepare students for successful tech careers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-background">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 group transition-all duration-300 text-background"
                  >
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    <span>{link.label}</span>
                    {link.href.startsWith('http') && <ExternalLink size={12} className="opacity-70" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-background">Popular Courses</h3>
            <ul className="space-y-3">
              {courses.map((course, index) => (
                <li key={index}>
                  <Link
                    to={course.link}
                    className="flex items-center gap-2 group transition-all duration-300 text-left text-background w-full"
                  >
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    <span className="text-sm">{course.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-background">Stay Updated with IT Courses</h3>
            <p className="text-muted mb-4 text-sm">
              Subscribe to get updates about new professional IT courses in Faisalabad, events, and career opportunities.
            </p>
            <div className="space-y-3">
              <Input
                placeholder="Enter your email"
                className="bg-background/10 border-muted text-background placeholder:text-muted/70"
              />
              <Button className="w-full bg-[#032F65] hover:shadow-primary transition-all duration-300">
                Subscribe
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3 text-background">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-background/10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group ${social.hoverColor} hover:text-white`}
                    aria-label={social.label}
                    title={social.label}
                  >
                    <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partner Info */}
        <div className="bg-[#032F65] rounded-lg p-6 mb-8 text-center">
          <h3 className="font-display text-xl font-bold text-white mb-2">
            Official NAVTTC Partner - IT Academy in Faisalabad
          </h3>
          <p className="text-white text-sm">
            National Vocational & Technical Training Commission - Government of Pakistan approved diploma in IT Faisalabad programs
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-muted/20 pt-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="text-muted text-sm">
              © {currentYear} Tech-Hub Faisalabad. All rights reserved.
            </div>
            <div className="text-white text-sm">
              Developed by{' '}
              <a
                href="https://alihassan-online.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white hover:text-white transition-colors duration-200"
              >
                Ali Hassan
              </a>
              {' & '}
              <a
                href="https://waseemportfolioweb.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white hover:text-white transition-colors duration-200"
              >
                Waseem Ali
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
