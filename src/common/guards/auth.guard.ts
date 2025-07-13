import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { supabase } from '../../supabase/supabase.client';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['authorization']?.replace('Bearer ', '');

    if (!token) throw new UnauthorizedException('Missing token');

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) throw new UnauthorizedException('Invalid token');

    req.user = data.user;
    return true;
  }
}
