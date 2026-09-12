import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, Clock, Send, Sparkles, Instagram, Facebook, Twitter, Linkedin, CheckCircle2 } from "lucide-react";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number with area code."),
  eventType: z.string().min(1, "Please select an event category."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: "",
      message: ""
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", data);
      setIsSuccess(true);
      
      toast({
        title: "Inquiry Received",
        description: "Thank you for reaching out to Pan Eventz. Our senior event director will contact you within 24 hours.",
        variant: "default",
      });
      
      form.reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      
      toast({
        title: "Submission Issue",
        description: "We could not transmit your inquiry automatically. Please reach us directly at +91 98213 37523.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#090D16] relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#E8B923]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consult With Our Curators</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
            Let's Craft Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8B923] via-amber-200 to-[#E8B923]">Bespoke Event</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light max-w-xl mx-auto">
            Connect with Imran Mirza and the Pan Eventz master production crew to bring your grandest celebration to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-white/10 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-montserrat">
              Reserve a Consultation
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 font-light">
              Receive a detailed conceptual proposal and technical scope within 24 hours.
            </p>

            {isSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Inquiry Received</h4>
                <p className="text-sm text-slate-300">
                  Thank you! Imran Mirza and our senior event directors have received your inquiry and will connect with you promptly.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 text-xs sm:text-sm font-medium">
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="e.g. Rahul Kapoor"
                              className="bg-black/40 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:border-[#E8B923] focus:ring-[#E8B923]/20"
                            />
                          </FormControl>
                          <FormMessage className="text-rose-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 text-xs sm:text-sm font-medium">
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="e.g. rahul@company.com"
                              className="bg-black/40 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:border-[#E8B923] focus:ring-[#E8B923]/20"
                            />
                          </FormControl>
                          <FormMessage className="text-rose-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 text-xs sm:text-sm font-medium">
                            Phone / WhatsApp *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder="+91 98213 37523"
                              className="bg-black/40 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:border-[#E8B923] focus:ring-[#E8B923]/20"
                            />
                          </FormControl>
                          <FormMessage className="text-rose-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="eventType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 text-xs sm:text-sm font-medium">
                            Event Category *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-black/40 border-white/10 text-white rounded-xl focus:border-[#E8B923] focus:ring-[#E8B923]/20">
                                <SelectValue placeholder="Select event category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#0e1422] border-white/10 text-white">
                              <SelectItem value="corporate">Corporate Gala & Conclaves</SelectItem>
                              <SelectItem value="wedding">Royal Destination Wedding</SelectItem>
                              <SelectItem value="sports">Sports League & Stadium</SelectItem>
                              <SelectItem value="concert">Live Concert & Celebrity Management</SelectItem>
                              <SelectItem value="cultural">Cultural Festival & Exhibitions</SelectItem>
                              <SelectItem value="av-rental">Sound, Light & Truss Equipment Rental</SelectItem>
                              <SelectItem value="other">Other Bespoke Event</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-rose-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 text-xs sm:text-sm font-medium">
                          Event Scope & Preferred Dates *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            placeholder="Tell us about expected guest count, venue location, key artist requirements, or AV needs..."
                            className="bg-black/40 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:border-[#E8B923] focus:ring-[#E8B923]/20 resize-none"
                          />
                        </FormControl>
                        <FormMessage className="text-rose-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#E6193C] to-[#b8132e] hover:from-[#f02246] hover:to-[#c71734] text-white font-semibold py-6 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Event Inquiry</span>
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-montserrat mb-4">
                Headquarters
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8B923]/10 border border-[#E8B923]/20 flex items-center justify-center text-[#E8B923] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Central Operations</h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                      Pan Eventz Headquarters, Mumbai & Delhi NCR, India
                    </p>
                  </div>
                </div>

                {/* WhatsApp Priority Desk */}
                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white flex items-center justify-between">
                      <span>WhatsApp VIP Desk</span>
                      <span className="text-[10px] text-[#25D366] font-mono uppercase bg-[#25D366]/20 px-2 py-0.5 rounded">Fastest</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 font-mono mt-0.5">
                      <a href="https://wa.me/918082024787" target="_blank" rel="noreferrer" className="text-[#25D366] hover:underline font-bold">
                        +91 80820 24787
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Direct Production Hotline</h4>
                    <p className="text-xs sm:text-sm text-slate-300 font-light font-mono space-x-2">
                      <a href="tel:+919821337523" className="hover:text-[#E8B923] transition-colors">+91 98213 37523</a>
                      <span className="text-slate-500">/</span>
                      <a href="tel:+919999132800" className="hover:text-[#E8B923] transition-colors">+91 99991 32800</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Email Desk</h4>
                    <p className="text-xs sm:text-sm text-slate-400 font-light">
                      <a href="mailto:info@paneventz.com" className="hover:text-[#E8B923] transition-colors">info@paneventz.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Operational Hours</h4>
                    <p className="text-xs sm:text-sm text-slate-400 font-light">
                      Mon – Sat: 9:00 AM – 8:00 PM <br />
                      24/7 On-Site Live Event Emergency Support
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Follow Our Productions
                </div>
                <div className="flex items-center gap-3">
                  <a href="https://wa.me/918082024787" target="_blank" rel="noreferrer" title="WhatsApp" className="w-9 h-9 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/40 transition-all flex items-center justify-center">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-[#E8B923] text-white hover:text-black border border-white/10 transition-all flex items-center justify-center">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-[#E8B923] text-white hover:text-black border border-white/10 transition-all flex items-center justify-center">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-[#E8B923] text-white hover:text-black border border-white/10 transition-all flex items-center justify-center">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-[#E8B923] text-white hover:text-black border border-white/10 transition-all flex items-center justify-center">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Frame */}
            <div className="rounded-3xl overflow-hidden h-48 border border-white/10 shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609959!2d72.74109995!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1705667401820!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                title="Pan Eventz Operations"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;