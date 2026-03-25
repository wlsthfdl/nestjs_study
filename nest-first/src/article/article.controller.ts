import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  ParseIntPipe,
  Param,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDeco } from 'src/auth/decorator/user.decorator';
import { User } from 'src/domain/user.entity';
import { ArticleEntity } from 'src/domain/article.entity';

@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  //게시글 create
  @UseGuards(AuthGuard) //로그인한 유저만 사용가능
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

  //게시글 read
  @Get(':articleId') //Param을 사용해서 url 읽어온 articleId값을 사용
  async readArticle(@Param('articleId', ParseIntPipe) articleId: number) {
    const article = await this.articleService.getArticle(articleId);
    return article;
  }

  //게시글 수정
  @UseGuards(AuthGuard)
  @Put(':articleId')
  async updateArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
    @UserDeco() user: User,
    @Body() body: ArticleEntity,
  ) {
    const userId = user.id;
    const { title, content } = body;

    return this.articleService.modifyArticle(articleId, title, content, userId);
  }
}
