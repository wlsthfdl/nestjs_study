import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/domain/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

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
}
