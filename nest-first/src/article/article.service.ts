import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/domain/article.entity';
import { Repository } from 'typeorm';
import { User } from 'src/domain/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createArticle(title: string, content: string, userId: number) {
    await this.articleRepository.save({
      title,
      content,
      user: { id: userId },
    });
  }
}
