DO $$ 
BEGIN 

-- PROFILES
IF NOT EXISTS ( SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles' ) THEN 
    CREATE TABLE public.profiles ( 
        id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY, 
        updated_at timestamptz DEFAULT now(), 
        username text UNIQUE, 
        full_name text, 
        avatar_url text, 
        website text, 
        mbti_type text, 
        bio text, 
        CONSTRAINT username_length CHECK (username IS NULL OR char_length(username) >= 3) 
    ); 
END IF;

-- Enable RLS
EXECUTE 'ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY';

-- Policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK ((SELECT auth.uid()) = id);

DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING ((SELECT auth.uid()) = id);


-- Trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger AS $func$ 
BEGIN 
    INSERT INTO public.profiles (id, full_name, avatar_url) 
    VALUES (
        NEW.id, 
        (CASE WHEN NEW.raw_user_meta_data IS NOT NULL THEN NEW.raw_user_meta_data ->> 'full_name' ELSE NULL END), 
        (CASE WHEN NEW.raw_user_meta_data IS NOT NULL THEN NEW.raw_user_meta_data ->> 'avatar_url' ELSE NULL END) 
    ); 
    RETURN NEW; 
END; 
$func$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger if missing
IF NOT EXISTS ( SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created' ) THEN 
    CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user(); 
END IF;


-- ORDERS TABLE
IF NOT EXISTS ( SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'orders' ) THEN 
    CREATE TABLE public.orders ( 
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY, 
        user_id uuid REFERENCES auth.users ON DELETE SET NULL, 
        created_at timestamptz DEFAULT now() NOT NULL, 
        product_name text NOT NULL, 
        product_id text, 
        product_type text, 
        amount_paid text, 
        currency text DEFAULT 'USD', 
        status text DEFAULT 'PENDING', 
        transaction_id text, 
        referral_code text, 
        customization_note text 
    ); 
ELSE 
    -- Add columns if missing
    IF NOT EXISTS ( SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'referral_code' ) THEN 
        ALTER TABLE public.orders ADD COLUMN referral_code text; 
    END IF; 
    IF NOT EXISTS ( SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'customization_note' ) THEN 
        ALTER TABLE public.orders ADD COLUMN customization_note text; 
    END IF; 
END IF;

EXECUTE 'ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY';

-- Orders Policies
DROP POLICY IF EXISTS "Users can view their own orders." ON public.orders;
CREATE POLICY "Users can view their own orders." ON public.orders FOR SELECT USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert their own orders." ON public.orders;
CREATE POLICY "Users can insert their own orders." ON public.orders FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);


-- REFERRALS
IF NOT EXISTS ( SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'referrals' ) THEN 
    CREATE TABLE public.referrals ( 
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY, 
        code text UNIQUE NOT NULL, 
        discount_percentage numeric NOT NULL CHECK (discount_percentage > 0 AND discount_percentage <= 100), 
        created_at timestamptz DEFAULT now() NOT NULL, 
        usage_count integer DEFAULT 0, 
        total_revenue_generated numeric DEFAULT 0, 
        is_active boolean DEFAULT true, 
        created_by uuid REFERENCES auth.users 
    ); 
END IF;

EXECUTE 'ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY';

DROP POLICY IF EXISTS "Anyone can read active referrals" ON public.referrals;
CREATE POLICY "Anyone can read active referrals" ON public.referrals FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Authenticated users can manage referrals" ON public.referrals;
CREATE POLICY "Authenticated users can manage referrals" ON public.referrals FOR ALL TO authenticated USING (true) WITH CHECK (true);

END $$;
