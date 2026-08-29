import { Controller, Post, UseGuards, Request, Body, Get, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from '../../common/decorators/public.decorator';
import { RefreshJwtGuard } from '../../common/guards/refresh-jwt.guard';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.login(req.user);
    res.cookie('refresh_token', data.refreshToken, { httpOnly: true });
    return data;
  }

  @Public()
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refresh(@Request() req, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.refreshTokens(req.user.sub, req.cookies.refresh_token);
    res.cookie('refresh_token', data.refreshToken, { httpOnly: true });
    return data;
  }

  @Post('logout')
  async logout(@Request() req, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(req.user.sub);
    res.clearCookie('refresh_token');
    return { message: 'Logged out' };
  }

  @Public()
  @Post('patient-session')
  async createPatientSession(@Body() body: any) {
    return this.authService.createPatientSession(body.deviceId, body.language, body.ipAddress);
  }

  @Get('me')
  getMe(@Request() req) {
    return req.user;
  }
}
