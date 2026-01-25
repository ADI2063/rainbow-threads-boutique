import { useState } from "react";
import { ArrowRight, Instagram, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"email" | "otp" | "success">("email");

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-otp", {
        body: { email },
      });

      if (error) throw error;

      toast.success("Check your inbox!", {
        description: "We've sent you a verification code.",
      });
      setStep("otp");
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      toast.error("Something went wrong", {
        description: error.message || "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return;

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("verify-otp", {
        body: { email, otp },
      });

      if (error) throw error;

      if (data?.error) {
        toast.error("Verification failed", {
          description: data.error,
        });
        return;
      }

      setStep("success");
      toast.success("Welcome to our community!", {
        description: "Check your inbox for a welcome email.",
      });
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      toast.error("Verification failed", {
        description: error.message || "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-otp", {
        body: { email },
      });

      if (error) throw error;

      toast.success("New code sent!", {
        description: "Check your inbox for the new verification code.",
      });
      setOtp("");
    } catch (error: any) {
      toast.error("Failed to resend", {
        description: error.message || "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Heading */}
          <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-60 font-body">
            Stay Connected
          </p>
          <h2 className="text-4xl md:text-6xl font-light mb-6 font-display">
            Join Our <span className="italic">Community</span>
          </h2>
          <p className="opacity-60 mb-12 max-w-md mx-auto font-body font-light">
            Get exclusive access to new drops, special offers, and be the first
            to know about our pride events.
          </p>

          {/* Email Step */}
          {step === "email" && (
            <form
              onSubmit={handleSendOTP}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-transparent border-background/30 text-background placeholder:text-background/50 rounded-none font-body"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-14 px-8 bg-background text-foreground hover:bg-background/90 rounded-none min-w-[160px]"
              >
                {isSubmitting ? (
                  <span className="animate-pulse font-body">Sending...</span>
                ) : (
                  <>
                    <span className="font-body">Subscribe</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* OTP Step */}
          {step === "otp" && (
            <div className="max-w-md mx-auto space-y-6">
              <p className="text-sm opacity-80 font-body">
                Enter the 6-digit code sent to{" "}
                <span className="font-medium">{email}</span>
              </p>

              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup className="gap-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="w-12 h-14 text-xl bg-transparent border-background/30 text-background rounded-none"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={handleVerifyOTP}
                  disabled={isSubmitting || otp.length !== 6}
                  className="h-12 px-8 bg-background text-foreground hover:bg-background/90 rounded-none"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse font-body">Verifying...</span>
                  ) : (
                    <span className="font-body">Verify & Subscribe</span>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResendOTP}
                  disabled={isSubmitting}
                  className="h-12 text-background/70 hover:text-background hover:bg-background/10 rounded-none"
                >
                  <span className="font-body">Resend Code</span>
                </Button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                }}
                className="text-sm opacity-60 hover:opacity-100 transition-opacity font-body"
              >
                ← Use a different email
              </button>
            </div>
          )}

          {/* Success Step */}
          {step === "success" && (
            <div className="max-w-md mx-auto space-y-6">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-2xl font-display">You're all set!</h3>
              <p className="opacity-60 font-body">
                Welcome to our community. Check your inbox for a special welcome
                message.
              </p>
            </div>
          )}

          {/* Privacy Note */}
          {step !== "success" && (
            <p className="text-xs opacity-40 mt-8 font-body">
              We respect your privacy. Unsubscribe anytime.
            </p>
          )}

          {/* Instagram Link */}
          <div className="mt-12 pt-8 border-t border-background/20">
            <p className="text-sm opacity-60 mb-4 font-body">
              Follow us for daily inspiration
            </p>
            <button
              onClick={() => window.open("https://www.instagram.com/adidab__", "_blank")}
              className="inline-flex items-center gap-2 px-6 py-3 border border-background/30 hover:bg-background/10 transition-colors rounded-none font-body cursor-pointer"
            >
              <Instagram className="w-5 h-5" />
              <span>Follow on Instagram</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
