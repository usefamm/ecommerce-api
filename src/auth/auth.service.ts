import { Injectable, UnauthorizedException } from '@nestjs/common';
import { supabase } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  async signup(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    return data;
  }
  async login(email: string, password: string) {
    const result = await supabase.auth.signInWithPassword({ email, password });

    if (result.error || !result.data.session) {
      throw new UnauthorizedException(
        result.error?.message || 'Invalid credentials',
      );
    }

    return result.data;
  }
}
