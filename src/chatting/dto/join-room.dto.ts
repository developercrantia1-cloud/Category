import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class JoinRoomDto {
  @Type(() => Number)
  @IsInt()
  roomId!: number;
}
