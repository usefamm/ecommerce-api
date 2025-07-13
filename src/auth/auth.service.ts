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

  async signUp(signupDto: SignUpDto) {
    const { email, password } = signupDto;
    const { data, error } = await this.supabaseService.client.auth.signUp({
      email,
      password
    });

    if (error) {
      if (error.message.includes('already registered')) {
        throw new BadRequestException('Email is already registered.');
      }
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
