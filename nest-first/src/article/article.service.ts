import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  //게시글 수정
  async modifyArticle(
    articleId: number,
    title: string,
    content: string,
    userId: number,
  ) {
    //수정 전 체크
    const article = await this.articleRepository.findOne({
      where: {
        id: articleId,
        user: {
          id: userId,
        },
      },
    });

    if (!article) {
      throw new UnauthorizedException('본인의 게시글이 아닙니다.');
    }

    //수정
    const updateArticle = await this.articleRepository.update(
      { id: articleId }, //조건
      {
        title: title,
        content: content,
      }, //수정할 내용
    );
    return { affected: updateArticle?.affected }; //affected가 1이면 수정됨, 0이면 오류
  }
}
