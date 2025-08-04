export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          check_in: string | null
          check_out: string | null
          created_at: string
          date: string
          id: string
          staff_id: string
          updated_at: string
          working_hours: number | null
        }
        Insert: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string
          date?: string
          id?: string
          staff_id: string
          updated_at?: string
          working_hours?: number | null
        }
        Update: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string
          date?: string
          id?: string
          staff_id?: string
          updated_at?: string
          working_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          created_at: string
          email: string | null
          fee_status: Database["public"]["Enums"]["payment_status"] | null
          full_name: string
          id: string
          is_active: boolean | null
          joining_date: string
          membership_type: string | null
          phone: string | null
          pt_trainer_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          fee_status?: Database["public"]["Enums"]["payment_status"] | null
          full_name: string
          id?: string
          is_active?: boolean | null
          joining_date?: string
          membership_type?: string | null
          phone?: string | null
          pt_trainer_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          fee_status?: Database["public"]["Enums"]["payment_status"] | null
          full_name?: string
          id?: string
          is_active?: boolean | null
          joining_date?: string
          membership_type?: string | null
          phone?: string | null
          pt_trainer_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_pt_trainer_id_fkey"
            columns: ["pt_trainer_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      enquiries: {
        Row: {
          assigned_to: string | null
          created_at: string
          email: string | null
          follow_up_date: string | null
          full_name: string
          id: string
          notes: string | null
          phone: string
          purpose: string | null
          status: Database["public"]["Enums"]["enquiry_status"] | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          email?: string | null
          follow_up_date?: string | null
          full_name: string
          id?: string
          notes?: string | null
          phone: string
          purpose?: string | null
          status?: Database["public"]["Enums"]["enquiry_status"] | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          email?: string | null
          follow_up_date?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string
          purpose?: string | null
          status?: Database["public"]["Enums"]["enquiry_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "enquiries_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      fees: {
        Row: {
          client_id: string
          created_at: string
          description: string | null
          due_amount: number | null
          id: string
          paid_amount: number
          payment_date: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          total_fee: number
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          description?: string | null
          due_amount?: number | null
          id?: string
          paid_amount?: number
          payment_date?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          total_fee?: number
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          description?: string | null
          due_amount?: number | null
          id?: string
          paid_amount?: number
          payment_date?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          total_fee?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fees_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships: {
        Row: {
          client_id: string
          created_at: string
          end_date: string
          fee: number
          id: string
          membership_type: string
          start_date: string
          status: Database["public"]["Enums"]["membership_status"] | null
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          end_date: string
          fee?: number
          id?: string
          membership_type: string
          start_date?: string
          status?: Database["public"]["Enums"]["membership_status"] | null
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          end_date?: string
          fee?: number
          id?: string
          membership_type?: string
          start_date?: string
          status?: Database["public"]["Enums"]["membership_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "memberships_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          full_name: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pt_clients: {
        Row: {
          client_id: string
          created_at: string
          due_fee: number | null
          end_date: string | null
          id: string
          is_active: boolean | null
          paid_fee: number
          sessions_completed: number
          sessions_remaining: number | null
          sessions_total: number
          start_date: string
          total_fee: number
          trainer_id: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          due_fee?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          paid_fee?: number
          sessions_completed?: number
          sessions_remaining?: number | null
          sessions_total?: number
          start_date?: string
          total_fee?: number
          trainer_id: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          due_fee?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          paid_fee?: number
          sessions_completed?: number
          sessions_remaining?: number | null
          sessions_total?: number
          start_date?: string
          total_fee?: number
          trainer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pt_clients_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pt_clients_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      salaries: {
        Row: {
          created_at: string
          id: string
          month: string
          paid_salary: number
          payment_date: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          staff_id: string
          total_salary: number
          updated_at: string
          working_days: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          month: string
          paid_salary?: number
          payment_date?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          staff_id: string
          total_salary?: number
          updated_at?: string
          working_days?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          month?: string
          paid_salary?: number
          payment_date?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          staff_id?: string
          total_salary?: number
          updated_at?: string
          working_days?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "salaries_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      staff: {
        Row: {
          created_at: string
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          salary: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          full_name: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          salary?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          salary?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      enquiry_status: "pending" | "contacted" | "converted" | "closed"
      membership_status: "active" | "expired" | "cancelled"
      payment_status: "paid" | "unpaid" | "partial"
      user_role: "admin" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      enquiry_status: ["pending", "contacted", "converted", "closed"],
      membership_status: ["active", "expired", "cancelled"],
      payment_status: ["paid", "unpaid", "partial"],
      user_role: ["admin", "staff"],
    },
  },
} as const
