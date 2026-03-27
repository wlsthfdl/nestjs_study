import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  ParseIntPipe,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from 'src/auth/security/auth.guard';
import { UserDeco } from 'src/auth/decorator/user.decorator';
import { ArticleDto } from './dto/article.dto';
import { User } from 'src/domain/user.entity';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {
    console.log(ArticleDto);
  }

  //게시글 create
  @UseGuards(AuthGuard) //로그인한 유저만 사용가능
  @Post()
  async createArticle(@Body() body: ArticleDto, @UserDeco() user: User) {
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
    @Body() body: ArticleDto,
  ) {
    const userId = user.id;
    const { title, content } = body;

    return this.articleService.modifyArticle(articleId, title, content, userId);
  }

  //게시글  삭제
  @UseGuards(AuthGuard)
  @Delete(':articleId')
  async deleteArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
    @UserDeco() user: User,
  ) {
    const userId = user.id;
    const res = await this.articleService.removeArticle(userId, articleId);
    return res;
  }
}
