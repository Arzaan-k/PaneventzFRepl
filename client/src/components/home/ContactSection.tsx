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

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  eventType: z.string().min(1, "Please select an event type."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize form
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

  // Form submission handler
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We will get back to you soon!",
        variant: "default",
      });
      
      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Contact <span className="text-primary">Pan Eventz</span>
          </h2>
          <p className="text-lg text-neutral-600">
            Ready to plan your next event? Get in touch with our team and let us bring your vision to life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold font-montserrat mb-6">Send Us a Message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name" className="block text-neutral-700 mb-2">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            id="name" 
                            placeholder="Your name" 
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email" className="block text-neutral-700 mb-2">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            id="email" 
                            type="email" 
                            placeholder="Your email" 
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="phone" className="block text-neutral-700 mb-2">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          id="phone" 
                          type="tel" 
                          placeholder="Your phone number" 
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="eventType" className="block text-neutral-700 mb-2">
                        Event Type
                      </FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger 
                            id="eventType" 
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          >
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="corporate">Corporate Event</SelectItem>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="sports">Sports Event</SelectItem>
                          <SelectItem value="education">School/College Event</SelectItem>
                          <SelectItem value="cultural">Cultural Event</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="message" className="block text-neutral-700 mb-2">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          id="message" 
                          rows={4} 
                          placeholder="Tell us about your event" 
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-full transition-colors"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold font-montserrat mb-6">Contact Information</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl mr-4">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800 mb-1">Our Office</h4>
                  <p className="text-neutral-600">123 Event Plaza, Sector 63, Noida, Uttar Pradesh, India</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl mr-4">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800 mb-1">Phone Number</h4>
                  <p className="text-neutral-600">+91 98765 43210</p>
                  <p className="text-neutral-600">+91 91234 56789</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl mr-4">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800 mb-1">Email Address</h4>
                  <p className="text-neutral-600">info@paneventz.com</p>
                  <p className="text-neutral-600">bookings@paneventz.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl mr-4">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800 mb-1">Working Hours</h4>
                  <p className="text-neutral-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                  <p className="text-neutral-600">Sunday: Closed (Except for Events)</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h4 className="font-bold text-neutral-800 mb-4">Social Media</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden h-64 shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224097.69910050746!2d77.06904352358899!3d28.527586000000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1705667401820!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Pan Eventz Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
