import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { SignUpDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    // 1. Check if user already exists
    const { data: existingUser, error: fetchError } =
      await this.supabaseService.client
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

    if (existingUser) {
      throw new BadRequestException('Email is already registered.');
    }
    if (fetchError && fetchError.code !== 'PGRST116') {
      // 'PGRST116' = no rows found, ignore this error, else throw
      throw new BadRequestException(fetchError.message);
    }

    // 2. Create new user via Supabase auth
    const { data, error } = await this.supabaseService.client.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return {
      message: 'Signup successful.',
      user: data.user,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const { data, error } =
      await this.supabaseService.client.auth.signInWithPassword({
        email,
        password,
      });

    if (error || !data.session) {
      throw new UnauthorizedException(error?.message || 'Login failed');
    }

    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      user: data.user,
    };
  }
}
