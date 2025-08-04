-- Create enum types
CREATE TYPE public.user_role AS ENUM ('admin', 'staff');
CREATE TYPE public.membership_status AS ENUM ('active', 'inactive', 'expired');
CREATE TYPE public.payment_status AS ENUM ('paid', 'unpaid', 'partial');

-- Create profiles table for additional user info
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role public.user_role NOT NULL DEFAULT 'staff',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create clients table
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  joining_date DATE NOT NULL DEFAULT CURRENT_DATE,
  membership_type TEXT NOT NULL,
  pt_trainer_id UUID REFERENCES public.profiles(id),
  fee_status public.payment_status DEFAULT 'unpaid',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create memberships table
CREATE TABLE public.memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status public.membership_status DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create fees table
CREATE TABLE public.fees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  total_fee DECIMAL(10,2) NOT NULL,
  paid_amount DECIMAL(10,2) DEFAULT 0,
  due_amount DECIMAL(10,2) GENERATED ALWAYS AS (total_fee - paid_amount) STORED,
  payment_date DATE,
  payment_status public.payment_status DEFAULT 'unpaid',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create staff table
CREATE TABLE public.staff (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  monthly_salary DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  staff_id UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  check_in TIME,
  check_out TIME,
  total_hours DECIMAL(4,2) GENERATED ALWAYS AS (
    CASE 
      WHEN check_in IS NOT NULL AND check_out IS NOT NULL 
      THEN EXTRACT(EPOCH FROM (check_out - check_in)) / 3600
      ELSE NULL 
    END
  ) STORED,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(staff_id, date)
);

-- Create salaries table
CREATE TABLE public.salaries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  staff_id UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
  month_year DATE NOT NULL,
  total_salary DECIMAL(10,2) NOT NULL,
  paid_salary DECIMAL(10,2) DEFAULT 0,
  payment_status public.payment_status DEFAULT 'unpaid',
  payment_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(staff_id, month_year)
);

-- Create enquiries table
CREATE TABLE public.enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  purpose TEXT NOT NULL,
  follow_up_date DATE,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create PT clients table
CREATE TABLE public.pt_clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  trainer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  sessions_total INTEGER NOT NULL DEFAULT 0,
  sessions_completed INTEGER DEFAULT 0,
  total_fee DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(client_id, trainer_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pt_clients ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS public.user_role AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for clients (admins see all, staff see their assigned)
CREATE POLICY "Admins can manage all clients" ON public.clients 
FOR ALL USING (public.get_user_role() = 'admin');

CREATE POLICY "Staff can view assigned clients" ON public.clients 
FOR SELECT USING (
  public.get_user_role() = 'staff' AND 
  (pt_trainer_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
);

-- RLS Policies for memberships
CREATE POLICY "Admins can manage all memberships" ON public.memberships 
FOR ALL USING (public.get_user_role() = 'admin');

CREATE POLICY "Staff can view memberships of assigned clients" ON public.memberships 
FOR SELECT USING (
  public.get_user_role() = 'staff' AND 
  client_id IN (
    SELECT id FROM public.clients 
    WHERE pt_trainer_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  )
);

-- RLS Policies for fees
CREATE POLICY "Admins can manage all fees" ON public.fees 
FOR ALL USING (public.get_user_role() = 'admin');

CREATE POLICY "Staff can view fees of assigned clients" ON public.fees 
FOR SELECT USING (
  public.get_user_role() = 'staff' AND 
  client_id IN (
    SELECT id FROM public.clients 
    WHERE pt_trainer_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  )
);

-- RLS Policies for staff
CREATE POLICY "Admins can manage all staff" ON public.staff 
FOR ALL USING (public.get_user_role() = 'admin');

CREATE POLICY "Staff can view their own record" ON public.staff 
FOR SELECT USING (user_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- RLS Policies for attendance
CREATE POLICY "Admins can manage all attendance" ON public.attendance 
FOR ALL USING (public.get_user_role() = 'admin');

CREATE POLICY "Staff can manage their own attendance" ON public.attendance 
FOR ALL USING (
  staff_id = (
    SELECT s.id FROM public.staff s 
    JOIN public.profiles p ON s.user_id = p.id 
    WHERE p.user_id = auth.uid()
  )
);

-- RLS Policies for salaries
CREATE POLICY "Admins can manage all salaries" ON public.salaries 
FOR ALL USING (public.get_user_role() = 'admin');

CREATE POLICY "Staff can view their own salary" ON public.salaries 
FOR SELECT USING (
  staff_id = (
    SELECT s.id FROM public.staff s 
    JOIN public.profiles p ON s.user_id = p.id 
    WHERE p.user_id = auth.uid()
  )
);

-- RLS Policies for enquiries
CREATE POLICY "Authenticated users can manage enquiries" ON public.enquiries 
FOR ALL USING (auth.uid() IS NOT NULL);

-- RLS Policies for pt_clients
CREATE POLICY "Admins can manage all PT clients" ON public.pt_clients 
FOR ALL USING (public.get_user_role() = 'admin');

CREATE POLICY "Trainers can view their PT clients" ON public.pt_clients 
FOR SELECT USING (
  trainer_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_memberships_updated_at BEFORE UPDATE ON public.memberships FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_fees_updated_at BEFORE UPDATE ON public.fees FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON public.staff FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_salaries_updated_at BEFORE UPDATE ON public.salaries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_enquiries_updated_at BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pt_clients_updated_at BEFORE UPDATE ON public.pt_clients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-update membership status
CREATE OR REPLACE FUNCTION public.update_membership_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Update membership status based on end_date
  IF NEW.end_date < CURRENT_DATE THEN
    NEW.status = 'expired';
  ELSIF NEW.end_date >= CURRENT_DATE AND NEW.start_date <= CURRENT_DATE THEN
    NEW.status = 'active';
  ELSE
    NEW.status = 'inactive';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_update_membership_status 
BEFORE INSERT OR UPDATE ON public.memberships 
FOR EACH ROW EXECUTE FUNCTION public.update_membership_status();

-- Insert sample admin user profile (will be created after first user signs up)