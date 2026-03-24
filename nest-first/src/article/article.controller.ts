import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDeco } from 'src/auth/decorator/user.decorator';
import { User } from 'src/domain/user.entity';
import { ArticleEntity } from 'src/domain/article.entity';

@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createArticle(@Body() body: ArticleEntity, @UserDeco() user: User) {
    const userId = user.id;
    const { title, content } = body;

    const article = await this.articleService.createArticle(
      title,
      content,
      userId,
    );
    return article;
  }
}
