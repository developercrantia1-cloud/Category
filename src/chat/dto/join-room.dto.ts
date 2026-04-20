import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JoinRoomDto {
  @ApiProperty({ example: 'general', description: 'Chat room name' })
  @IsString()
  roomId!: string;

  @ApiProperty({ example: 'Sachin', description: 'User display name' })
  @IsString()
  userName!: string;
}
