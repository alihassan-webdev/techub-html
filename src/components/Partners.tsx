import React from "react";
import { Award, Users, Trophy, Building, Handshake } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";

const Partners = () => {
  const achievements = [
    {
      icon: Users,
      title: "Students Trained",
      value: "15000+",
      description: "Successful graduates from IT courses and computer training programs",
    },
    {
      icon: Award,
      title: "Certifications Issued",
      value: "3500+",
      description: "Professional IT certifications in Faisalabad with international recognition",
    },
    {
      icon: Building,
      title: "Industry Partners",
      value: "25+",
      description: "Leading software house training in Faisalabad partnerships",
    },
    {
      icon: Trophy,
      title: "Success Rate",
      value: "95%",
      description: "Job-oriented IT courses in Faisalabad placement success",
    },
  ];

  const partnerLogos = [
    {
      name: "NAVTTC",
      fullName: "National Vocational & Technical Training Commission",
      logo: "/navtec-removebg-preview.png",
      description: "Official government partner for IT academy in Faisalabad training programs",
      type: "Government",
    },
    {
      name: "PSEB",
      fullName: "Pakistan Software Export Board",
      logo: "/pseb-logo.webp",
      description:
        "Setting and maintaining national standards for computer training institute in Faisalabad quality assurance",
      type: "Standards & Quality",
    },
  ];

  // Refs for in-view detection
  const headerRef = React.useRef(null);
  const achievementsRef = React.useRef(null);
  const partnersRef = React.useRef(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const achievementsInView = useInView(achievementsRef, { once: true, amount: 0.2 });
  const partnersInView = useInView(partnersRef, { once: true, amount: 0.3 });

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeUpVariants}
            className="font-display text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-[#B22429] bg-clip-text text-transparent">Authorized Partners</span>
            <br />
            <span className="bg-[#032F65] bg-clip-text text-transparent">Best IT Institute in Faisalabad</span>
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            As a leading IT training institute in Faisalabad, we collaborate with government institutions and industry leaders to
            provide world-class computer training and professional IT courses that meet international standards.
          </motion.p>
        </motion.div>

        {/* Achievement Stats */}
        <motion.div
          ref={achievementsRef}
          initial="hidden"
          animate={achievementsInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {achievements.map((achievement, index) => (
            <motion.div key={index} variants={fadeUpVariants}>
              <Card className="text-center p-6 transition-all duration-300 border-[#032F65]/20 hover:border-[#032F65]/40 hover:shadow-lg hover:shadow-[#032F65]/10 h-full bg-white/80 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    achievementsInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{
                    delay: index * 0.1 + 0.3,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="mb-4"
                >
                  <achievement.icon className="mx-auto text-[#032F65]" size={40} />
                </motion.div>

                <div className="font-display text-3xl font-bold text-[#B22429] mb-2">
                  {achievement.value}
                </div>

                <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>

                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners Section */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={partnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-display text-3xl font-bold text-center mb-12"
          >
            Our Official Partners
          </motion.h3>

          <motion.div
            ref={partnersRef}
            initial="hidden"
            animate={partnersInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {partnerLogos.map((partner, index) => (
              <motion.div key={index} variants={fadeUpVariants}>
                <Card className="p-8 text-center transition-all duration-300 border-2 border-primary/20 hover:border-primary/30 hover:shadow-md h-full">
                  <div className="mb-6">
                    <motion.img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-[120px] h-[120px] object-contain mx-auto mb-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={
                        partnersInView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.9 }
                      }
                      transition={{
                        delay: index * 0.2 + 0.4,
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                    />
                  </div>

                  <h3 className="font-display text-xl font-bold mb-2">
                    {partner.name}
                  </h3>

                  <h4 className="text-sm text-muted-foreground mb-3">
                    {partner.fullName}
                  </h4>

                  <p className="text-muted-foreground">{partner.description}</p>

                  <motion.div
                    className="mt-4 flex justify-center"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={
                      partnersInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.85 }
                    }
                    transition={{
                      delay: index * 0.2 + 0.6,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  >
                    <Handshake className="text-[#032F65]" size={24} />
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
