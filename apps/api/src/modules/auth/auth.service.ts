import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<any>,
    @InjectModel('Session') private sessionModel: Model<any>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email, isActive: true }).select('+passwordHash');
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await argon2.verify(user.passwordHash, password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(user: any) {
    const tokens = await this.generateTokens(user._id.toString(), user.email, user.role);
    await this.userModel.findByIdAndUpdate(user._id, {
      lastLogin: new Date(),
      refreshTokenHash: await argon2.hash(tokens.refreshToken),
    });
    return { user: { id: user._id, email: user.email, role: user.role, name: user.name }, ...tokens };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userModel.findById(userId).select('+refreshTokenHash');
    if (!user?.refreshTokenHash) throw new UnauthorizedException('Access denied');
    const valid = await argon2.verify(user.refreshTokenHash, refreshToken);
    if (!valid) throw new UnauthorizedException('Access denied');
    const tokens = await this.generateTokens(userId, user.email, user.role);
    await this.userModel.findByIdAndUpdate(userId, { refreshTokenHash: await argon2.hash(tokens.refreshToken) });
    return tokens;
  }

  async logout(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, { refreshTokenHash: null });
  }

  async createPatientSession(deviceId: string, language: string, ipAddress?: string) {
    const session = await this.sessionModel.create({
      deviceId, language,
      status: 'ACTIVE',
      startedAt: new Date(),
      lastActivityAt: new Date(),
      currentStep: 'identity',
      completedSteps: [],
      ipAddress,
    });
    const token = this.jwtService.sign(
      { sub: session._id.toString(), deviceId, type: 'patient-session' },
      { secret: this.config.get('JWT_ACCESS_SECRET'), expiresIn: '2h' },
    );
    return { sessionId: session._id, token, session };
  }

  async generateTokens(userId: string, email: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, role },
        { secret: this.config.get('JWT_ACCESS_SECRET'), expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN', '15m') },
      ),
      this.jwtService.signAsync(
        { sub: userId, email, role },
        { secret: this.config.get('JWT_REFRESH_SECRET'), expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN', '7d') },
      ),
    ]);
    return { accessToken, refreshToken };
  }

  async hashPassword(password: string) { return argon2.hash(password); }
}
