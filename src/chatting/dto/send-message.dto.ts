import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  message!: string;

  @Type(() => Number)
  @IsInt()
  roomId!: number;
}
