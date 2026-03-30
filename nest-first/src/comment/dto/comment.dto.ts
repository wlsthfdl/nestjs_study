import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CommentDTO {
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsInt()
  parentId?: number | null;
}
