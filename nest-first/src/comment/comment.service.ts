import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/domain/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  //댓글 작성
  async createComment(
    content: string,
    userId: number,
    articleId: number,
    parentId?: number,
  ) {
    const comment = await this.commentRepository.save({
      content: content,
      parentId: parentId,
      user: { id: userId },
      article: { id: articleId },
    });

    return comment;
  }

  //댓글 수정
  async updateComment(content: string, userId: number, commentId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, user: { id: userId } },
    });

    if (!comment) throw new UnauthorizedException('본인 댓글이 아닙니다.');

    const updateRslt = await this.commentRepository.update(
      { id: commentId },
      { content: content },
    );

    return { affected: updateRslt?.affected };
  }
}
