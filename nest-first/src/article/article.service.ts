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

  //게시글 저장
  async createArticle(title: string, content: string, userId: number) {
    const article = await this.articleRepository.save({
      title,
      content,
      user: { id: userId },
    });
    return article;
  }

  //게시글 read
  async getArticle(articleId: number) {
    const article = await this.articleRepository.findOne({
      where: {
        id: articleId,
      },
    });
    return article;
  }
}
