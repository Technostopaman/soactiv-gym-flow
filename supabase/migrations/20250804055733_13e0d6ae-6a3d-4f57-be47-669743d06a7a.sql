-- Create enums for better data integrity
CREATE TYPE public.user_role AS ENUM ('admin', 'staff');
CREATE TYPE public.membership_status AS ENUM ('active', 'expired', 'cancelled');
CREATE TYPE public.payment_status AS ENUM ('paid', 'unpaid', 'partial');
CREATE TYPE public.enquiry_status AS ENUM ('pending', 'contacted', 'converted', 'closed');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'staff',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create staff table
CREATE TABLE public.staff (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'staff',
  salary DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create clients table
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  joining_date DATE NOT NULL DEFAULT CURRENT_DATE,
  membership_type TEXT,
  pt_trainer_id UUID REFERENCES public.staff(id),
  fee_status payment_status DEFAULT 'unpaid',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create memberships table
CREATE TABLE public.memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE NOT NULL,
  status membership_status DEFAULT 'active',
  membership_type TEXT NOT NULL,
  fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create fees table
CREATE TABLE public.fees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  total_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  paid_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  due_amount DECIMAL(10,2) GENERATED ALWAYS AS (total_fee - paid_amount) STORED,
  payment_date DATE,
  payment_status payment_status DEFAULT 'unpaid',
  description TEXT,
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
  working_hours DECIMAL(4,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(staff_id, date)
);

-- Create salaries table
CREATE TABLE public.salaries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  staff_id UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
  month DATE NOT NULL,
  total_salary DECIMAL(10,2) NOT NULL DEFAULT 0,
  paid_salary DECIMAL(10,2) NOT NULL DEFAULT 0,
  payment_status payment_status DEFAULT 'unpaid',
  payment_date DATE,
  working_days INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(staff_id, month)
);

