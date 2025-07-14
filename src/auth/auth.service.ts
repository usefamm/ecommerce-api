import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { SignUpDto, LoginDto } from './dto/auth.dto';
import {
  LoginResponse,
  SignUpResponse,
} from '../common/interfaces/auth-response.interface';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async signUp(signupDto: SignUpDto): Promise<SignUpResponse> {
    const { email, password } = signupDto;
    const { data, error } = await this.supabaseService.client.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('already registered')) {
        throw new BadRequestException('Email is already registered.');
      }
      throw new UnauthorizedException(error.message);
    }

    const user = data.user;

    const cleanUser = {
      id: user.id,
      aud: user.aud,
      role: user.role,
      email: user.email,
      email_confirmed_at: user.email_confirmed_at || null,
      created_at: user.created_at,
      updated_at: user.updated_at,
      email_verified: !!user.user_metadata?.email_verified,
    };

    return {
      success: true,
      statusCode: 201,
      data: {
        message: 'Signup successful.',
        user: cleanUser,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;

    const { data, error } =
      await this.supabaseService.client.auth.signInWithPassword({
        email,
        password,
      });

    if (error || !data.session) {
      throw new UnauthorizedException(error?.message || 'Login failed');
    }

    const user = data.user;

    return {
      success: true,
      statusCode: 201,
      data: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        user: {
          id: user.id,
          aud: user.aud,
          role: user.role,
          email: user.email,
          email_confirmed_at: user.email_confirmed_at || null,
          created_at: user.created_at,
          updated_at: user.updated_at,
          email_verified: !!user.user_metadata?.email_verified,
        },
      },
    };
  }
}
