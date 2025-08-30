import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, Laptop, Wifi, Car, Coffee, BookOpen, Award, Clock, MapPin } from 'lucide-react';

const About = () => {
  const FOUNDATION_YEAR = 2022;
  const yearsOfExcellence = Math.max(1, new Date().getFullYear() - FOUNDATION_YEAR);
  return (
    <section className="w-full bg-background pt-8 pb-16">
      <div className="w-full px-4 md:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-[#B22429] bg-clip-text text-transparent">
              About Best IT Institute in Faisalabad
            </span>
            <br />
            <span className="bg-[#032F65] bg-clip-text text-transparent">
              Tech-Hub
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <strong>Tech-Hub Faisalabad</strong> is the premier IT training institute in Faisalabad, offering free (NAVTTC) and paid professional computer courses in Faisalabad. We're dedicated to making quality education accessible to everyone while providing advanced professional IT courses in Faisalabad for career growth.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To empower individuals with cutting-edge technical skills and practical IT skills training
                that transforms them into industry-ready professionals through our computer training institute in Faisalabad, while fostering innovation
                and excellence in technology education.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To be the leading IT academy in Faisalabad that bridges the gap between academic
                learning and industry requirements, producing highly skilled professionals through professional IT courses in Faisalabad who drive
                technological advancement in Pakistan and beyond.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Course Offerings */}
        <div className="mb-16">
          <h2 className="text-center text-3xl font-bold mb-8">Our Computer Courses in Faisalabad Offerings</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-700 text-xl">Free Courses (NAVTTC Funded)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Access world-class IT courses at no cost through our NAVTTC-funded programs at our computer training institute in Faisalabad.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span>Cloud Computing (AWS)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span>Cybersecurity & Digital Forensics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span>Full-Stack Web Development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span>Google UX/UI Design</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span>Mobile App Development</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-700 text-xl">Paid Professional Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Advanced professional IT courses in Faisalabad with internship opportunities and job placement support through practical IT skills training.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Cybersecurity (CEH/CHFI)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Digital Marketing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Graphic Design</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Video Editing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Shopify E-commerce</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Choose Tech-Hub Faisalabad */}
        <div className="mb-16">
          <h2 className="text-center text-3xl font-bold mb-8">Why Choose Best IT Institute in Faisalabad - Tech-Hub?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Instructors',
                description:
                  'Learn from certified industry professionals with years of hands-on experience in their respective fields.',
              },
              {
                title: 'Practical Learning',
                description: 'Focus on real-world projects, hands-on labs, and industry-relevant case studies.',
              },
              {
                title: 'Job Placement',
                description: 'Dedicated career support with 2-month internship programs and job placement assistance.',
              },
              {
                title: 'Flexible Timing',
                description:
                  'Morning and evening sessions available to accommodate working professionals and students.',
              },
              {
                title: 'Modern Curriculum',
                description: 'Updated course content aligned with current industry standards and market demands.',
              },
              {
                title: 'Certification',
                description:
                  'Industry-recognized certificates and preparation for international certifications.',
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Training Statistics */}
        <div className="mb-16">
          <h2 className="text-center text-3xl font-bold mb-8">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#032F65] mb-2">15000+</div>
                <p className="text-muted-foreground">Students Trained</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#B22429] mb-2">15+</div>
                <p className="text-muted-foreground">Courses Available</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#032F65] mb-2">85%</div>
                <p className="text-muted-foreground">Job Placement Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#B22429] mb-2">{yearsOfExcellence}+</div>
                <p className="text-muted-foreground">Years of Excellence</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Campus Location */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-2xl font-bold">Our Campus Location</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-4">
                Strategically located in the heart of Faisalabad, our campus is easily accessible and provides
                a conducive environment for learning and professional development.
              </p>
              <div className="bg-background/80 rounded-lg p-4">
                <p className="font-medium">📍 357/A Choti, D Ground Block A People's Colony No 1, Faisalabad, Punjab 37000</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* World-Class Facilities */}
        <div className="mb-16">
          <h2 className="text-center text-3xl font-bold mb-8">World-Class Facilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#032F65]/10">
                    <Building className="h-6 w-6 text-[#032F65]" />
                  </div>
                  <CardTitle className="text-xl">Modern Infrastructure</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  State-of-the-art building with spacious classrooms, air-conditioned environments, and modern architectural design that provides a comfortable learning atmosphere.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#B22429]/10">
                    <Laptop className="h-6 w-6 text-[#B22429]" />
                  </div>
                  <CardTitle className="text-xl">Advanced Computer Labs</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Fully equipped laboratories with high-performance systems, latest software installations, and dedicated servers for hands-on practical training.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#032F65]/10">
                    <Wifi className="h-6 w-6 text-[#032F65]" />
                  </div>
                  <CardTitle className="text-xl">High-Speed Internet</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Reliable high-speed internet connectivity throughout the campus ensuring seamless online learning, research, and access to cloud-based resources.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#B22429]/10">
                    <Users className="h-6 w-6 text-[#B22429]" />
                  </div>
                  <CardTitle className="text-xl">Interactive Classrooms</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Modern classrooms equipped with smart boards, projectors, and audio-visual systems to facilitate interactive and engaging learning experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#032F65]/10">
                    <Car className="h-6 w-6 text-[#032F65]" />
                  </div>
                  <CardTitle className="text-xl">Convenient Parking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Secure parking facilities available for students and visitors, ensuring safe and convenient access to the campus premises.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#B22429]/10">
                    <Coffee className="h-6 w-6 text-[#B22429]" />
                  </div>
                  <CardTitle className="text-xl">Cafeteria & Recreation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  On-campus cafeteria providing fresh meals and beverages, along with comfortable recreational areas for students to relax during breaks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Campus Life Experience */}
        <div className="mb-16">
          <h2 className="text-center text-3xl font-bold mb-8">Campus Life Experience</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <BookOpen className="h-5 w-5 text-primary mr-2" />
                  Student Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  A diverse and vibrant student community from various backgrounds, creating an inclusive environment that promotes peer learning and networking opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <BookOpen className="h-5 w-5 text-primary mr-2" />
                  Project-Based Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Regular project presentations, coding competitions, and collaborative assignments that help students apply theoretical knowledge to real-world scenarios.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <BookOpen className="h-5 w-5 text-primary mr-2" />
                  Industry Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Regular guest lectures from industry professionals, company visits, and networking events that bridge the gap between academia and industry.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <BookOpen className="h-5 w-5 text-primary mr-2" />
                  Career Guidance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Dedicated career counseling services, resume building workshops, interview preparation sessions, and job placement assistance for all students.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Campus Highlights */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center justify-center">
                <Award className="h-6 w-6 text-primary mr-3" />
                Why Our Campus Stands Out
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <p className="text-muted-foreground">Practical Training</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <p className="text-muted-foreground">Lab Access</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">30:1</div>
                  <p className="text-muted-foreground">Student to Instructor Ratio</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campus Hours & Sessions */}
        <div className="mb-16">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary mr-3" />
                Campus Hours & Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg mb-3">Morning Sessions</h4>
                  <p className="text-muted-foreground">9:00 AM - 1:00 PM</p>
                  <p className="text-sm text-muted-foreground mt-1">Monday to Friday</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3">Evening Sessions</h4>
                  <p className="text-muted-foreground">2:00 PM - 6:00 PM</p>
                  <p className="text-sm text-muted-foreground mt-1">Monday to Friday</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Weekend workshops and special sessions are conducted as per course requirements
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
