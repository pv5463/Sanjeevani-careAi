import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({ cors: { origin: '*', credentials: true }, namespace: '/events' })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private jwtService: JwtService, private config: ConfigService) {}

  handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.split(' ')[1];
      if (token) {
        const payload = this.jwtService.verify(token, { secret: this.config.get('JWT_ACCESS_SECRET') });
        client.join(`user-${payload.sub}`);
        if (payload.role === 'DOCTOR') client.join('doctors-all');
        if (payload.role === 'ADMIN') client.join('admins-all');
      }
      client.join('public');
    } catch { client.join('public'); }
  }

  handleDisconnect(client: Socket) { /* cleanup */ }

  emitToDoctor(event: string, data: any) { this.server.to('doctors-all').emit(event, data); }
  emitToAdmin(event: string, data: any) { this.server.to('admins-all').emit(event, data); }
  emitToUser(userId: string, event: string, data: any) { this.server.to(`user-${userId}`).emit(event, data); }
  emitAll(event: string, data: any) { this.server.emit(event, data); }
}
