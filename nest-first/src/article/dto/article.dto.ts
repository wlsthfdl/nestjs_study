import { ApiProperty } from '@nestjs/swagger';

export class ArticleDto {
  @ApiProperty({
    example: '게시글 제목입니다.',
    description: '게시글 제목',
    required: true,
  })
  title: string;

  @ApiProperty({
    example: '게시글 내용입니다.',
    description: '게시글 내용',
    required: true,
  })
  content: string;
}
