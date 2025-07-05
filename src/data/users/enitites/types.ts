import { Database } from "@/database.types";
import { User } from "@supabase/supabase-js";

export type TUser = Database['public']['Tables']['users']['Row']

export type TProfile = TUser & {
    providerUserData: User;
};