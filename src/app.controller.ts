import {Controller, Get, Param, Query, Render} from '@nestjs/common';
import {StoryService} from "./story/service/story.service";
import {CategoryService} from "./category/category.service";

@Controller()
export class AppController {
  constructor(
      private storyService: StoryService,
      private categoryService: CategoryService
              ){}
  @Render('home')
  @Get()
  public async index() {
    let stories: any = [];
    let categories: any = [];
    await this.storyService.getStories()
        .then(res=>{
          stories = res;
        });
    await this.categoryService.findAll()
        .then(cats=>{
            categories = cats;
        })
    return { stories, categories };
  }


  @Render('category')
  @Get('news/:category')
  public async Category(@Param('category') cat: string) {
      let category: any = null;
      await this.categoryService.findOne(cat)
          .then((res: any)=>{
              category = res;
          })
    return {
          category: category
    };
  }

  @Render('[newsCategory]/[newsSlug]')
  @Get('news/:category/:slug')
  public async News(@Param() param: any) {
    let story: any={};
    let category: any = {};
    await this.storyService.findBySlug(param.slug).then(r=>{
      story = r;
    });
    await this.categoryService.findOne(param.category)
        .then((res: any)=>{
            category = res;
        });
   return {
      story,
       category
   };
  }
}