-- Create enquiries table
CREATE TABLE public.enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  purpose TEXT,
  follow_up_date DATE,
  status enquiry_status DEFAULT 'pending',
  notes TEXT,
  assigned_to UUID REFERENCES public.staff(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pt_clients table for personal training
CREATE TABLE public.pt_clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  trainer_id UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
  sessions_total INTEGER NOT NULL DEFAULT 0,
  sessions_completed INTEGER NOT NULL DEFAULT 0,
  sessions_remaining INTEGER GENERATED ALWAYS AS (sessions_total - sessions_completed) STORED,
  total_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  paid_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  due_fee DECIMAL(10,2) GENERATED ALWAYS AS (total_fee - paid_fee) STORED,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(client_id, trainer_id)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pt_clients ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
DECLARE
  user_role_result user_role;
BEGIN
  SELECT role INTO user_role_result
  FROM public.profiles 
  WHERE user_id = auth.uid();
  
  IF user_role_result IS NULL THEN
    -- Check staff table as fallback
    SELECT role INTO user_role_result
    FROM public.staff 
    WHERE user_id = auth.uid();
  END IF;
  
  RETURN COALESCE(user_role_result, 'staff');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN public.get_current_user_role() = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- RLS Policies for profiles table
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR ALL
  USING (public.is_admin());

-- RLS Policies for staff table
CREATE POLICY "Staff can view their own record"
  ON public.staff FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all staff"
  ON public.staff FOR ALL
  USING (public.is_admin());

-- RLS Policies for clients table
CREATE POLICY "Authenticated users can view clients"
  ON public.clients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage all clients"
  ON public.clients FOR ALL
  USING (public.is_admin());

CREATE POLICY "Staff can update assigned clients"
  ON public.clients FOR UPDATE
  TO authenticated
  USING (pt_trainer_id IN (SELECT id FROM public.staff WHERE user_id = auth.uid()) OR public.is_admin());

-- RLS Policies for memberships table
CREATE POLICY "Authenticated users can view memberships"
  ON public.memberships FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage all memberships"
  ON public.memberships FOR ALL
  USING (public.is_admin());

-- RLS Policies for fees table
CREATE POLICY "Authenticated users can view fees"
  ON public.fees FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage all fees"
  ON public.fees FOR ALL
  USING (public.is_admin());

-- RLS Policies for attendance table
CREATE POLICY "Staff can view their own attendance"
  ON public.attendance FOR SELECT
  USING (staff_id IN (SELECT id FROM public.staff WHERE user_id = auth.uid()));

CREATE POLICY "Staff can update their own attendance"
  ON public.attendance FOR INSERT
  WITH CHECK (staff_id IN (SELECT id FROM public.staff WHERE user_id = auth.uid()));

CREATE POLICY "Staff can update their own attendance records"
  ON public.attendance FOR UPDATE
  USING (staff_id IN (SELECT id FROM public.staff WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage all attendance"
  ON public.attendance FOR ALL
  USING (public.is_admin());

-- RLS Policies for salaries table
CREATE POLICY "Staff can view their own salary"
  ON public.salaries FOR SELECT
  USING (staff_id IN (SELECT id FROM public.staff WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage all salaries"
  ON public.salaries FOR ALL
  USING (public.is_admin());

-- RLS Policies for enquiries table
CREATE POLICY "Authenticated users can view enquiries"
  ON public.enquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create enquiries"
  ON public.enquiries FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Staff can update assigned enquiries"
  ON public.enquiries FOR UPDATE
  TO authenticated
  USING (assigned_to IN (SELECT id FROM public.staff WHERE user_id = auth.uid()) OR public.is_admin());

CREATE POLICY "Admins can manage all enquiries"
  ON public.enquiries FOR ALL
  USING (public.is_admin());

-- RLS Policies for pt_clients table
CREATE POLICY "Authenticated users can view PT clients"
  ON public.pt_clients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Trainers can update their PT clients"
  ON public.pt_clients FOR UPDATE
  TO authenticated
  USING (trainer_id IN (SELECT id FROM public.staff WHERE user_id = auth.uid()) OR public.is_admin());

CREATE POLICY "Admins can manage all PT clients"
  ON public.pt_clients FOR ALL
  USING (public.is_admin());

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_staff_updated_at
  BEFORE UPDATE ON public.staff
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_memberships_updated_at
  BEFORE UPDATE ON public.memberships
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fees_updated_at
  BEFORE UPDATE ON public.fees
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_attendance_updated_at
  BEFORE UPDATE ON public.attendance
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_salaries_updated_at
  BEFORE UPDATE ON public.salaries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_enquiries_updated_at
  BEFORE UPDATE ON public.enquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pt_clients_updated_at
  BEFORE UPDATE ON public.pt_clients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'admin'::user_role -- First user is admin, others default to staff
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to calculate working hours
CREATE OR REPLACE FUNCTION public.calculate_working_hours()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.check_in IS NOT NULL AND NEW.check_out IS NOT NULL THEN
    NEW.working_hours := EXTRACT(EPOCH FROM (NEW.check_out::time - NEW.check_in::time)) / 3600;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-calculate working hours
CREATE TRIGGER calculate_attendance_hours
  BEFORE INSERT OR UPDATE ON public.attendance
  FOR EACH ROW
  EXECUTE FUNCTION public.calculate_working_hours();

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_staff_user_id ON public.staff(user_id);
CREATE INDEX idx_clients_pt_trainer ON public.clients(pt_trainer_id);
CREATE INDEX idx_memberships_client_id ON public.memberships(client_id);
CREATE INDEX idx_memberships_end_date ON public.memberships(end_date);
CREATE INDEX idx_fees_client_id ON public.fees(client_id);
CREATE INDEX idx_attendance_staff_date ON public.attendance(staff_id, date);
CREATE INDEX idx_salaries_staff_month ON public.salaries(staff_id, month);
CREATE INDEX idx_enquiries_follow_up ON public.enquiries(follow_up_date);
CREATE INDEX idx_pt_clients_trainer ON public.pt_clients(trainer_id);
CREATE INDEX idx_pt_clients_client ON public.pt_clients(client_id);