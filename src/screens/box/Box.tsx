import React, { useState } from "react";
import { ConsultationSectionSubsection } from "./sections/ConsultationSectionSubsection";
import { DnaPosterSubsection } from "./sections/DnaPosterSubsection";
import { EndSubsection } from "./sections/EndSubsection";
import { HeaderSubsection } from "./sections/HeaderSubsection";
import { HealthJourneySubsection } from "./sections/HealthJourneySubsection";
import { ImageOfClinicAndSubsection } from "./sections/ImageOfClinicAndSubsection";
import { InsuranceSectionSubsection } from "./sections/InsuranceSectionSubsection";
import { LaboratorySectionSubsection } from "./sections/LaboratorySectionSubsection";
import { BlogSection } from "./sections/BlogSection";
import { BookingSection } from "./sections/BookingSection";
import { AnimatedSection } from "../../components/ui/animated";
import { BlogModal } from "../../components/ui/modal";

export const Box = () => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  const blogArticles = [
    {
      title: "How to Avoid Flu This Season",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=500&h=300&fit=crop",
      content:
        "The flu season can be challenging, but with the right preventive measures, you can significantly reduce your risk of getting sick. Here are some essential tips to help you stay healthy during flu season:\n\n1. **Get Vaccinated**: The most effective way to prevent the flu is to get an annual flu vaccine. It's recommended for everyone over 6 months old.\n\n2. **Practice Good Hygiene**: Wash your hands frequently with soap and water for at least 20 seconds, especially after being in public places.\n\n3. **Avoid Close Contact**: Stay away from people who are sick, and if you're sick, stay home to avoid spreading the virus.\n\n4. **Cover Your Mouth**: Use a tissue or your elbow when coughing or sneezing to prevent the spread of germs.\n\n5. **Boost Your Immune System**: Eat a balanced diet rich in fruits and vegetables, get regular exercise, and ensure adequate sleep.\n\n6. **Keep Surfaces Clean**: Regularly disinfect frequently touched surfaces like doorknobs, light switches, and phones.\n\n7. **Stay Hydrated**: Drink plenty of water to keep your respiratory system healthy.\n\n8. **Manage Stress**: High stress levels can weaken your immune system, making you more susceptible to illness.\n\nRemember, prevention is always better than cure. By following these simple steps, you can protect yourself and your loved ones from the flu this season.",
      author: "Dr. Sarah Johnson",
      date: "October 15, 2024",
      readTime: "5 min",
    },
    {
      title: "Understanding Your Blood Test Results",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
      content:
        "Blood tests are one of the most common diagnostic tools used in modern medicine. Understanding your results can help you make informed decisions about your health. Here's a comprehensive guide to interpreting your blood test results:\n\n**Complete Blood Count (CBC)**:\n- **Red Blood Cells (RBC)**: Carry oxygen throughout your body. Low levels may indicate anemia.\n- **White Blood Cells (WBC)**: Fight infections. High levels may indicate infection or inflammation.\n- **Platelets**: Help with blood clotting. Abnormal levels can affect bleeding or clotting.\n\n**Basic Metabolic Panel (BMP)**:\n- **Glucose**: Blood sugar levels. High levels may indicate diabetes.\n- **Electrolytes**: Sodium, potassium, and chloride levels affect fluid balance and nerve function.\n- **Kidney Function**: Creatinine and BUN levels indicate how well your kidneys are working.\n\n**Lipid Panel**:\n- **Cholesterol**: Total cholesterol, HDL (good), and LDL (bad) cholesterol levels.\n- **Triglycerides**: Fat levels in your blood.\n\n**Liver Function Tests**:\n- **ALT and AST**: Enzymes that indicate liver health.\n- **Bilirubin**: Waste product processed by the liver.\n\n**What to Do Next**:\n1. Discuss results with your healthcare provider\n2. Ask questions about any abnormal values\n3. Follow recommended lifestyle changes\n4. Schedule follow-up tests if needed\n\nRemember, individual results should always be interpreted in the context of your overall health and medical history.",
      author: "Dr. Michael Chen",
      date: "October 12, 2024",
      readTime: "7 min",
    },
    {
      title: "Mental Health and Physical Wellness",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      content:
        "The connection between mental health and physical wellness is profound and often underestimated. Research consistently shows that mental and physical health are deeply interconnected, with each influencing the other in significant ways.\n\n**The Mind-Body Connection**:\nMental health conditions can manifest as physical symptoms, while physical health problems can impact mental well-being. Stress, anxiety, and depression can lead to:\n- Weakened immune system\n- Increased risk of heart disease\n- Digestive problems\n- Sleep disturbances\n- Chronic pain\n\n**Physical Activity and Mental Health**:\nRegular exercise is one of the most effective ways to improve mental health:\n- Releases endorphins that boost mood\n- Reduces stress and anxiety\n- Improves sleep quality\n- Increases self-esteem\n- Provides social interaction opportunities\n\n**Nutrition and Mental Health**:\nWhat you eat affects your brain function:\n- Omega-3 fatty acids support brain health\n- B vitamins are essential for neurotransmitter production\n- Complex carbohydrates help regulate mood\n- Probiotics may improve gut-brain communication\n\n**Sleep and Mental Health**:\nQuality sleep is crucial for mental health:\n- Allows brain to process emotions\n- Restores neurotransmitter levels\n- Improves concentration and memory\n- Regulates stress hormones\n\n**Stress Management Techniques**:\n- Mindfulness meditation\n- Deep breathing exercises\n- Progressive muscle relaxation\n- Yoga and tai chi\n- Regular physical activity\n\n**When to Seek Help**:\nDon't hesitate to reach out if you're experiencing:\n- Persistent sadness or anxiety\n- Changes in sleep or appetite\n- Difficulty concentrating\n- Loss of interest in activities\n- Thoughts of self-harm\n\nRemember, taking care of your mental health is just as important as taking care of your physical health. Both are essential components of overall wellness.",
      author: "Dr. Emily Rodriguez",
      date: "October 10, 2024",
      readTime: "6 min",
    },
    {
      title: "Preventive Care: Your Health Investment",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop",
      content:
        "Preventive care is one of the most important investments you can make in your long-term health and well-being. Rather than waiting for health problems to develop, preventive care focuses on maintaining good health and catching potential issues early.\n\n**What is Preventive Care?**\nPreventive care includes:\n- Regular health screenings\n- Vaccinations\n- Health education and counseling\n- Lifestyle modifications\n- Early detection of diseases\n\n**Key Preventive Services**:\n\n**For Adults**:\n- Annual physical exams\n- Blood pressure monitoring\n- Cholesterol screening\n- Diabetes screening\n- Cancer screenings (mammograms, colonoscopies)\n- Bone density tests\n- Eye and dental exams\n\n**For Children**:\n- Well-child visits\n- Immunizations\n- Developmental screenings\n- Vision and hearing tests\n- Dental checkups\n\n**Benefits of Preventive Care**:\n1. **Early Detection**: Catching diseases early when they're most treatable\n2. **Cost Savings**: Preventing serious conditions saves money long-term\n3. **Better Outcomes**: Early treatment leads to better health outcomes\n4. **Peace of Mind**: Regular checkups provide reassurance\n5. **Longevity**: Preventive care can extend your life expectancy\n\n**Making Preventive Care a Priority**:\n- Schedule regular checkups\n- Keep track of your health metrics\n- Follow your doctor's recommendations\n- Maintain a healthy lifestyle\n- Stay up-to-date with vaccinations\n\n**Common Barriers to Preventive Care**:\n- Cost concerns\n- Time constraints\n- Fear of bad news\n- Lack of awareness\n- Transportation issues\n\n**Overcoming Barriers**:\n- Many insurance plans cover preventive services\n- Telemedicine options can save time\n- Early detection is better than late diagnosis\n- Education about benefits can increase awareness\n- Community health programs can help with access\n\nRemember, an ounce of prevention is worth a pound of cure. Investing in your health today will pay dividends for years to come.",
      author: "Dr. James Wilson",
      date: "October 8, 2024",
      readTime: "8 min",
    },
  ];

  const handleBlogClick = () => {
    const randomArticle =
      blogArticles[Math.floor(Math.random() * blogArticles.length)];
    setSelectedArticle(randomArticle);
    setIsBlogModalOpen(true);
  };

  const closeBlogModal = () => {
    setIsBlogModalOpen(false);
    setSelectedArticle(null);
  };

 return (
    <main
      className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden"
      data-model-id="87:40-frame"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-200/20 rounded-full animate-pulse-slow"></div>
        <div
          className="absolute bottom-40 left-20 w-40 h-40 bg-purple-200/20 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-28 h-28 bg-pink-200/20 rounded-full animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="w-full max-w-[1920px] mx-auto relative z-10">
        {/* Header - появляется сверху */}
        <AnimatedSection
          animation="slideInTop"
          delay={0}
          duration={1.0}
          className="w-full"
        >
          <HeaderSubsection />
        </AnimatedSection>

        {/* DNA Poster - появляется снизу */}
        <AnimatedSection
          animation="fadeInUp"
          delay={100}
          duration={1.2}
          className="w-full"
        >
          <DnaPosterSubsection />
        </AnimatedSection>

        {/* Booking Section - появляется с масштабированием */}
        <AnimatedSection
          animation="fadeInScale"
          delay={150}
          duration={1.0}
          className="w-full"
        >
          <BookingSection />
        </AnimatedSection>

        {/* Health Journey / Clinic */}
        <AnimatedSection
          animation="fadeInLeft"
          delay={200}
          duration={1.2}
          className="w-full"
          id="clinic" // ← ДОБАВИТЬ
        >
          <HealthJourneySubsection />
        </AnimatedSection>

        {/* Consultation - ДОБАВИТЬ ID */}
        <AnimatedSection
          animation="fadeInRight"
          delay={300}
          duration={1.2}
          className="w-full"
          id="consultation" // ← ДОБАВИТЬ
        >
          <ConsultationSectionSubsection />
        </AnimatedSection>

        {/* Insurance - ДОБАВИТЬ ID */}
        <AnimatedSection
          animation="fadeInScale"
          delay={400}
          duration={1.0}
          className="w-full"
          id="insurances" // ← ДОБАВИТЬ
        >
          <InsuranceSectionSubsection />
        </AnimatedSection>

        {/* Blog - ДОБАВИТЬ ID */}
        <AnimatedSection
          animation="slideInBottom"
          delay={500}
          duration={1.2}
          className="w-full"
          id="blog" // ← ДОБАВИТЬ
        >
          <BlogSection onArticleClick={handleBlogClick} />
        </AnimatedSection>

        {/* Laboratory - ДОБАВИТЬ ID */}
        <AnimatedSection
          animation="fadeInUp"
          delay={600}
          duration={1.2}
          className="w-full"
          id="laboratory" // ← ДОБАВИТЬ
        >
          <LaboratorySectionSubsection />
        </AnimatedSection>

        {/* Gallery - появляется с масштабированием */}
        <AnimatedSection
          animation="fadeInScale"
          delay={700}
          duration={1.0}
          className="w-full"
        >
          <ImageOfClinicAndSubsection />
        </AnimatedSection>

        {/* End - появляется снизу */}
        <AnimatedSection
          animation="slideInBottom"
          delay={800}
          duration={1.2}
          className="w-full"
        >
          <EndSubsection />
        </AnimatedSection>
      </div>

      {/* Blog Modal */}
      <BlogModal
        isOpen={isBlogModalOpen}
        onClose={closeBlogModal}
        article={selectedArticle}
      />
    </main>
  );
};