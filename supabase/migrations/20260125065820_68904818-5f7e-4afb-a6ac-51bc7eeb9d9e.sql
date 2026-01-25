-- Create newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  verified BOOLEAN NOT NULL DEFAULT false,
  otp_code TEXT,
  otp_expires_at TIMESTAMP WITH TIME ZONE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  verified_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public insert for new subscribers
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (true);

-- Allow public update for OTP verification
CREATE POLICY "Anyone can verify their subscription"
ON public.newsletter_subscribers
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Allow public select to check subscription status
CREATE POLICY "Anyone can check subscription status"
ON public.newsletter_subscribers
FOR SELECT
USING (true);