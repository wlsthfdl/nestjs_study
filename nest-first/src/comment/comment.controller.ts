import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/auth/security/auth.guard';
import { User } from 'src/domain/user.entity';
import { CommentDTO } from './dto/comment.dto';
import { UserDeco } from 'src/auth/decorator/user.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post(':articleId')
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
}
