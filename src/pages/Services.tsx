import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Code, Laptop, Smartphone, Shield, Cloud, Award, Users, Clock, CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "IT Training & Certification",
      description: "Comprehensive computer training programs in web development training, mobile app development, cyber security training, and more. Get certified with industry-recognized credentials.",
      icon: <GraduationCap className="h-8 w-8 text-[#032F65]" />,
      features: ["Certified trainers", "Hands-on labs", "Industry curriculum", "Job placement support"]
    },
    {
      title: "Web Development Training",
      description: "Custom website development services and web development training including frontend, backend, and full-stack solutions tailored to your business needs.",
      icon: <Code className="h-8 w-8 text-[#B22429]" />,
      features: ["Responsive design", "E-commerce solutions", "CMS development", "API integration"]
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile application development for iOS and Android platforms.",
      icon: <Smartphone className="h-8 w-8 text-[#032F65]" />,
      features: ["iOS & Android apps", "React Native", "UI/UX design", "App Store deployment"]
    },
    {
      title: "Cloud Solutions",
      description: "Cloud migration, deployment, and management services to help your business scale efficiently.",
      icon: <Cloud className="h-8 w-8 text-[#B22429]" />,
      features: ["AWS & Microsoft Azure", "Cloud architecture", "DevOps automation", "Cost optimization"]
    },
    {
      title: "Cyber Security Training",
      description: "Protect your digital assets with our comprehensive cyber security training services and certification programs.",
      icon: <Shield className="h-8 w-8 text-[#032F65]" />,
      features: ["Security audits", "Penetration testing", "Security training", "Compliance"]
    },
    {
      title: "IT Consulting",
      description: "Expert IT consulting services to help you make informed technology decisions for your business.",
      icon: <Laptop className="h-8 w-8 text-[#B22429]" />,
      features: ["Technology strategy", "Digital transformation", "IT infrastructure", "Digital marketing"]
    }
  ];

  return (
    <section className="w-full pt-4 pb-12 md:pt-8 md:pb-24 lg:pb-32">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <span className="bg-[#B22429] bg-clip-text text-transparent">
              IT Courses
            </span>
            <br />
            <span className="bg-[#032F65] bg-clip-text text-transparent">
              Computer Training Services
            </span>
          </h2>
          <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Comprehensive computer training and professional IT services including free (NAVTTC) and paid professional programs in web development, digital marketing, and cyber security, with internship opportunities.
          </p>
        </div>
        
        {/* Training Programs Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">IT Courses & Computer Training Programs</h3>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Free Courses */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#B22429]/10">
                    <GraduationCap className="h-8 w-8 text-[#B22429]" />
                  </div>
                  <CardTitle className="text-xl text-[#032F65]">Free NAVTTC Courses</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Government-funded computer training programs providing world-class IT courses at zero cost.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Cloud Computing (AWS)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Cybersecurity & Digital Forensics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Full-Stack JavaScript Development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Google UX/UI Design</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Mobile App Development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Advanced Python Programming</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-green-700">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Duration: 3 months each</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-green-700 mt-1">
                    <Award className="w-4 h-4" />
                    <span className="font-medium">Certification included</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Paid Courses */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#032F65]/10">
                    <Award className="h-8 w-8 text-[#032F65]" />
                  </div>
                  <CardTitle className="text-xl text-[#B22429]">Professional Courses</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Premium computer training programs with internship opportunities and guaranteed job placement support.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Cybersecurity (CEH/CHFI) - 25,000 PKR</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Full-Stack Web Development - 15,000 PKR</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Digital Marketing - 10,000 PKR</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Graphic Design - 10,000 PKR</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Video Editing - 10,000 PKR</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Shopify E-commerce - 10,000 PKR</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-blue-700">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">2-month internship included</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-blue-700 mt-1">
                    <Award className="w-4 h-4" />
                    <span className="font-medium">Job placement assistance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Professional Services */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center mb-8">Professional IT Training & Development Services</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#032F65]/10">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Key Features:</h4>
                    <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
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

export default Services;
