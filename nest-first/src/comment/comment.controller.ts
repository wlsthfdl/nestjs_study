import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/auth/security/auth.guard';
import { User } from 'src/domain/user.entity';
import { CommentDTO } from './dto/comment.dto';
import { UserDeco } from 'src/auth/decorator/user.decorator';

@Controller('articles/:articleId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  //댓글 작성
  @UseGuards(AuthGuard)
  @Post()
  async createComment(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body() body: CommentDTO,
    @UserDeco() user: User,
  ) {
    const content = body.content;
    const parentId = body?.parentId ?? undefined;
    const userId = user.id;
    const comment = await this.commentService.createComment(
      content,
      userId,
      articleId,
      parentId,
    );
    return comment;
  }

  //댓글 수정
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CommentDTO,
    @UserDeco() user: User,
  ) {
    const content = body.content;
    const userId = user.id;
    const commentId = id;

    const res = await this.commentService.updateComment(
      content,
      userId,
      commentId,
    );
    return res;
  }
}
